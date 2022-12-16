/* eslint-disable no-console */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { addItemToCart, countProductCart } from '../../utils/utilsCart';
import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';
import { clearActive, setActiveLink } from '../../utils/activeLink';
import { setUserIcon } from '../../utils/userIcon';
import Navbar from '../Navbar/Navbar';


// HTML CODE
const html = `
    <div class="text-center">
        <h1 class="display-1"> Vinci Store </h1>
    </div>

    <!-- HTML CAROUSSEL -->
    <div class="carousselContainer ">
        <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
            <div class="carousel-indicators" id="carousel-buttons">

            </div>
            <div class="carousel-inner" id="carousel-items">

            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>

    <div class="text-center">
          <h1 class="display-1">Products</h1>
          <h3>Last collection ! </h3>
      </div>

      <!-- HTML PRODUCTS -->
      <div class="container py-5">
          <div class="row justify-content" id="imgProduct"></div>
          <div id="snackbar">Le produit a été ajouté a votre panier !</div>
      </div>

    <!-- HTML CATEGORIES -->
    <div class="container-fluid pt-5">
        <h1>Categories</h1>
            <div class="row px-xl-5 pb-3">
                <div class="col-lg-4 col-md-6 pb-1">
                    <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                        <p class="text-right">15 Products</p>
                        <a href="" class="cat-img position-relative overflow-hidden mb-3">
                          <img class="img-fluid" src="img/cat-1.jpg" alt="">
                        </a>
                        <h5 class="font-weight-semi-bold m-0">Men's dresses</h5>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 pb-1">
                    <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                        <p class="text-right">15 Products</p>
                        <a href="" class="cat-img position-relative overflow-hidden mb-3">
                            <img class="img-fluid" src="img/cat-2.jpg" alt="">
                        </a>
                        <h5 class="font-weight-semi-bold m-0">Women's dresses</h5>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 pb-1">
                    <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                        <p class="text-right">15 Products</p>
                        <a href="" class="cat-img position-relative overflow-hidden mb-3">
                            <img class="img-fluid" src="img/cat-3.jpg" alt="">
                        </a>
                        <h5 class="font-weight-semi-bold m-0">Accerssories</h5>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 pb-1">
                    <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                        <p class="text-right">15 Products</p>
                        <a href="" class="cat-img position-relative overflow-hidden mb-3">
                            <img class="img-fluid" src="img/cat-4.jpg" alt="">
                        </a>
                        <h5 class="font-weight-semi-bold m-0">Bags</h5>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 pb-1">
                    <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                        <p class="text-right">15 Products</p>
                        <a href="" class="cat-img position-relative overflow-hidden mb-3">
                            <img class="img-fluid" src="img/cat-5.jpg" alt="">
                        </a>
                        <h5 class="font-weight-semi-bold m-0">Shoes</h5>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 pb-1">
                    <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                        <p class="text-right">15 Products</p>
                        <a href="" class="cat-img position-relative overflow-hidden mb-3">
                            <img class="img-fluid" src="img/cat-6.jpg" alt="">
                        </a>
                        <h5 class="font-weight-semi-bold m-0">Home</h5>
                    </div>
                </div>
            </div>
      </div>
  `;



