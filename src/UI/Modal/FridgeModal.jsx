import React from 'react';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';

const FridgeModal = ({product, setProduct, selectedMeasure, productsNotInFr, show, handleClose, addProduct, fridgeProducts, onChangeProductSelect})=>{

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
          <Modal.Title>Додавання продукту у холодильник</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Назва продукту</Form.Label>
            <Select 
                //value={fridgeProducts.product_id} 
              defaultValue={{product_id: product.product_id, product_name: product.product_name}}
              options={productsNotInFr}
              getOptionValue={(option) => `${option['product_id']}`}
              getOptionLabel={(option) => `${option['product_name']}`}
              onChange={(e)=>{
                console.log('change product ',e)
                onChangeProductSelect(e)}}
              //options={productsNotInFr.map((products)=>{
              // return(
              //   <option key={products.id} value={products.id}>
              //     {products.product_name}
              //   </option>
              // )
            //})} 
            />

        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Кількість</Form.Label>
            <Form.Control type="number" placeholder="enter quantity" defaultValue={product.quantity}
            onChange={(e) => setProduct({...product, quantity: e.target.value})}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>В чому вимірюється</Form.Label>
          <Select aria-label="Default select example" 
          //value={product.measure_id} 
          options={selectedMeasure}
          defaultValue={{id: product.measure_id, name: product.measure_name}}
          getOptionValue={(option) => `${option['id']}`}
          getOptionLabel={(option) => `${option['name']}`}
          onChange={(e)=>{
            console.log('change measure ',e)
            setProduct({
              ...product, measure_id: e.id, measure_name: e.name 
            })
          }}
          />
            {/* <option>Open this select menu</option>
            {selectedMeasure.map((measure)=>{
              return(
                <option key={measure.id} value={measure.id}>
                  {measure.name}
                </option>
              )
            })} */}
          
        </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрити
          </Button>
          <Button variant="primary" onClick={(e)=>addProduct(e)}>
            Зберегти зміни
          </Button>
        </Modal.Footer>
      </Modal>
    )


}

export default FridgeModal