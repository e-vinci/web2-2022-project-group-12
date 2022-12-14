/* eslint-disable no-console */
import 'bootstrap/dist/css/bootstrap.min.css';
import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';

const StorePage = async () => {
  clearPage();
  const main = document.querySelector('main');

  // permet d'aller chercher un paramètre dans l'url
  const id = window.location.search;
  const url = id.split('=');
  const store = await getStoreById(url[1]);
  const idStore = store[0].id_user;
  const storeName = store[0].store_name;
  const firstName = store[0].first_name;
  const lastName = store[0].last_name;
  const {email} = store[0];
  const profile = `
    <div class="container">
        <div class="row" style="margin-top:30px">
            <div class="col-md-2 order-md-1">
                <div class"image">
                    <div class"">
                      <img src="URLPhoto ici apres" style="border-top-left-radius: 15px; border-top-right-radius: 15px;"
                        class="img-fluid" alt="Laptop" />
                    </div>
                    
                </div>
            </div>

            <div id="firstDiv" class ="col-md-8 order-md-2 mb-4 ">
                <div class="mx-auto">
                    <h2>${storeName}</h2>
                    <h4>by ${firstName} ${lastName}</h4>
                    <p><i class="bi bi-envelope-fill"></i> ${email}</p>
                </div>
            </div>
        </div>
      <h3>Products catalog : </h3>
      <div class="allStoreProducts" class="row justify-content" id="products">
        
      </div>
    </div>
    `;
  main.innerHTML = profile;
  const products = await getAllStoreProducts(idStore);
  const resultStatus = document.getElementById('products');
  if (products.length === 0) {
    resultStatus.innerHTML += `<p>This store doesn't have any products to sell yet</p>`;
  } else {
    const placeResultats = document.getElementById('products');
    products.forEach((produit) => {
      // const imageUrl = resultat?.url;
      const productId = produit.id_product;
      const productName = produit.name;
      const productPrice = produit.price;
      const { category } = produit;
      const categoryId = produit.id_category;
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
                      </div>
                      <div>
                          <p class="small text-muted"><a href="#" class="text-dark categoryName" name="${categoryId}">${category}</a></p>
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
    }); // fin foreach

    // permet le render vers la page du product cliqué
    const a = document.getElementsByClassName('aProductName');
    for (let j = 0; j < a.length; j += 1) {
      a[j].addEventListener('click', async (e) => {
        e.preventDefault();
        const idproduit = a[j].name;
        // eslint-disable-next-line prefer-template
        Navigate('/product?=', idproduit);
      });
    } // fin for

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
  } // fin else
}; // fin page

async function getAllStoreProducts(id) {
  // Permet d'aller chercher les informations du produit
  let products;

  try {
    const options = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // eslint-disable-next-line prefer-template
    const reponse = await fetch('/api/products/getAllBySeller/' + id, options);
    if (!reponse.ok) {
      throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
    }
    products = await reponse.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('error: ', err);
  }
  return products;
} // fin function getAllStoreProducts(id)

async function getStoreById(id) {
  // Permet d'aller chercher les informations du produit
  let store;

  try {
    const options = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // eslint-disable-next-line prefer-template
    const reponse = await fetch('/api/users/getIdStore/' + id, options);
    if (!reponse.ok) {
      throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
    }
    store = await reponse.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('error: ', err);
  }
  return store;
} // fin function getStoreById(id)

export default StorePage;
