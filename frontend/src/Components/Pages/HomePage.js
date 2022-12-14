/* eslint-disable no-console */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { addItemToCart, countProductCart } from '../../utils/utilsCart';
import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';

// HTML CODE
const html = `
    <div class="text-center">
        <h1 class="display-1"> Vinci Store </h1>
    </div>

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
        <h1 class="display-1"> Products </h1>
    </div>
    <div class="container py-5">
        <div class="row justify-content" id="imgProduct">

        </div>
    </div>
  <div id="snackbar">Le produit a été ajouté a votre panier !</div>
</div>
  `;

const HomePage = async () => {
  clearPage();
  const main = document.querySelector('main');
  countAllProduct();
  main.innerHTML = html;
  // eslint-disable-next-line no-useless-escape
  const imageCaroussel = importAll(require.context('../../assets/caroussel', true, /\.png$/));

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

  try {
    const options = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const reponse = await fetch('/api/products/getAll', options);

    if (!reponse.ok) {
      throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
    }

    const product = await reponse.json();
    await showProduct(product);

    const btn = document.getElementsByName('btnAddtoCart');

    for (let y = 0; y < btn.length; y += 1) {
      btn[y].addEventListener('click', async (e) => {
        e.preventDefault();
        myFunction();
        console.log("AAAAAA",btn[y].value);
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

async function showProduct(product) {
  const cardProduct = document.getElementById('imgProduct');
  const numberOfProducts = product.length
  let items = ``;
  let i = 0;

  while (i < numberOfProducts) {
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
            <div class="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
                data-mdb-ripple-color="light">
                <img src="${imageProduit[i]}" style="border-top-left-radius: 15px; border-top-right-radius: 15px;"
                    class="img-fluid" alt="Laptop" />
                <a href="#!">
                    <div class="mask"></div>
                </a>
            </div>

            <div class="card-body pb-0">
                <div class="d-flex justify-content-between">
                    <div>
                        <p><a href="#!" class="text-dark aProductName" name="${id}">${nameProduct}</a></p>
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

  const a = document.getElementsByClassName('aProductName');

  const lengthProducts = a.length;

  for (let j = 0; j < lengthProducts; j += 1) {
    a[j].addEventListener('click', async (e) => {
      e.preventDefault();
      const id = a[j].name;
      // eslint-disable-next-line prefer-template
      Navigate('/product?=', id);
    });
  }

  // permet le render vers la page de la categorie cliqué
  const cat = document.getElementsByClassName('categoryName');
  const lengthCategories = cat.length;
  for (let j = 0; j < lengthCategories; j += 1) {
    cat[j].addEventListener('click', async (e) => {
      e.preventDefault();
      const idcat = cat[j].name;
      // eslint-disable-next-line prefer-template
      Navigate('/category?=', idcat);
    });
  } // fin for
}; // fin page

async function countAllProduct() {
  let number;
  try {
    const options = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const reponse = await fetch('/api/products/countAll', options);
    if (!reponse.ok) {
      throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
    }
    number = await reponse.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('error: ', err);
  }
  return number;
}

function importAll(r) {
  return r.keys().map(r);
}

function myFunction() {
  // Get the snackbar DIV
  const x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  x.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(()=> { x.className = x.className.replace("show", ""); }, 3000);
}

export default HomePage;
