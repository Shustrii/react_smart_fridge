import React from 'react';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

const ValidateRecipeModal=({vrShow, handleVRClose, validateProductRecipe})=>{

//    console.log("validateProductRecipe ", validateProductRecipe);

    const validationResult=()=>{
        console.log("validateProductRecipe ", validateProductRecipe);

        if(validateProductRecipe!==null && validateProductRecipe.length > 0 ){
            return(
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Назва</th>
                        <th>Кількість</th>
                        <th>В чому вимірюється</th>
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
                <div>У вас вистачає продуктів для цього рецепту</div>
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