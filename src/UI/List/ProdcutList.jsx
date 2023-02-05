import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Table';
import '../../styles/App.css';


const ProductList = ({products, handleUpdate, deleteProduct}) =>{

    return (
        <div className="App">
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
                    
                    onClick={()=>{handleUpdate(product)}}
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

export default ProductList;