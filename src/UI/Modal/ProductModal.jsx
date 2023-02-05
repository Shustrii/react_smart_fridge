import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

const ProductModal = ({product, setProduct, productTypes, measure, show, handleClose, addProduct}) =>{
    
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      event.preventDefault();
      if (form.checkValidity() === false) {
        event.stopPropagation();
      }else{
        addProduct(event);
      }
  
      setValidated(true);
    };

    return(
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Product name</Form.Label>
                        
                        <Form.Control required name='name' type="text" placeholder="Enter name" defaultValue={product.name}
                        onChange={(e) => setProduct({...product, name: e.target.value})}
                        />

                        <Form.Control.Feedback type="invalid">
                        Please enter product name.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Product Type</Form.Label>
                        
                        <Form.Select required id="prtype" name='type' aria-label="Default select example" value={product.pr_type_id}
                        onChange={(e) =>{
                            //const prtName = productTypes.find(prType => prType.id === parseInt(e.target.value)).map((prt)=>{return(prt.name)}).toString()
                            const prtName = productTypes.filter(prType => prType.id === parseInt(e.target.value)).map((prt)=>{return(prt.name)}).toString()
                            const measureName = measure.filter(measure => measure.id === parseInt(e.target.value)).map((measure)=>{return(measure.name)}).toString()
                            setProduct({...product, pr_type_id: parseInt(e.target.value), prtName: prtName, measureName:measureName}
                            )}}      
                        //для product to recipe
                        // onChange={(e)=>{
                        //   const measureId = e.target.value;
                        //   const results = measures.filter(measure => measure.measure_id === parseInt(measureId))
                        //   setFilteredMeasures(results);
                        //   console.log("Filter: ", results);
                        // }}
                        >
                        <option value="">Choose product type</option>
                        {productTypes.map((type)=>{
                            return(
                                <option key={type.id} value={type.id}> 
                                {/* selected={type.id === product.pr_type_id ? true : false} */}
                                {type.name}
                                </option>
                            )
                        })}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                        Please enter product type.
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    
                    <Button style={{marginLeft: 10}} variant="primary" type="submit" >
                        Save
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>

    )
}

export default ProductModal;