import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
//import Select from 'react-select';
import SelectItem from '../SelectItem/SelectItem';
import { measureProps, productProps } from './ProductInputModal';

const ProductToRecipeModal_ = ({product, setProduct, pShow, prNotInRecipe, selectedMeasure, handlePClose, onChangeProductSelect, addProduct })=>{
//const FridgeModal = ({product, setProduct, show, productsNotInFr, selectedMeasure, handleClose, addProduct, onChangeProductSelect})=>{

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
				{/* <Form.Group className='mb-3' controlId='formBasicEmail'>
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
				</Form.Group> */}
				<SelectItem 
					lable={'Назва продукту'}
					invalidMsg={'Будь ласка, введіть назву продукта.'}
					value={{product_id: product.product_id, product_name: product.product_name}	}
					defaultValue={product ? product.product_name : ''}
					options={prNotInRecipe}
					optionData={productProps} 
					changeData={(e) => {
						//console.log('change measure ',e);
						onChangeProductSelect(e);
					}}
				/>
				<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
					<Form.Label>Кількість</Form.Label>
					<Form.Control  type='number' name='productQuantity' placeholder='Введіть кількість' value={product.quantity}
						onChange={(e) => setProduct({...product, quantity: e.target.value})}/>
				</Form.Group>
				{/* <Form.Group>
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
				</Form.Group> */}
				<SelectItem 
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

export default ProductToRecipeModal_;