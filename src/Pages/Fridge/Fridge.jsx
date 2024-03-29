import React from 'react';
import '../../styles/App.css';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';



import FridgeService from '../../API/FridgeService';
import ProductInputModal from '../../UI/Modal/ProductInputModal';
//import FridgeProductTable from './Components/FridgeProductTable';
import ProductList from '../../UI/List/ProdcutList';


function Fridge(){


	const emptyProduct = {id:0, fridge_id: 0, product_id: 0, product_name: '', quantity: 0, measure_id: 0, measure_name: ''};
	const [show, setShow] = useState(false);
	const [product, setProduct] = useState(emptyProduct);
	const [fridgeProducts, setFridgeProducts] =  useState([]);
	const [measure, setMeasures] = useState([]);
	const [selectedMeasure, setSelectedMeasure] = useState([]);
	const [productsNotInFr, setProductsNotInFr] = useState([]);
	const [value, setValue]= useState('');
  
  
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
  
	useEffect(()=>{
		const fetchData = async ()=>{
			//console.log('useEffect -> init');
			try {
				getAllProducts();
				getAllMeasures(); 
				//getNotInFridge();
			} catch (error) {
				console.log(error);
			}
		};
  
		fetchData();
	}, []);
  
  
	useEffect(()=>{
		const fetchData = async ()=>{
			console.log('useEffect -> update in fridgeProducts');
			try {
				getNotInFridge();
			} catch (error) {
				console.log(error);
			}
		};
  
		fetchData();
	}, [fridgeProducts]);
  
  
	useEffect(()=>{
		console.log('useEffect -> update in selectedProduct: ', product);
		setSelectedMeasure([]);
  
		if (product.measure_id !== 0){
			const selectedMeasure = measure.find((measure) => measure.id === product.measure_id);
			console.log('selectedMeasure: ' + selectedMeasure);
    
			const selectedMeasures = measure.filter((measure) => measure.measure_id === selectedMeasure.measure_id);
			setSelectedMeasure(selectedMeasures);
		}
  
	}, [product]);
    
	const handleCreate = () => {
		setProduct(emptyProduct);
		handleShow();
	};
  
	const handleUpdate = (product) => {
		//console.log(product);
		setProduct(product);
		handleShow();
	};
  
  
	const addProduct = async (e) =>{
		e.preventDefault();
		console.log('Product to update', product);
		if(product.fridge_id === 0){
			const insertData = {...product, fridge_id: 1};
			const newProduct = await FridgeService.addProduct(insertData);
			console.log('New Product', newProduct.data);
			setFridgeProducts([...fridgeProducts, newProduct.data]);
		}else{
			const updatedProduct = await FridgeService.editProduct(product);
			console.log('Updated Product', updatedProduct);
			//const result = {...updatedProduct.data, measure_name: product.measure_name, product_name: product.product_name}
			setFridgeProducts(fridgeProducts.map(p => (p.fridge_id === product.fridge_id && p.product_id === product.product_id)? product : p));
			console.log('Updated products: ', updatedProduct.data);
		}
		handleClose();
	};
  
	const onChangeProductSelect=(prod)=>{
		console.log('Changed product ', prod);
		setProduct({...product, product_id: prod.product_id, product_name: prod.product_name, measure_id: prod.measure_id});
	}; 
  
	async function getAllProducts() {
		const response = await FridgeService.getAllFridgeProducts();
		setFridgeProducts(response.data);
	}
  
	async function getAllMeasures() {
		const response = await FridgeService.getMeasures();
		console.log('AllMeasures: ', response.data);
		setMeasures(response.data);
	}
  
	async function getNotInFridge() {
		const response = await FridgeService.getNotInFridge();
		console.log('getNotInFridge: ', response);
		setProductsNotInFr(response.data);
	}
  
	const deleteProduct = async (product) => {
		console.log('Product do delete', product);
		const response = await FridgeService.deleteProduct(product);
		console.log(response);
		setFridgeProducts(fridgeProducts.filter(p => p.product_id !== product.product_id));
	};

	//const[value, setValue] = useState('');

    
	return(
		<div className='App'>

			<Button className='adding-button-top btn-add-top'  variant='' onClick={handleCreate}>
                Додати новий продукт
			</Button>
        
			<ProductInputModal 
				header='Додавання продукту у холодильник'
				product={product} setProduct={setProduct} selectedMeasure={selectedMeasure} 
				productsList={productsNotInFr} show={show} handleClose={handleClose} 
				addProduct={addProduct} fridgeProducts={fridgeProducts} 
				onChangeProductSelect={onChangeProductSelect}/>
		
			<hr style={{margin: '15px 0'}}/>
		
			<form className='seach-form'>
				<input 
					type='text'
					className='search'
					placeholder='Пошук продукта'
					onChange={(event)=>setValue(event.target.value)}
				/>
			</form>

			<ProductList products={fridgeProducts} value={value} handleUpdate={handleUpdate} deleteProduct={deleteProduct}/>
		
		</div>
	);
}

export default Fridge;