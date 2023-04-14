
import React from 'react';
import {Link, Outlet} from 'react-router-dom';



function Navbar(){


	return(
		<>
			<header>
				<div className='All_header_menu'>
					<div className='Logo'>
                Меню
					</div>
					<div className='Top_menu'>
						<Link to='/'>Домашня сторінка</Link>
						<Link to='/products'>Всі продукти</Link>
						<Link to='/recipes'>Всі рецепти</Link>
						<Link to='/fridge'>Ваш холодильник</Link>
					</div>
				</div>
       
        
			</header>
    
			<main>
				<Outlet/>
			</main>

			<footer >2023</footer>
		</>
	);
}
export default Navbar;