import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const ProductTable =({products, value, handleUpdate, deleteProduct})=>{

	return(
		<Table  bordered hover className='table-text'>
			<thead>
				<tr>
					<th>Назва</th>
					<th>Тип</th>
					<th>в чому вимірюється</th>
					<th></th>
				</tr>
			</thead>
			<tbody >
				{products.filter(prod=>prod.name.toLowerCase().includes(value.toLowerCase())).map((product)=>{
					return(
						<tr key={product.id}>
							<td>{product.name}</td>
							<td>{product.prtName}</td>
							<td>{product.measureName}</td>
							<td className='btn_group_table'>
								<div className='edit'>
									<Button variant='' value={product.id}  
										onClick={() => {handleUpdate(product);}}
										className='edit-button ed-btn'
									>Редагувати</Button>
								</div>
								<div className='delete'>
									<Button variant=''
										className='custom-btn btn-5'
										onClick={() => {deleteProduct(product);}}
									>Видалити</Button>
								</div>
							</td>
						</tr>
					);})}
			</tbody>
		</Table>
	);
};

export default ProductTable;