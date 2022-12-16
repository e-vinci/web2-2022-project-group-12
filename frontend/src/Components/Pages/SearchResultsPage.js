/* eslint-disable no-console */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { getSearch } from '../../utils/utilsSearch';
import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';
import { clearActive } from '../../utils/activeLink';
import { setUserIcon } from '../../utils/userIcon';

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
  clearPage();
  clearActive();
  setUserIcon('extUserPage');
  const main = document.querySelector('main');
  main.innerHTML = html;
  const results = getSearch();
  const resultStatus = document.getElementById('resultStatus');
  const nombreResultats = results.length;
  if (nombreResultats === 0) {
    resultStatus.innerHTML += `<p>No results found</p>`;
  } else {
    resultStatus.innerHTML += `<p>${nombreResultats} results found</p>`;
    const placeResultats = document.getElementById('imgProduct');
    results.forEach((resultat) => {
      // const imageUrl = resultat?.url;
      const productId = resultat.id_product;
      const productName = resultat.name;
      const productPrice = resultat.price;
      const storeName = resultat.store_name;
      const { category } = resultat;
      const categoryId = resultat.id_category;
      const storeId = resultat.id_user;
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
                      <div id="categoria">
                          <p class="small text-muted"><a href="#!" class="text-dark categoryName" name="${categoryId}">${category}</a></p>
                      </div>
                  </div>
              </div>
              <hr class="my-0" />
              <div class="card-body pb-0">
                  <div class="d-flex justify-content-between align-items-center">
                      <p class="text-dark">${productPrice}€</p>

                      <button type="button" name="btnAddtoCart" value="${productId}" class="btn btn-dark"><i class="bi bi-cart-plus"></i></button>

                  
                  </div>
              </div>
          </div>
      </div>
      `;
    }); // fin foreach

    // permet le render vers la page du product cliqué
    const a = document.getElementsByClassName('aProductName');
    const lengthProducts = a.length;
    for (let j = 0; j < lengthProducts; j += 1) {
      a[j].addEventListener('click', async (e) => {
        e.preventDefault();
        const id = a[j].name;
        // eslint-disable-next-line prefer-template
        clearActive();
        Navigate('/product?=', id);
      });
    } // fin for

    // permet le render vers la page du store cliqué
    const shop = document.getElementsByClassName('storeID');
    const lengthShop = shop.length;
    for (let j = 0; j < lengthShop; j += 1) {
      shop[j].addEventListener('click', async (e) => {
        e.preventDefault();
        const id = shop[j].name;
        console.log('ID STORENAME', id);
        // eslint-disable-next-line prefer-template
        clearActive();
        Navigate('/store?=', id);
      });
    } // fin for

    // permet le render vers la page de la categorie cliqué
    const cat = document.getElementsByClassName('categoryName');
    const lengthCategories = cat.length;
    for (let j = 0; j < lengthCategories; j += 1) {
      cat[j].addEventListener('click', async (e) => {
        e.preventDefault();
        const idcat = cat[j].name;
        console.log('ID CAT', idcat);
        // eslint-disable-next-line prefer-template
        clearActive();
        Navigate('/category?=', idcat);
      });
    } // fin for

  } // fin else
}; // fin page
export default SearchResultsPage;
