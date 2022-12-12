// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import logoAsset from '../../assets/image0.png';
import 'animate.css';
import { getAuthenticatedUser } from '../../utils/auths';
import { countProductCart} from '../../utils/utilsCart';

/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

const Navbar = () => {
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const authenticatedUser = getAuthenticatedUser();
  
  if (authenticatedUser === undefined) {
    const navbar = `
    <div class="row align-items-center py-3 px-xl-5">
            <div class="col-lg-3 d-none d-lg-block">
                <a href="#" data-uri="/" class="text-decoration-none">
                <h1 class="m-0 display-5 font-weight-semi-bold text-black" >Vinci Store<img alt="Logo" src=${logoAsset} height=80 width=80></a></h1>
                  
                </a>
            </div>
            <div class="col-lg-6 col-6 text-left">
                <form action="">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search for products">
                        <div class="input-group-append">
                            <span class="input-group-text bg-transparent text-primary">
                                <i class="bi bi-search"></i>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="container-fluid mb-5">
        
                <nav class="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                <div class="dropdown">
                <a class="btn btn-secondary " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" >
                  Categories
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </div>
                    <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div class="navbar-nav mr-auto py-0">
                            <a href="#" class="nav-item nav-link active" data-uri="/"><i class="bi bi-house-door"></i>Home</a>
                            <a href="shop.html" class="nav-item nav-link"><i class="bi bi-shop"></i>Shop</a>
                        </div>
                        <div class="navbar-nav ml-auto py-0">
                            <a href="#" class="nav-item nav-link" data-uri="/login"><i class="bi bi-box-arrow-in-right"></i> Sign-in</a>
                            <a href="#" class="nav-item nav-link" data-uri="/register"><i class="bi bi-person-plus"></i> Sign-up</a>
                        </div>
                    </div>
                </nav>
    </div>
      <nav class="navbar navbar-expand-lg navbar-light bg-dark">
            <div class="container-fluid">
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="nav navbar me-auto mb-2 mb-lg-0">
                  <li class="nav-item ">
                    <a class="nav-link" href="#" data-uri="/">
                      <img alt="Logo" src=${logoAsset} height=70 width=70></a>
                  </li>  
                  <li class="nav-item">
                    <a class="nav-link px-2 text-white" href="#" data-uri="/register"><i class="bi bi-person-plus"></i> Sign-up</a>
                  </li>    
                  <li class="nav-item">
                    <a class="nav-link px-2 text-white" href="#" data-uri="/login"><i class="bi bi-box-arrow-in-right"></i> Sign-in</a>
                  </li>  
                  <li>
                    <a class="nav-link px-2 text-white" href="#" data-uri="/stats"><i class="bi bi-graph-up"></i> Your Insights</a>
                  </li>
                  <li>
                    <a class="nav-link px-2 text-white" href="#" data-uri="/basicseller">Basic Seller</a>
                  </li>
                </ul>
                <div>
                  <form class="d-flex">
                    <input class="form-control me-2" type="text" placeholder="Search">
                    <button class="btn btn-light" id ="cart" type="submit">Search</button>
                  </form>
                </div>
              </div>
            </div>
          </nav>
        
    `;
    navbarWrapper.innerHTML = navbar;
  } else {
    
    const totalProduct = countProductCart();
  
    const navbar = `
    <div class="row align-items-center py-3 px-xl-5">
            <div class="col-lg-3 d-none d-lg-block">
                <a href="#" data-uri="/" class="text-decoration-none">
                  <img alt="Logo" src=${logoAsset} height=70 width=70></a>
                </a>
            </div>
            <div class="col-lg-6 col-6 text-left">
                <form action="">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Search for products">
                        <div class="input-group-append">
                            <span class="input-group-text bg-transparent text-primary">
                                <i class="bi bi-search"></i>
                            </span>
                        </div>
                    </div>
                </form>
            </div>
            <div class="col-lg-3 col-6 text-right">
                <a href="#" class="btn border" data-uri="/cart">
                    <i class="bi bi-cart"></i>
                    <span >${totalProduct}</span>
                </a>
            </div>
        </div>
    </div>
    <div class="container-fluid mb-5">
        
                <nav class="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                <div class="dropdown">
                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" >
                  Dropdown link
                </a>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li><a class="dropdown-item" href="#">Action</a></li>
                  <li><a class="dropdown-item" href="#">Another action</a></li>
                  <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </div>
                    <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div class="navbar-nav mr-auto py-0">
                            <a href="#" class="nav-item nav-link active" data-uri="/"><i class="bi bi-house-door"></i>Home</a>
                            <a href="shop.html" class="nav-item nav-link"><i class="bi bi-shop"></i>Shop</a>
                            <a href="#" class="nav-item nav-link" data-uri="/stats"><i class="bi bi-graph-up"></i> Your Insights</a>
                            <a href="#" class="nav-item nav-link" data-uri="/basicseller"><i class="bi bi-shop"></i> Basic Seller</a>
              
                            
                        </div>
                        <div class="navbar-nav ml-auto py-0">
                            <a href="#" class="nav-item nav-link" data-uri="/user"><i class="bi bi-person"></i></a>
                            <a href="#" class="nav-item nav-link" data-uri="/logout"><i class="bi bi-box-arrow-right"></i> Logout</a>
                            
                        </div>
                    </div>
                </nav>
    </div>
       
  `;
    navbarWrapper.innerHTML = navbar;
  }
  
};


export default Navbar;
