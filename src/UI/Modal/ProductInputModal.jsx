import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SelectSearch from '../SelectItem/SelectSearch';

export const productProps = Object.freeze({
	id: 'product_id',
	name: 'product_name',
});

export const measureProps = Object.freeze({
	id: 'id',
	name: 'name',
});

const ProductInputModal = ({header, product, setProduct, selectedMeasure, productsList, show, handleClose, addProduct, onChangeProductSelect})=>{

	const [validated, setValidated] = useState(false);

	const handleSubmit = (event) => {
		const form = event.currentTarget;
		//console.log('handle Submit =', form, '; validity:', form.checkValidity());
		event.preventDefault();
		if (form.checkValidity() === false) {
			event.stopPropagation();
		}else{
			addProduct(event);
		}
		setValidated(true);
	};

	return(
		<Modal show={show} onHide={handleClose} >
			<Modal.Header closeButton>
				<Modal.Title>{header}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form id='fridgeModal' validated={validated} noValidate onSubmit={handleSubmit}>
					
					<SelectSearch 
						lable={'Назва продукту'}
						invalidMsg={'Будь ласка, введіть назву продукта.'}
						//value={{product_id: product.product_id, product_name: product.product_name}	}
						value={(product.product_id!==0)?{product_id: product.product_id, product_name: product.product_name}:null}
						defaultValue={product ? product.product_name : ''}
						options={productsList}
						optionData={productProps} 
						changeData={(e) => {
							//console.log('change measure ',e);
							onChangeProductSelect(e);
						}}
					/>

					<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
						<Form.Label>Кількість</Form.Label>
						<Form.Control type='number' placeholder='enter quantity' defaultValue={product.quantity} min={0}
							onChange={(e) => setProduct({...product, quantity: e.target.value})}/>
					</Form.Group>

					<SelectSearch 
						lable={'Одиниця виміру'}
						invalidMsg={'Будь ласка, введіть одиницю виміру.'}
						value={{id: product.measure_id, name: product.measure_name}}
						defaultValue={product ? product.measure_name : ''}
						options={selectedMeasure}
						optionData={measureProps} 
						changeData={(e) => {
							//console.log('change measure ',e);
							setProduct({
								...product, measure_id: e.id, measure_name: e.name, 
							});
						}}
					/>

				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={handleClose}>
				Закрити
				</Button>
				<Button variant='primary' type='submit' form='fridgeModal'>
				Зберегти зміни
				</Button>
			</Modal.Footer>
		</Modal>

	);


};

export default ProductInputModal;