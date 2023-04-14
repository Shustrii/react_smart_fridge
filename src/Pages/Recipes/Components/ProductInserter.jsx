import React from 'react';


const ProductInserter = ({recipe, handleProductInsert, validateRecipe})=>{


	return(
		<div className=''>
			<div className='add-prod'>
				<button className='add-new-product-to-recipe btn-add' onClick={() => handleProductInsert(recipe)}>
Додати новий продукт
				</button>
			</div>
			<div className='make-rec'>
				<button className='make-it btn-make' onClick={()=>{validateRecipe(recipe);}}>
Зробити рецепт
				</button>
			</div>
		</div>
	);
};

export default ProductInserter;