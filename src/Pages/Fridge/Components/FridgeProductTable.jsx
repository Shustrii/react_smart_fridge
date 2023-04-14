import React from 'react';
import Table from 'react-bootstrap/Table';
import ProductItem from '../../../UI/Item/ProductItem';

const FridgeProductTable = ({fridgeProducts, value, handleUpdate, deleteProduct})=>{

	return(
		<Table bordered hover>
			<thead>
				<tr className='table'>
					<th>Назва</th>
					<th>Кількість</th>
					<th>Одиниця виміру</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{fridgeProducts.filter(prod=> 
					prod.product_name.toLowerCase().includes(value.toLowerCase()),
				).map((product)=>{
					return(
						<ProductItem 
							key={product.product_id}
							product={product} 
							handleUpdate={handleUpdate} 
							deleteProduct={deleteProduct} />
					);
				})}
			</tbody>
		</Table>
	);
};

export default FridgeProductTable;

	