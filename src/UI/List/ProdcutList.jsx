import React from 'react';
import Table from 'react-bootstrap/Table';
//import '../../styles/App.css';
import ProductItem from '../Item/ProductItem';


const ProductList = ({products, value, handleUpdate, deleteProduct}) =>{

	return (

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
				{products.filter(prod=> 
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

export default ProductList;