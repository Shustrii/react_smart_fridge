import React from 'react';
import ProductToRecipe from './Pages/ProductToRecipe';
import Products from './Pages/Products';
import Fridge from './Pages/Fridge';
import {Routes, Route, Link} from 'react-router-dom';
import Navbar from './Pages/Navbar';


function App() {
  


  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Navbar/>}>
          <Route index element={<Products/>}/>
          <Route path='/recipes' element={<ProductToRecipe/>}/>
          <Route path='/fridge' element={<Fridge/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
