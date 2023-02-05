import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

const ProductToRecipeModal = ({pShow, handlePClose, product, prNotInRecipe, selectedMeasure, setProduct, onChangeProductSelect,addProduct })=>{


    return(

      <Modal
      show={pShow}
      onHide={handlePClose}
      backdrop="static"
      keyboard={false}
      >
      <Modal.Header closeButton>
              <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
              <Modal.Body>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Product name</Form.Label>
                    <Select
                    aria-label="select product"
                    value={(product.product_id!==0)?{product_id: product.product_id, product_name: product.product_name}:null}
                    options={prNotInRecipe}
                    getOptionValue={(option) => `${option['product_id']}`}
                    getOptionLabel={(option) => `${option['product_name']}`}
                    onChange={(e)=>{
                      console.log('change product ',e)
                      onChangeProductSelect(e)}}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control  type="number" name="productQuantity" placeholder="enter quantity" value={product.quantity}
                    onChange={(e) => setProduct({...product, quantity: e.target.value})}/>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Measure</Form.Label>
                  <Select 
                  aria-label="select measure" 
                  value={(product.measure_id!==0)?{id: product.measure_id, name: product.measure_name}:''}
                  options={selectedMeasure}
                  getOptionValue={(option) => `${option['id']}`}
                  getOptionLabel={(option) => `${option['name']}`}
                  onChange={(e)=>{
                    console.log('change measure ',e)
                    setProduct({
                      ...product, measure_id: e.id, measure_name: e.name 
                    })
                  }}
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handlePClose}>
                  click it if you done
                </Button>
              <Button variant="primary" onClick={(e)=>addProduct(e)}>Add</Button>
          </Modal.Footer>
      </Modal>
    
    )
}

export default ProductToRecipeModal;