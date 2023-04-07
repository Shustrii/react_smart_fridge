import React from 'react';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

const RecipeModal = ({rShow, handleClose, recipe, setRecipe, addNewRecipe})=>{

  return(
    <Modal
      show={rShow}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Створення рецепту частина 1</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Назва рецепту</Form.Label>
            <Form.Control required type="text" name="recipe" placeholder="Введіть назву рецепта" defaultValue={recipe.recipe}
              onChange={(e) => setRecipe({...recipe, recipe: e.target.value})}
            />
          </Form.Group>
        </Form>
            
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Закрити
        </Button>
        <Button variant="primary" onClick={(e)=>addNewRecipe(e)}>Додати</Button>
      </Modal.Footer>
    </Modal>

  );

};
export default RecipeModal;