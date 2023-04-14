import React from 'react';
import {Routes, Route} from 'react-router-dom';

import ProductToRecipe from './Pages/Recipes/ProductToRecipe';
import Products from './Pages/Products/Products';
import Fridge from './Pages/Fridge/Fridge';
import Navbar from './Pages/Navbar';
import DefaultPage from './Pages/DefaultPage';


function App() {
  


	return (
   
		<div className='App'>
       
			{/* <Particles id="tsparticles" /> */}
			<Routes>
      
				<Route path='/' element={<Navbar/>}>
          
					<Route index element={<DefaultPage/>}/>
          
					<Route path='/products' element={<Products/>}/>
					<Route path='/recipes' element={<ProductToRecipe/>}/>
					<Route path='/fridge' element={<Fridge/>}/>
          
				</Route>
        
        
			</Routes>
      
		</div>
    
    
	);
}

export default App;
