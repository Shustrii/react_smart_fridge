import axios from 'axios';

const GET_ALL_RECIPES_URL = 'http://localhost:8080/fridge/v1/recipes';

const GET_PRODUCTS_NOT_IN_RECIPE_URL = 'http://localhost:8080/fridge/v1/not_in_recipe';
const All_Measures_URL = 'http://localhost:8080/fridge/v1/measures';

const RECIPE_URL = 'http://localhost:8080/fridge/v1/add/recipe';
//const EDIT_RECIPE_URL = 'http://localhost:8080/fridge/v1/recipe_update';
//const DELETE_RECIPE_URL = 'http://localhost:8080/fridge/v1/delete_recipe';

const GET_ALL_PRODUCTS_URL = 'http://localhost:8080/fridge/v1/products_in_recipe';
const PRODUCT_IN_RECIPE_URL = 'http://localhost:8080/fridge/v1/product_in_recipe';
//const EDIT_PRODUCT_URL = 'http://localhost:8080/fridge/v1/product_in_recipe_update';
//const DELETE_PRODUCT_URL = 'http://localhost:8080/fridge/v1/delete_product_from_recipe';

const VALIDATE_RECIPE_URL = 'http://localhost:8080/fridge/v1/validate_recipe';
const GET_ALL_READY_RECIPES = 'http://localhost:8080/fridge/v1/ready_recipes';



const config = {
	headers: {
		'Content-Type': 'application/json;charset=UTF-8',
	},
	data: {},
};

export default class RecipeService{

	static async getAllRecipes(){
		const response = axios.get(GET_ALL_RECIPES_URL);
		return response;
	}

	static async addNewRecipe(recipe){
		const response = axios.post(RECIPE_URL, recipe);
		return response;
	}

	static async editRecipe(recipe){
		const response = axios.put(RECIPE_URL, recipe);
		return response;    
	}

	static async deleteRecipe(recipe){
		config.data = recipe;
		const response = await axios.delete(RECIPE_URL, config);
		return response;
	}

	static async getAllProducts(recipe){
		console.log(recipe);
		const response = axios.get(GET_ALL_PRODUCTS_URL+'/'+recipe.id);
		return response;
	}


	static async getPrNotInRecipe(recipe){
        
		const response = axios.get(GET_PRODUCTS_NOT_IN_RECIPE_URL + '/' + recipe.id);
		return response;
	}

	static async getMeasures() {
		const response = await axios.get(All_Measures_URL);
		return response;
	}

	static async addProduct(product){
		const response = axios.post(PRODUCT_IN_RECIPE_URL, product);
		return response;
	}

	static async editProduct(product){
		const response = await axios.put(PRODUCT_IN_RECIPE_URL, product);
		return response;

	}

	static async deleteProduct(product){
		config.data = product;
		const response = await axios.delete(PRODUCT_IN_RECIPE_URL, config);
		return response;
	}

	static async validateRecipe(recipe){
		const response = await axios.get(VALIDATE_RECIPE_URL +'/'+ recipe.id);
		return response;
	}

	static async getAllReadyRecipes(){
		const response = await axios.get(GET_ALL_READY_RECIPES);
		return response;
	}

}