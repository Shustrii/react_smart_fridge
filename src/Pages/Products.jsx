import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import '../styles/App.css';
import { useState, useEffect } from 'react';
import ProductService from '../API/ProductService';
import ProductModal from '../UI/Modal/ProductModal';

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
        console.log("useEffect -> Products");
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
  }

  const handleUpdate = (product) => {
    //console.log(product);
    setProduct(product);
    handleShow(true);
  };

  const addProduct = async (e) =>{
      e.preventDefault();
      console.log("Product to update", product);
      if(product.id === 0){
        const newProduct = await ProductService.addProduct(product);
        console.log("New Product", newProduct);
        setProducts([...products, newProduct.data]);
      }else{
        const updatedProduct = await ProductService.updateProduct(product);
        setProducts(products.map(p => (p.id === product.id)? updatedProduct.data : p));
        console.log("Updated product: ", updatedProduct.data);
      }
      setShow(false);
  }

  const deleteProduct = async (product) => {
    console.log("Product do delete", product);
    const response = await ProductService.deleteProduct(product);
    console.log(response);
    setProducts(products.filter(p => p.id !== product.id));
  }

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

  return (
     <div className="App">
      <Button style={{marginTop: 30}} variant="primary" onClick={handleCreate}>
        Create Product
      </Button>

      <ProductModal product={product} setProduct={setProduct} productTypes={productTypes} measure={measure} show={show} handleClose={handleClose} addProduct={addProduct} />

      <hr style={{margin: '15px 0'}}/>

      {/* <ProductList products={products} handleUpdate={handleUpdate} deleteProduct={deleteProduct} /> */}

      <Table striped bordered hover>
            <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Measure</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                {products.map((product)=>{
                return(
                <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.prtName}</td>
                    <td>{product.measureName}</td>
                    <td>
                    <Button variant='primary' value={product.id}  
                    
                    onClick={() => {handleUpdate(product)}}
                    >Edit</Button>
                    <Button variant="secondary"
                    onClick={() => {deleteProduct(product)}}
                    >Delete</Button>
                    </td>
                </tr>
                )})}
            </tbody>
      </Table>
    </div>
  );
}

export default Products;