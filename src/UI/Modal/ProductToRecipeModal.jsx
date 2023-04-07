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
			backdrop='static'
			keyboard={false}
		>
			<Modal.Header closeButton>
				<Modal.Title>Створення рецепту частина 2</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Назва продукту</Form.Label>
					<Select
						aria-label='виберіть продукт'
						value={(product.product_id!==0)?{product_id: product.product_id, product_name: product.product_name}:null}
						options={prNotInRecipe}
						getOptionValue={(option) => `${option['product_id']}`}
						getOptionLabel={(option) => `${option['product_name']}`}
						onChange={(e)=>{
							console.log('change product ',e);
							onChangeProductSelect(e);}}
					/>
				</Form.Group>
				<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
					<Form.Label>Кількість</Form.Label>
					<Form.Control  type='number' name='productQuantity' placeholder='Введіть кількість' value={product.quantity}
						onChange={(e) => setProduct({...product, quantity: e.target.value})}/>
				</Form.Group>
				<Form.Group>
					<Form.Label title='В чому вимірюється' />
					<Select 
						aria-label='select measure' 
						value={(product.measure_id!==0)?{id: product.measure_id, name: product.measure_name}:''}
						options={selectedMeasure}
						getOptionValue={(option) => `${option['id']}`}
						getOptionLabel={(option) => `${option['name']}`}
						onChange={(e)=>{
							console.log('change measure ',e);
							setProduct({
								...product, measure_id: e.id, measure_name: e.name, 
							});
						}}
					/>
				</Form.Group>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={handlePClose}>
                  Натисніть, якщо закінчили додавати продукти
				</Button>
				<Button variant='primary' onClick={(e)=>addProduct(e)}>Додати</Button>
			</Modal.Footer>
		</Modal>
    
	);
};

export default ProductToRecipeModal;