// HOME PAGE 
const HomePage = async () => {
  clearPage();
  setActiveLink('homePage');
  setUserIcon('extUserPage');
  Navbar();
  const main = document.querySelector('main');
  
  main.innerHTML = html;
  // eslint-disable-next-line no-useless-escape
  const imageCaroussel = importAll(require.context('../../assets/caroussel', true, /\.png$/));

  // Construction Caroussel 

  const carrouselListItem = document.getElementById('carousel-items');
  let i = 0;
  let items = ``;
  while (i < 2) {
    if (i === 0) {
      items += `<div class="carousel-item active" data-bs-interval="10000">
    <img src="${imageCaroussel[i]}" id="item-${i}" class="d-block w-100" alt="img">
   </div>`;
    } else {
      items += `<div class="carousel-item" data-bs-interval="10000">
    <img src="${imageCaroussel[i]}" class="d-block w-100" alt="img">
   </div>`;
    }

    i += 1;
  }
  carrouselListItem.innerHTML = items;

  i = 0;
  items = ``;
  const carouselButtons = document.getElementById('carousel-buttons');
  while (i < 2) {
    if (i === 0) {
      items += `<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="${i}" class="active" aria-current="true" aria-label="Slide ${i +
        1}"></button>
      `;
    } else {
      items += `<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="${i}" aria-label="Slide ${i +
        1}"></button>`;
    }

    i += 1;
  }
  carouselButtons.innerHTML = items;

  // Fetch pour aller chercher tous les produits dans la db

  try {
    const options = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const reponse = await fetch('/api/products/selectLastProduct', options);

    if (!reponse.ok) {
      throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
    }

    const product = await reponse.json();
    await showLastProduct(product);

    const btn = document.getElementsByName('btnAddtoCart');

    for (let y = 0; y < btn.length; y += 1) {
      btn[y].addEventListener('click', async (e) => {
        e.preventDefault();
        showSnackBar();
        addItemToCart(product[y].id_product ,product[y].name, product[y].price, 1);
        const nombre = document.getElementById('numberOfArticles');
        const newNombre = countProductCart();
        nombre.innerHTML = newNombre;

      });
    }
  } catch (err) {
    console.error('error: ', err);
  }

};


// Affiche les 5 derniers produits de la base de donnée 
async function showLastProduct(product) {
  
  const cardProduct = document.getElementById('imgProduct');
  let items = ``;
  let i = 0;

  while (i <  product.length) {

    const imageProduit = importAll(require.context('../../assets/product', true, /\.png$/));

    const id = product[i].id_product;
    const storeName = product[i].store_name;
    const nameProduct = product[i].name;
    const priceProduct = product[i].price;
    const {category} = product[i];
    const categoryId = product[i].id_category;

    items += `
      <div class="col-md-8 col-lg-6 col-xl-4">
          <div class="card" style="border-radius: 15px;">
              <div class="bg-image hover-overlay ripple ripple-surface ripple-surface-light" data-mdb-ripple-color="light">
                  <img src="${imageProduit[i]}" style="border-top-left-radius: 15px; border-top-right-radius: 15px;" class="img-fluid" alt="Laptop" />
              </div>

          <div class="card-body pb-0">
              <div class="d-flex justify-content-between">
                    <div>
                        <p><a href="#!" class="text-dark productName" name="${id}">${nameProduct}</a></p>
                        <p class="small text-muted">by ${storeName}</p>
                    </div>
                    <div>
                        <p class="small text-muted"><a href="#" class="text-dark categoryName" name="${categoryId}">${category}</a></p>
                    </div>
                </div>
            </div>
            <hr class="my-0" />
            <div class="card-body pb-0">
                <div class="d-flex justify-content-between">
                    <p class="text-dark">${priceProduct}€</p>
                </div>
            </div>
            <hr class="my-0" />
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center pb-2 mb-1">
                    <a href="#!" class="text-dark fw-bold">Cancel</a>
                    <button type="button" name="btnAddtoCart" value="${id}" class="btn btn-dark"><i class="bi bi-cart-plus"></i></button>
                </div>
            </div>
        </div>
    </div>
  `;
    i += 1;
  }
  cardProduct.innerHTML = items;

  const productName = document.getElementsByClassName('productName');
  for (let j = 0; j < product.length; j += 1) {
    productName[j].addEventListener('click', async (e) => {
      e.preventDefault();
      const id = productName[j].name;
      // eslint-disable-next-line< prefer-template
      clearActive();
      Navigate('/product?=', id);
    });
  }

  
  const cat = document.getElementsByClassName('categoryName');
  for (let j = 0; j < cat.length; j += 1) {
    cat[j].addEventListener('click', async (e) => {
      e.preventDefault();
      const idcat = cat[j].name;
      // eslint-disable-next-line prefer-template
      clearActive();
      Navigate('/category?=', idcat);
    });}
}; 

function importAll(r) {
  return r.keys().map(r);
}

function showSnackBar() {
  // Get the snackbar DIV
  const x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(()=> { x.className = x.className.replace("show", ""); }, 3000);
}

export default HomePage;
