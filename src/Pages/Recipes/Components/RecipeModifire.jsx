import React from 'react';
import RecipeService from '../../../API/RecipeService';
import Button from 'react-bootstrap/Button';

const RecipeModifire = ({recipe, recipes, setRecipes, setRecipe, handleShow})=>{

	const deleteRecipe = async(recipe)=>{
		console.log('Recipe do delete', recipe);
		const response = await RecipeService.deleteRecipe(recipe);
		console.log(response);
		setRecipes(recipes.filter(r=> r.id!== recipe.id));
	};

	const handleRecipeUpdate= (recipe)=>{
		setRecipe(recipe);
		handleShow(true);
	};
    
	return(
		<>
			<div className='recipe-name'>{recipe.recipe}</div>
			<div className='buttons_ptr_container'>
				<div className='edit'>
					<Button className='edit-button ed-btn' variant=''
						onClick={() => {handleRecipeUpdate(recipe);}}
					>Редагувати</Button>
				</div>
				<div className='delete'>
					<Button variant=''
						onClick={()=>{deleteRecipe(recipe);}}
						className='custom-btn btn-5'
					>Видалити</Button>
				</div>
                
			</div>
		</>
	);

};

export default RecipeModifire;