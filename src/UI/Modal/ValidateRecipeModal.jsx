import React from 'react';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

const ValidateRecipeModal=({vrShow, handleVRClose, validateProductRecipe})=>{

    console.log("validateProductRecipe ", validateProductRecipe);

    const validationResult=()=>{
        if(validateProductRecipe!==null && validateProductRecipe.lenght > 0 ){
            return(
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>quantity</th>
                        <th>Measure</th>
                    </tr>
                </thead>
                <tbody>
                    {validateProductRecipe.map((product)=>{
                        return(
                        <tr key={product.product_id}>
                        <td>{product.product_name}</td>
                        <td>{product.quantity}</td>
                        <td>{product.measure_name}</td>
                        </tr>
                    )})}
                </tbody>
                </Table>
            )
        }else{
            return(
                <div>You can make it</div>
            )

        }
    } 

    return(
        <Modal
        show={vrShow}
        onHide={handleVRClose}
        keyboard={false}
        >
            <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                {validationResult()}
            </Form.Group>
          </Form>
            
        </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleVRClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
 
}

export default ValidateRecipeModal;