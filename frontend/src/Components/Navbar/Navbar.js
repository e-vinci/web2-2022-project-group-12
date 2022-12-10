// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import logoAsset from "../../assets/logo.png"
import 'animate.css'
import { getAuthenticatedUser } from '../../utils/auths';

/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

const Navbar = () => {
  
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const authenticatedUser = getAuthenticatedUser();
  if( authenticatedUser === undefined ){
    const navbar = `
      <nav class="navbar navbar-expand-lg navbar-light bg-dark">
            <div class="container-fluid">
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="nav navbar me-auto mb-2 mb-lg-0">
                  <li class="nav-item ">
                    <a class="nav-link" href="#" data-uri="/">
                      <img alt="Logo" src=${logoAsset} height=70 width=70>
                    </a>
                  <li class="nav-item">
                    <a class="nav-link px-2 text-white" href="#" data-uri="/register">Sign up</a>
                  </li>    
                  <li class="nav-item">
                    <a class="nav-link px-2 text-white" href="#" data-uri="/login">Sign in</a>
                  </li>  
                  <li class="nav-item">
                    <a class="nav-link px-2 text-white" href="#" data-uri="/test">Test</a>
                  </li>
                  <li>
                    <a class="nav-link px-2 text-white" href="#" data-uri="/stats">Statistics</a>
                  </li>
                  <li>
                    <a class="nav-link px-2 text-white" href="#" data-uri="/basicseller">Basic Seller</a>
                  </li>
                </ul>
                  <form class="d-flex">
                    <input class="form-control me-2" type="text" placeholder="Search">
                    <button class="btn btn-light" type="button">Search</button>
                  </form>
              </div>
            </div>
          </nav>
        
    `;
    navbarWrapper.innerHTML = navbar;
  }else{
    const navbar = `
    
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
          <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link" href="#" data-uri="/">
                    <img alt="Logo" src=${logoAsset} height=70 width=70>
                  </a>
                <li class="nav-item">
                  <a class="nav-link" href="#" data-uri="/test">Test</a>
                </li>
                <li>
                  <a class="nav-link" href="#" data-uri="/stats">Statistics</a>
                </li>
                <li>
                  <a class="nav-link" href="#" data-uri="/basicseller">Basic Seller</a>
                </li> 
                <li>
                  <a class="nav-link" href="#" data-uri="/cart">My Cart</a>
                </li>
                <li>
                  <a class="nav-link" href="#" data-uri="/user">My profile</a>
                </li>
                <li>
                  <a class="nav-link" href="#" data-uri="/logout">Logout</a>
                </li>         
              </ul>
                <form class="d-flex">
                  <input class="form-control me-2" type="text" placeholder="Search">
                  <button class="btn btn-light" id ="cart" type="submit">Search</button>
                /form>
            </div>
          </div>
        </nav>
       
  `;
  navbarWrapper.innerHTML = navbar;
  }
};


export default Navbar;
