import React from 'react';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';

import ProductService from '../../API/ProductService';
import ProductModal from '../../UI/Modal/ProductModal';
import ProductTable from './Components/ProductTable';

function Products() {
	const emptyProduct = {id: 0, name: '', pr_type_id: 0, prtName: '', measureName: ''};
	const [products, setProducts] = useState([]);
	const [product, setProduct] = useState(emptyProduct);
	const [productTypes, setProductTypes] = useState([]);
	const [measure, setMeasures] = useState([]);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	useEffect(()=>{
		const fetchData = async ()=>{
			console.log('useEffect -> Products');
			try {
				getAllProducts();
				getAllProductTypes();
				getAllMeasures(); 
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	const handleCreate = () => {
		setProduct(emptyProduct);
		handleShow();
	};

	const handleUpdate = (product) => {
		//console.log(product);
		setProduct(product);
		handleShow(true);
	};

	const addProduct = async (e) =>{
		e.preventDefault();
		console.log('Product to update', product);
		if(product.id === 0){
			const newProduct = await ProductService.addProduct(product);
			console.log('New Product', newProduct);
			setProducts([...products, newProduct.data]);
		}else{
			const updatedProduct = await ProductService.updateProduct(product);
			setProducts(products.map(p => (p.id === product.id)? updatedProduct.data : p));
			console.log('Updated product: ', updatedProduct.data);
		}
		setShow(false);
	};

	const deleteProduct = async (product) => {
		console.log('Product do delete', product);
		const response = await ProductService.deleteProduct(product);
		console.log(response);
		setProducts(products.filter(p => p.id !== product.id));
	};

	async function getAllProducts() {
		const response = await ProductService.getAllProducts();
		setProducts(response.data);
	}

	async function getAllProductTypes() {
		const response = await ProductService.getProductTypes();
		setProductTypes(response.data);
	}

	async function getAllMeasures() {
		const response = await ProductService.getMeasures();
		setMeasures(response.data);
	}

	const[value, setValue] = useState('');

	return (
		<div className='App'>
			<Button className='adding-button-top btn-add-top'  variant='' onClick={handleCreate}>
        Додати новий продукт
			</Button>

			<ProductModal product={product} setProduct={setProduct} productTypes={productTypes} measure={measure} show={show} handleClose={handleClose} addProduct={addProduct} />

			<hr style={{margin: '15px 0'}}/>
			<form className='seach-form'>
				<input 
					className='search'
					type='text'
					placeholder='Пошук продукта'
					onChange={(event)=>setValue(event.target.value)}

				/>
			</form>

			{/* <ProductList products={products} handleUpdate={handleUpdate} deleteProduct={deleteProduct} /> */}
			<ProductTable products={products} value={value} handleUpdate={handleUpdate} deleteProduct={deleteProduct}/>
		</div>
	);
}

export default Products;