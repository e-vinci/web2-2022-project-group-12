// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import logoAsset from "../../assets/logo.png"
/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

const Navbar = () => {

  const navbarWrapper = document.querySelector('#navbarWrapper');

  const navbar = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/">
                  <img alt="Logo" src=${logoAsset} height=70 width=70>
                </a>
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/register">Register</a>
              </li>    
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/login">Login Page</a>
              </li>  
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/test">Test</a>
              </li>
              <li>
                <a class="nav-link" href="#" data-uri="/stats">Statistiques</a>
              </li>                   
            </ul>
            <form class="d-flex">
                <input class="form-control me-2" type="text" placeholder="Search">
                <button class="btn btn-primary" type="button">Search</button>
            </form>
          </div>
        </div>
      </nav>
  `;
  navbarWrapper.innerHTML = navbar;
};



export default Navbar;
