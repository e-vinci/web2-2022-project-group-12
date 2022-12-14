/* eslint-disable no-console */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';

// HTML CODE
const html = `
<div class="container py-5">
    <div class="row justify-content" id="imgProduct">
      
    </div>
</div>
  `;

const CategoryPage = async () => {
  clearPage();
  const main = document.querySelector('main');
  main.innerHTML = html;
  const id = window.location.search;
  const url = id.split('=');
  const results = await getCategorie(url[1]);


  const placeResultats = document.getElementById('imgProduct');
  results.forEach((resultat) => {
    // const imageUrl = resultat?.url;
    const productId = resultat.id_product;
    const productName = resultat.name;
    const productPrice = resultat.price;
    const storeName = resultat.store_name;
    const storeId = resultat.id_user;
    const { category } = resultat;
    placeResultats.innerHTML += `
        <div class="col-md-8 col-lg-6 col-xl-4">
          <div class="card" style="border-radius: 15px;">
              <div class="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
                  data-mdb-ripple-color="light">
                  <img src="INSERER imageUrl ici apres" style="border-top-left-radius: 15px; border-top-right-radius: 15px;"
                      class="img-fluid" alt="Laptop" />
                  <a href="#!">
                      <div class="mask"></div>
                  </a>
              </div>

              <div class="card-body pb-0">
                  <div class="d-flex justify-content-between">
                      <div>
                          <p><a href="#!" class="text-dark aProductName" name="${productId}">${productName}</a></p>
                          <p class="small text-muted"><a href="#!" class="text-dark storeID" name="${storeId}">by ${storeName}</a></p>
                      </div>
                      <div>
                            <p class="small text-muted">#${category}</p>
                        </div>
                  </div>
                  
              </div>
              <hr class="my-0" />
              <div class="card-body pb-0">
                  <div class="d-flex justify-content-between">
                      <p class="text-dark">${productPrice}€</p>
                  </div>
              </div>
              <hr class="my-0" />
              <div class="card-body">
                  <div class="d-flex justify-content-between align-items-center pb-2 mb-1">
                      <a href="#!" class="text-dark fw-bold">Cancel</a>
                      <button type="button" name="btnAddtoCart" value="${productId}" class="btn btn-dark"><i class="bi bi-cart-plus"></i></button>
                  </div>
              </div>
          </div>
      </div>
      `;
  }); 

  
  const a = document.getElementsByClassName('aProductName');
  const lengthProducts = a.length;
  for (let j = 0; j < lengthProducts; j += 1) {
    a[j].addEventListener('click', async (e) => {
      e.preventDefault();
      const ida = a[j].name;
      // eslint-disable-next-line prefer-template
      Navigate('/product?=', ida);
    });
  } 

  
  const shop = document.getElementsByClassName('storeID');
  const lengthShop = shop.length;
  for (let j = 0; j < lengthShop; j += 1) {
    shop[j].addEventListener('click', async (e) => {
      e.preventDefault();
      const idshop = shop[j].name;
      console.log('ID STORENAME', idshop);
      // eslint-disable-next-line prefer-template
      Navigate('/store?=', idshop);
    });
  } 
}; 
export default CategoryPage;

async function getCategorie(id) {
    
    let categorie;
  
    try {
      const options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      // eslint-disable-next-line prefer-template
      const reponse = await fetch('/api/products/listByCategory/' + id, options);
      if (!reponse.ok) {
        throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
      }
      categorie = await reponse.json();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('error: ', err);
    }
    return categorie;
  } 
