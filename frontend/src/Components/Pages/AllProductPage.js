import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { addItemToCart } from '../../utils/utilsCart';
import Navigate from '../Router/Navigate';
import Navbar from '../Navbar/Navbar';

const AllProductPage = async () => {
  const html = `
  <div class="container py-5">
        <div class="row justify-content" id="imgProduct">

        </div>
    </div>
    `;
  const main = document.querySelector('main');
  countAllProduct();
  main.innerHTML = html;

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
        console.log(btn[y].value);
        addItemToCart(btn[y].value, 5, 1);
        Navbar();
      });
    }
  } catch (err) {
    console.error('error: ', err);
  }
};

async function showProduct(product) {
  const cardProduct = document.getElementById('imgProduct');
  const nbImage = await countAllProduct();
  let items = ``;
  let i = 0;

  while (i < nbImage) {
    const imageProduit = importAll(require.context('../../assets/product', true, /\.png$/));
    const id = product[i].id_product;
    const storeName = product[i].store_name;
    const nameProduct = product[i].name;
    const priceProduct = product[i].price;
    const { category } = product[i];
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

  const lenght = a.length;

  for (let j = 0; j < lenght; j += 1) {
    a[j].addEventListener('click', async (e) => {
      e.preventDefault();
      const id = a[j].name;
      // eslint-disable-next-line prefer-template
      Navigate('/product?id_product=', id);
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

export default AllProductPage;
