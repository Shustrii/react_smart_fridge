
import {Link, Outlet} from 'react-router-dom';



function Navbar(){


    return(
        <>
    <header>
        <Link to='/'>Products</Link>
        <Link to='/recipes'>Recipes</Link>
        <Link to='fridge'>Fridge</Link>
    </header>
    <Outlet/>
    <footer>2023</footer>
    </>
    )
}
export default Navbar;