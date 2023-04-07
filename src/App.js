import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';

import ProductToRecipe from './Pages/ProductToRecipe';
import Products from './Pages/Products';
import Fridge from './Pages/Fridge';
import Navbar from './Pages/Navbar';
import HomePage from './Pages/HomePage';
import Particles from './Components/Particles';


function App() {
  


  return (
   
    <div className="App">
       
      {/* <Particles id="tsparticles" /> */}
      <Routes>
      
        <Route path="/" element={<Navbar/>}>
          
          <Route index element={<HomePage/>}/>
          
          <Route path="/products" element={<Products/>}/>
          <Route path="/recipes" element={<ProductToRecipe/>}/>
          <Route path="/fridge" element={<Fridge/>}/>
          
        </Route>
        
        
      </Routes>
      
    </div>
    
    
  );
}

export default App;
