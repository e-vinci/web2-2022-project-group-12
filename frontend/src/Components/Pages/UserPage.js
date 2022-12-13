import { clearPage } from '../../utils/render';
import 'bootstrap';
import Navigate from '../Router/Navigate';
import { getAuthenticatedUser } from '../../utils/auths';

let html = `
  <div>
    <button type="button" id="btnSeller" class="btn btn-success" style="margin-top: 30px; margin-left: 1600px" role="button" aria-pressed="true">Become a seller</button>
  </div>
  <div>
    <button type="button" id="btnUpdate" class="btn btn-success" style="margin-top: 30px; margin-right: 1600px" role="button" aria-pressed="true">Update your profile</buttton>
  </div>
  <div>
    <h1 style="margin-left: 50px;">Hello<div id="firstnameDiv"></div></h1>
  </div>
  `;

const UserPage = async () => {
  clearPage();
  const user = await getAuthenticatedUser();
  const idUser = window.location.search;
  const url = idUser.split('=');
  const products = await getAllBySeller(url[1]);
  
  // Affichage des produits
  let i = 0;
  while (i < products.length) {
    const id = products[i].id_product;
    const storeName = products[i].store_name;
    const nameProduct = products[i].name;
    const priceProduct = products[i].price;
    const {category} = products[i];
    html += `
    <div class="col-md-8 col-lg-6 col-xl-4">
        <div class="card" style="border-radius: 15px;">
            <div class="bg-image hover-overlay ripple ripple-surface ripple-surface-light" data-mdb-ripple-color="light">
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
  // eslint-disable-next-line
  const firstName = user.firstName;

  // verifie si l'user s'est login pour acceder à cette page
  if (user === undefined) {
    Navigate('/login');
  } else {
    clearPage();
    const main = document.querySelector('main');
    main.innerHTML = html;
    const id = document.getElementById('firstnameDiv');
    id.innerHTML = firstName;
    const btn = document.getElementById('btnSeller');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      Navigate('/becomeSeller');
    });
    const btnUpdate = document.getElementById('btnUpdate');
    btnUpdate.addEventListener('click', (e) => {
      e.preventDefault();
      Navigate('/update');
    });
    
  }
};

async function getAllBySeller(idSeller) {
  let products;
  try {
    const options = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
    };
    // eslint-disable-next-line prefer-template
    const reponse = await fetch('/api/products/getAllBySeller/' + idSeller, options);
    if (!reponse.ok) {
      throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
    }
    products = await reponse.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('error: ', err);
  }
  return products;
}

export default UserPage;
