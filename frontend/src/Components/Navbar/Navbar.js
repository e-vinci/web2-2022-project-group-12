// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';
import logoAsset from '../../assets/image0.png';
import 'animate.css';
import { getAuthenticatedUser } from '../../utils/auths';
import { setSearch } from '../../utils/utilsSearch';
import Navigate from '../Router/Navigate';
import { countProductCart } from '../../utils/utilsCart';
import { clearPage } from '../../utils/render';
import SearchResultsPage from '../Pages/SearchResultsPage';

/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

const Navbar = () => {
  clearPage();
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const user = getAuthenticatedUser();

  if (user === undefined) {
    const navbar = `
    <div class="row align-items-center py-3 px-xl-5">
        <div class="col-lg-3 d-none d-lg-block">
            <a href="#" data-uri="/" class="text-decoration-none">
              <h1 class="m-0 display-5 font-weight-semi-bold text-black">Vinci Store
                  <img alt="Logo" src=${logoAsset} height=80 width=80>
              </h1>
            </a>
        </div>
        <div class="col-lg-6 col-6 text-left">
            <form action="">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search for products" id="search">
                    <div class="input-group-append">
                        <button class="input-group-text bg-transparent text-primary" id="searchbtn">
                            <i class="bi bi-search"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="container-fluid mb-5">
        <nav class="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
            <div class="dropdown">
                <a class="btn btn-secondary " href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown"
                    aria-expanded="false">
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
                    <a href="#" class="nav-item nav-link active" data-uri="/"><i class="bi bi-house-door"></i> Home</a>
                    <a href="#" class="nav-item nav-link" data-uri="/allProducts"><i class="bi bi-shop"></i> Shop</a>
                </div>
                <div class="navbar-nav ml-auto py-0">
                    <a href="#" class="nav-item nav-link" data-uri="/login"><i class="bi bi-box-arrow-in-right"></i>
                        Sign-in</a>
                    <a href="#" class="nav-item nav-link" data-uri="/register"><i class="bi bi-person-plus"></i>
                        Sign-up</a>
                </div>
            </div>
        </nav>
    </div>
    `;
    navbarWrapper.innerHTML = navbar;
  } else {
    const totalProduct = countProductCart();

    const navbar = `
    <div class="row align-items-center py-3 px-xl-5">
        <div class="col-lg-3 d-none d-lg-block">
            <a href="#" data-uri="/" class="text-decoration-none">
              <h1 class="m-0 display-5 font-weight-semi-bold text-black">Vinci Store 
                <img alt="Logo" src=${logoAsset} height=80 width=80>
              </h1>
            </a>
        </div>
        <div class="col-lg-6 col-6 text-left">
            <form action="">
                <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search for products" id="search">
                    <div class="input-group-append">
                        <button class="input-group-text bg-transparent text-primary" id="searchbtn">
                            <i class="bi bi-search"></i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
        <div class="col-lg-3 col-6 text-right">
            <a href="#" class="btn border" data-uri="/cart">
                <i class="bi bi-cart"></i>
                <span id="numberOfArticles">${totalProduct}</span>
            </a>
        </div>

    </div>
    <div class="container-fluid mb-5">

        <nav class="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
            <div class="dropdown">
                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                    data-bs-toggle="dropdown" aria-expanded="false">
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
                    <a href="#" class="nav-item nav-link active" data-uri="/"><i class="bi bi-house-door"></i> Home</a>
                    <a href="#" class="nav-item nav-link" data-uri="/allProducts"><i class="bi bi-shop"></i> Shop</a>
                    <a href="#" class="nav-item nav-link" data-uri="/stats"><i class="bi bi-graph-up"></i> Your
                        Insights</a>
                </div>
                <div class="navbar-nav ml-auto py-0">
                    <a id="user" class="nav-item nav-link"><i class="bi bi-person"></i></a>
                    <a href="#" class="nav-item nav-link" data-uri="/logout"><i class="bi bi-box-arrow-right"></i>
                        Logout</a>

                </div>
            </div>
        </nav>
    </div>
       
  `;
    navbarWrapper.innerHTML = navbar;

    const userBtn = document.getElementById('user');
    userBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      Navigate('/user?idSeller=', user.userId);
    });
  }
  
  const btnSearch = document.getElementById('searchbtn');
  btnSearch.addEventListener('click', async (e) => {
    e.preventDefault();
    // Récupération de toute les données avec les id
    const data = document.getElementById('search').value;

    if (data === undefined) {
      console.error('Search vide, ignorer l action');
    } else {
      try {
        const options = {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.

          headers: {
            'Content-Type': 'application/json',
          },
        };
        console.log(JSON.stringify(data));
        // eslint-disable-next-line prefer-template
        const results = await fetch('/api/products/search/' + data, options);
        const products = await results.json();
        console.log(products);

        setSearch(products);

        if (!results.ok) {
          throw new Error(`fetch error : ${results.status}${results.statusText}`);
        }
        SearchResultsPage();
        /* const user = await reponse.json(); */
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('error: ', err);
      }
    } // fin else
  });
};

export default Navbar;
