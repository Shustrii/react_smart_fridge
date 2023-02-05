import React from 'react';
import '../styles/App.css';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import FridgeService from '../API/FridgeService';
import Select from 'react-select'
import FridgeModal from '../UI/Modal/FridgeModal';

function Fridge(){


    const emptyProduct = {fridge_id: 0, product_id: 0, product_name: '', quantity: 0, measure_id: 0, measure_name: ''};
    const [show, setShow] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [fridgeProducts, setFridgeProducts] =  useState([]);
    const [measure, setMeasures] = useState([]);
    const [selectedMeasure, setSelectedMeasure] = useState([]);
    const [productsNotInFr, setProductsNotInFr] = useState([]);
    //const [value, setValue]= useState('');
  
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    useEffect(()=>{
      const fetchData = async ()=>{
          console.log("useEffect -> init");
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
          console.log("useEffect -> update in fridgeProducts");
          try {
             getNotInFridge();
          } catch (error) {
              console.log(error);
          }
      };
  
      fetchData();
    }, [fridgeProducts]);
  
  
    useEffect(()=>{
      console.log("useEffect -> update in selectedProduct: ", product);
      setSelectedMeasure([]);
  
      if (product.measure_id !== 0){
        const selectedMeasure = measure.find((measure) => measure.id === product.measure_id)
        console.log("selectedMeasure: " + selectedMeasure);
    
        const selectedMeasures = measure.filter((measure) => measure.measure_id === selectedMeasure.measure_id);
        setSelectedMeasure(selectedMeasures);
      }
  
    }, [product]);
    
    const handleCreate = () => {
      setProduct(emptyProduct);
      handleShow();
    }
  
    const handleUpdate = (product) => {
      //console.log(product);
      setProduct(product);
      handleShow(true);
    };
  
  
    const addProduct = async (e) =>{
      e.preventDefault();
      console.log("Product to update", product);
      if(product.fridge_id === 0){
        const insertData = {...product, fridge_id: 1}
        const newProduct = await FridgeService.addProduct(insertData);
        console.log("New Product", newProduct);
        setFridgeProducts([...fridgeProducts, insertData.fridge_id]);
      }else{
        const updatedProduct = await FridgeService.editProduct(product);
        console.log("Updated Product", updatedProduct)
        //const result = {...updatedProduct.data, measure_name: product.measure_name, product_name: product.product_name}
        setFridgeProducts(fridgeProducts.map(p => (p.fridge_id === product.fridge_id && p.product_id === product.product_id)? product : p));
        console.log("Updated products: ", updatedProduct.data);
      }
      setShow(false);
  }
  
    const onChangeProductSelect=(product)=>{
      console.log("Changed product ",product);
      setProduct({...product, product_id: product.product_id, product_name: product.product_name})
    } 
  
    async function getAllProducts() {
      const response = await FridgeService.getAllFridgeProducts();
      setFridgeProducts(response.data);
    }
  
    async function getAllMeasures() {
      const response = await FridgeService.getMeasures();
      console.log("AllMeasures: ", response.data);
      setMeasures(response.data);
    }
  
    async function getNotInFridge() {
      const response = await FridgeService.getNotInFridge();
      console.log("getNotInFridge: ", response);
      setProductsNotInFr(response.data);
    }
  
    const deleteProduct = async (product) => {
      console.log("Product do delete", product);
      const response = await FridgeService.deleteProduct(product);
      console.log(response);
      setFridgeProducts(fridgeProducts.filter(p => p.product_id !== product.product_id));
    }
    
  return(
    <div className="App">

        <Button style={{marginTop: 30}} variant="primary" onClick={handleCreate}>
                Add new product
        </Button>

        <FridgeModal product={product} setProduct={setProduct} selectedMeasure={selectedMeasure} productsNotInFr={productsNotInFr} show={show} handleClose={handleClose} addProduct={addProduct} fridgeProducts={fridgeProducts} onChangeProductSelect={onChangeProductSelect}/>


        <Table striped bordered hover>
    <thead>
            <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Measure</th>
                <th></th>
            </tr>
      </thead>
      <tbody>
      {fridgeProducts.map((product)=>{
        
                return(
                <tr key={product.product_id}>
                    <td>{product.product_name}</td>
                    <td>{product.quantity}</td>
                    <td>{product.measure_name}</td>
                    <td>
                    <Button variant='primary' value={product.product_id}
                    onClick={() => {handleUpdate(product)}}
                    >Edit</Button>
                    <Button variant="secondary"
                    onClick={()=>{deleteProduct(product)}}
                    >Delete</Button>
                    </td>
                </tr>
                )})}
      </tbody>
    </Table>

    </div>
  )
}

export default Fridge;