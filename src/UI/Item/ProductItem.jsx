import React from 'react';
import { Button } from 'react-bootstrap';

const ProductItem = ({ product, handleUpdate, deleteProduct }) => {
	return (
		<tr key={product.product_id} className='table-text'>
			<td>{product.product_name}</td>
			<td>{product.quantity}</td>
			<td>{product.measure_name}</td>
			<td className='btn_group_table'>
				<div className='edit'>
					<Button
						variant=''
						className='edit-button ed-btn'
						value={product.product_id}
						onClick={() => {
							handleUpdate(product);
						}}
						title='Редагувати'
						
					>
						Редагувати
					</Button>
					
				</div>
				<div className='delete'>
					<Button
						variant=''
						className='custom-btn btn-5'
						onClick={() => {
							deleteProduct(product);
						}}
					>
            Видалити
					</Button>
				</div>
			</td>
		</tr>
	);
};

export default ProductItem;
