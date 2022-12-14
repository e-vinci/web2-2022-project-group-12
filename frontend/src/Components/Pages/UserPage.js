import { clearPage } from '../../utils/render';
import 'bootstrap';
import Navigate from '../Router/Navigate';
import { getAuthenticatedUser } from '../../utils/auths';
import 'animate.css';

let html = `
    <div class="text-center">
        <button type="button" id="btnSeller"class="btn btn-dark position-relative">
        Become a seller <svg width="1em" height="1em" viewBox="0 0 16 16" class="position-absolute top-100 start-50 translate-middle mt-1 bi bi-caret-down-fill" fill="#212529" xmlns="http://www.w3.org/2000/svg"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
        </button>
        <button type="button" id="btnUpdate" class="btn btn-dark position-relative">
          Edit your profile <svg width="1em" height="1em" viewBox="0 0 16 16" class="position-absolute top-100 start-50 translate-middle mt-1 bi bi-caret-down-fill" fill="#212529" xmlns="http://www.w3.org/2000/svg"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
        </button>
      </div>
      <div style="margin-left: 920px">
        <h1>Hello<div id="firstnameDiv"></div></h1>
      </div>
      <h1>       </h1>
      <div>
        <h2>Products you're selling now :</h2>
      </div>
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
      <div class="card" style="width: 18rem; display:inline-block;">
          <img class="card-img-top" src="..." alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${storeName}</h5>
                <p class="card-text">${nameProduct}</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">${priceProduct}€</li>
              <li class="list-group-item">${category}</li>
            </ul>
            <div class="card-body">
                <a href="#!" class="text-dark fw-bold">Cancel</a>
                <button style="margin-left: 70px;" type="button" name="btnAddtoCart" value="${id}" class="btn btn-dark">Add to cart</button>
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
