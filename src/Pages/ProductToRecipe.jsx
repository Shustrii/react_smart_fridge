import React from 'react';
import Table from 'react-bootstrap/Table';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';

import ProductToRecipeModal from '../UI/Modal/ProductToRecipeModal';
import RecipeService from '../API/RecipeService';
import RecipeModal from '../UI/Modal/RecipeModal';
import ValidateRecipeModal from '../UI/Modal/ValidateRecipeModal';

function ProductToRecipe(){

	const emptyRecipe = {id: 0, recipe:''};
	const emptyProduct = {recipes_id:0, product_id:0, measure_id:0,quantity:0, name: '', pr_type_id: 0, prtName: '', measure_name: '' };
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
			setRecipes(list);
		}
	}
    
	async function getAllMeasures() {
		const response = await RecipeService.getMeasures();
		console.log('AllMeasures: ', response.data);
		setMeasures(response.data);
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
    
	const onChangeProductSelect=(product)=>{
		console.log('Changed product ',product);
		setProduct({...product, product_id: product.product_id, product_name: product.product_name});
	}; 
    
	const handleUpdate = (product) => {
		//console.log(product);
		setProduct(product);
		handlePShow(true);
	};
    
	const handleRecipeUpdate= (recipe)=>{
		setRecipe(recipe);
		handleShow(true);
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
    
	const deleteRecipe = async(recipe)=>{
		console.log('Recipe do delete', recipe);
		const response = await RecipeService.deleteRecipe(recipe);
		console.log(response);
		setRecipes(recipes.filter(r=> r.id!== recipe.id));
	};

      


	function BodyData({recipe}){
		const list = allProducts.filter(p=> p.recipes_id === recipe.id);
		//console.log("filter -> recipe: ", recipe); 
		//console.log("filter -> filter: ", list); 
        
		return list.map((product)=>{
			//console.log("item -> ", product);
			return(
				<tr key={product.product_id}>
					<td>{product.product_name}</td>
					<td>{product.measure_name}</td>
					<td>{product.quantity}</td>
					<td className='btn_group_table'>
						<div className='edit'>
							<Button variant=''
								className='edit-button ed-btn'
								onClick={() => {handleUpdate(product);}}
							>Редагувати</Button>
						</div>
						<div className='delete'>
							<Button variant=''
								className='custom-btn btn-5'
								onClick={()=>{deleteProduct(product);}}
							>Видалити</Button>
						</div>
					</td>
				</tr>
			);
		});
	}


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
			<ProductToRecipeModal pShow={pShow} handlePClose={handlePClose} product={product} prNotInRecipe={prNotInRecipe} selectedMeasure={selectedMeasure} setProduct={setProduct} onChangeProductSelect={onChangeProductSelect} addProduct={addProduct}/>
			<RecipeModal rShow={rShow} handleClose={handleClose} recipe={recipe} setRecipe={setRecipe} addNewRecipe={addNewRecipe}/>
			<ValidateRecipeModal vrShow={vrShow} handleVRClose={handleVRClose} validateProductRecipe={validateProductRecipe}/>
			<Accordion >
				{recipes.filter(recip=> recip.recipe.toLowerCase().includes(value.toLowerCase())).map((recipe)=>{
					return(
						<Accordion.Item  eventKey={recipe.id} key={recipe.id} >
							<Accordion.Header >
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

                
                

							</Accordion.Header>            
							<Accordion.Body onEnter={() => {getAllProducts(recipe);}} >
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
								<hr style={{margin: '15px 0'}}/>
              
								<Table  striped bordered hover size='sm' >
									<thead>
										<tr>
											<th>Назва продукту</th>
											<th>В чому вимірюється</th>
											<th>Кількість</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										<BodyData recipe={recipe}/>
									</tbody>
								</Table>
							</Accordion.Body>
						</Accordion.Item>
					);})
				} 
			</Accordion>      
		</div>
	);



}
export default ProductToRecipe;