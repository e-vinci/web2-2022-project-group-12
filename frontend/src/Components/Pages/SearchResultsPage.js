/* eslint-disable no-console */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { addItemToCart } from '../../utils/utilsCart';
import Navigate from '../Router/Navigate';
import { getSearch } from '../../utils/utilsSearch';

// HTML CODE
const html = `
<div class="text-center" id="resultStatus">

</div>

<div class="container py-5">
    <div class="row justify-content" id="imgProduct">
      
    </div>
</div>
  `;

const SearchResultsPage = async () => {
  const main = document.querySelector('main');
  countAllProduct();
  main.innerHTML = html;

  const results= getSearch();

  const resultStatus = document.getElementById('resultStatus');
  const nombreResultats = results.length;
  if (nombreResultats === 0) {
    resultStatus.innerHTML += `<p>${nombreResultats} resultats trouvés</p>`;
  } else {
    resultStatus.innerHTML += `<p>${nombreResultats} resultats trouvés</p>`;
    await showProduct(results);

    const btn = document.getElementsByName('btnAddtoCart');

    for (let y = 0; y < btn.length; y += 1) {
      btn[y].addEventListener('click', async (e) => {
        e.preventDefault();
        console.log(btn[y].value);
        addItemToCart(btn[y].value, 5, 1);
      });
    }
  }
};

async function showProduct(product) {
  const cardProduct = document.getElementById('imgProduct');
  const nombreResultats = product.lenght;
  let items = ``;
  let i = 0;
    console.log('tesst avant')
  while (i < nombreResultats) {
    console.log('tesst apres', i);
    const imageProduit = importAll(require.context('../../assets/product', true, /\.png$/));
    const id = product[i].id_product;
    const storeName = product[i].store_name;
    const nameProduct = product[i].name;
    const priceProduct = product[i].price;
    const { category } = product[i];
    items += `
    <div class="col-md-8 col-lg-6 col-xl-4" >
    <div class="card" style="border-radius: 15px;" >
    <div class="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
            data-mdb-ripple-color="light" >
    <img src="${imageProduit[i]}"
    style="border-top-left-radius: 15px; border-top-right-radius: 15px;" class="img-fluid"
    alt="Laptop"/>
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
                <p class="small text-muted"><a href="#" class="text-dark">${category}</a></p>
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
              <button type="button" name="btnAddtoCart" value="${id}" class="btn btn-primary">Add to cart</button>
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
}

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

export default SearchResultsPage;
