import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';

//import ProductToRecipeModal from '../../UI/Modal/ProductToRecipeModal';
import RecipeService from '../../API/RecipeService';
import RecipeModal from '../../UI/Modal/RecipeModal';
import ValidateRecipeModal from '../../UI/Modal/ValidateRecipeModal';
import ProductList from '../../UI/List/ProdcutList';
import ProductInserter from './Components/ProductInserter';
import RecipeModifire from './Components/RecipeModifire';
import ProductInputModal from '../../UI/Modal/ProductInputModal';
import { Form } from 'react-bootstrap';

function ProductToRecipe(){

	const emptyRecipe = {id: 0, recipe:''};
	const emptyProduct = {id:0, recipes_id:0, product_id:0, measure_id:0,quantity:0, name: '', pr_type_id: 0, prtName: '', measure_name: '' };
	const [rShow, setrShow] = useState(false);
	const [pShow, setpShow] = useState(false);
	const [vrShow, setvrShow] = useState(false);
	const [recipe, setRecipe] = useState(emptyRecipe);
	const [product, setProduct] = useState(emptyProduct);
	const [recipes, setRecipes] = useState([]);
	const [selectedMeasure, setSelectedMeasure] = useState([]);
	const [measure, setMeasures] = useState([]);
	const [allProducts, setAllProducts] = useState([]);
	const [prNotInRecipe, setPrNotInRecipe] = useState([]);
	const [validateProductRecipe, setValidateProductRecipe] = useState([]);
  
	const handleClose = () => setrShow(false);
	const handleShow = () => setrShow(true);
	const handlePClose = () => setpShow(false);
	const handlePShow = () => setpShow(true);
	const handleVRClose = () => setvrShow(false);
	const handleVRShow = () => setvrShow(true);


	useEffect(()=>{
		const fetchData = async ()=>{
			console.log('useEffect -> Products');
			try {
				getAllRecipes();
				getAllMeasures(); 
			} catch (error) {
				console.log(error);
			}
		};
    
		fetchData();
	}, []);
    
	useEffect(()=>{
		console.log('useEffect -> Products: ', allProducts);
	}, [allProducts]);
    
	useEffect(()=>{
		console.log('useEffect -> Recipe: ', recipe);
		getPrNotInRec(recipe);
        
	}, [recipe]);
    
	async function getAllRecipes(){
		const response = await RecipeService.getAllRecipes();
		console.log('All recipes: ',response.data);
		setRecipes(response.data);
	}
    
	async function getAllProducts (recipe){
		console.log('getproducts -> recipe: ', recipe);
		//if recipe not loaded -> getting products
		if (recipe.loaded === undefined){
			const response = await RecipeService.getAllProducts(recipe);
			setAllProducts(allProducts.concat(response.data));
			//console.log("got data: ", response)
          
			//set loaded for Recipe
			const list = recipes.map((rec)=>{
				if(rec.id === recipe.id && rec.loaded === undefined){
					console.log('found Recipe in map');
					//return {...rec, loaded: true, values: response.data};
					return {...rec, loaded: true};
				}
				return rec;
			});
    
			//update recipes
			setRecipe(recipe);
			setRecipes(list);
		}
	}
    
	async function getAllMeasures() {
		const response = await RecipeService.getMeasures();
		console.log('AllMeasures: ', response.data);
		setMeasures(response.data);
	}

	async function getAllReadyRecipes(e){
		const response = await RecipeService.getAllReadyRecipes();
		console.log('getAllReadyRecipes: ', response.data);
		console.log('e : ', e);
		if (e.target.checked){
			setRecipes(response.data);
		}
		else{
			getAllRecipes();
		}

	}
    
	useEffect(()=>{
		console.log('useEffect -> update in selectedProduct: ', product);
		setSelectedMeasure([]);
    
		if (product.measure_id !== 0){
			const selectedMeasure = measure.find((measure) => measure.id === product.measure_id);
			console.log('selectedMeasure: ' + selectedMeasure);
      
			const selectedMeasures = measure.filter((measure) => measure.measure_id === selectedMeasure.measure_id);
			setSelectedMeasure(selectedMeasures);
		}
    
	}, [product]);
    
	async function getPrNotInRec(recipe){
		console.log('recipe ', recipe);
		const response = await RecipeService.getPrNotInRecipe(recipe);
		console.log('getPrNotInRec ', response);
		setPrNotInRecipe(response.data);
	}
      
	const handleRecipeCreate =()=>{
		setRecipe(emptyRecipe);
		handleShow();
	};
    
	const handleProductInsert = (recipe) =>{
		setRecipe(recipe);
		setProduct(emptyProduct);
		handlePShow();
	};
     
	const addNewRecipe = async(e)=>{
		e.preventDefault();
		if(recipe.id===0){
			console.log(recipe);
			const newRecipe = await RecipeService.addNewRecipe(recipe);
			console.log('New Product', newRecipe);
			setRecipes([...recipes, newRecipe.data]);
		}else{
			console.log('Updated recipe: ', recipe);
			const updateRecipe = await RecipeService.editRecipe(recipe);
			console.log('UpdateRecipe : ', updateRecipe);
			setRecipes(recipes.map(r => (r.id === recipe.id)? updateRecipe.data : r));
		}
    
		setrShow(false);
	};
    
	const onChangeProductSelect=(prod)=>{
		console.log('Changed product ',product);
		setProduct({...product, product_id: prod.product_id, product_name: prod.product_name, measure_id: prod.measure_id});
	}; 
    
	const handleUpdate = (product) => {
		//console.log(product);
		setProduct(product);
		handlePShow(true);
	};
    

    
	const addProduct= async (e)=>{
		e.preventDefault();
		if(product.recipes_id===0){
			const newProduct = {...product, recipes_id:recipe.id};
			console.log(newProduct);
			const addProduct = await RecipeService.addProduct(newProduct);
			console.log(addProduct.data);
			setAllProducts([...allProducts, newProduct]);
			const list = prNotInRecipe.filter(p=>p.product_id !== product.product_id);
			setPrNotInRecipe(list);
			setProduct(emptyProduct);
		}else{
			console.log('Updated product: ', product);
			const updatedProduct = await RecipeService.editProduct(product);
			console.log('Updated Product', updatedProduct);
			setAllProducts(allProducts.map(p=>(p.product_id === product.product_id)?product:p));
			console.log('Updated products: ', updatedProduct.data);
			setpShow(false);
		}
    
	};

	const validateRecipe = async(recipe)=>{
		console.log('Validated recipe ',recipe);
		const response = await RecipeService.validateRecipe(recipe);
		console.log('validate response',response);
		setValidateProductRecipe(response.data);
		handleVRShow(true);
        
	};
    
	const deleteProduct = async (product)=>{
		console.log('Product do delete', product);
		const response = await RecipeService.deleteProduct(product);
		console.log(response);
		setAllProducts(allProducts.filter(p => p.product_id !== product.product_id));
    
	};
    




	const[value, setValue] = useState('');
    
	return(

		<div className='App'>
			<Button className='adding-button-top btn-add-top' variant='' onClick={handleRecipeCreate}>
        Додати новий рецепт
			</Button>
			<hr style={{margin: '15px 0'}}/>

			<form className='seach-form'>
				<input 
					className='search'
					type='text'
					placeholder='Пошук рецепта'
					onChange={(event)=>setValue(event.target.value)}

				/>
			</form>
			<form>
				<Form.Check 
					type='switch'
					id='custom-switch'
					label='Що можна зробити з наявних продуктів?'
					onClick={(e)=> getAllReadyRecipes(e)}
					//onClick={(e)=> getAllReadyRecipes(e)}
				/>
			</form>
			{/* <ProductToRecipeModal pShow={pShow} handlePClose={handlePClose} product={product} prNotInRecipe={prNotInRecipe} selectedMeasure={selectedMeasure} setProduct={setProduct} onChangeProductSelect={onChangeProductSelect} addProduct={addProduct}/> */}
			<ProductInputModal 
				header='Створення рецепту частина 2'
				show={pShow} handleClose={handlePClose} product={product} productsList={prNotInRecipe} 
				selectedMeasure={selectedMeasure} setProduct={setProduct} 
				onChangeProductSelect={onChangeProductSelect} addProduct={addProduct}/>

			<RecipeModal rShow={rShow} handleClose={handleClose} recipe={recipe} setRecipe={setRecipe} addNewRecipe={addNewRecipe}/>
			<ValidateRecipeModal vrShow={vrShow} handleVRClose={handleVRClose} validateProductRecipe={validateProductRecipe}/>
			
			<Accordion >
				{recipes.filter(recip=> recip.recipe.toLowerCase().includes(value.toLowerCase())).map((recipe)=>{
					return(
						<Accordion.Item  eventKey={recipe.id} key={recipe.id} >
							<Accordion.Header >

								<RecipeModifire recipe={recipe} recipes={recipes} setRecipe={setRecipe} setRecipes={setRecipes} handleShow={handleShow}/>

							</Accordion.Header>            
							<Accordion.Body onEnter={() => {getAllProducts(recipe);}} >

								<ProductInserter recipe={recipe} handleProductInsert={handleProductInsert} validateRecipe={validateRecipe}/>
								
								<hr style={{margin: '15px 0'}}/>
              
								<ProductList 
									products={allProducts.filter(p=> p.recipes_id === recipe.id)}
									value={value}
									handleUpdate={handleUpdate}
									deleteProduct={deleteProduct}/>
							</Accordion.Body>
						</Accordion.Item>
					);})
				} 
			</Accordion>      
		</div>
	);



}
export default ProductToRecipe;