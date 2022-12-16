import 'bootstrap/dist/css/bootstrap.min.css';
import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';
import { getAuthenticatedUser } from '../../utils/auths';
import { clearActive, setActiveLink } from '../../utils/activeLink';
import { setUserIcon } from '../../utils/userIcon';
import Navbar from '../Navbar/Navbar';

let showProductBool = true;
let html = `
<div class="text-center">
<button type="button" id="btnUpdate" class="btn btn-dark position-relative">
  Edit your profile <svg width="1em" height="1em" viewBox="0 0 16 16" class="position-absolute top-100 start-50 translate-middle mt-1 bi bi-caret-down-fill" fill="#212529" xmlns="http://www.w3.org/2000/svg"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
</button>
<button type="button" id="btnAdd" class="btn btn-dark position-relative">
 Add product <svg width="1em" height="1em" viewBox="0 0 16 16" class="position-absolute top-100 start-50 translate-middle mt-1 bi bi-caret-down-fill" fill="#212529" xmlns="http://www.w3.org/2000/svg"><path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>
</button>
</div>
<div style="margin-left: 920px">
  <h1>Hello<div id="firstnameDiv"></div></h1>
</div>
</div>
<div class="text-center">
<h3 class="display-1">Products you're selling: </h3>
</div>

<div class="container py-5">
<div class="row justify-content" id="MyProduct"></div>
</div>
    
`;

// Calling the page to render
const SellerPage = async () => {
  clearPage();
  setActiveLink('userPage');
  setUserIcon('userPage');
  Navbar();
  const user = await getAuthenticatedUser();
  const idUser = user.userId;
  const { email } = user;
  console.log(email);
  const products = await getAllBySeller(idUser);
  if (showProductBool) {
    await showProduct(products);
    console.log("lalalalalallalala");
    showProductBool = false;
  }
  if (user === undefined) {
    clearActive();
    clearActive();
    Navigate('/login');
  } else {
    console.log("ceci est l'id", idUser);
    const main = document.querySelector('main');
    main.innerHTML = html;
    const btnAdd = document.getElementById('btnAdd');
    btnAdd.addEventListener('click', async (e) => {
      e.preventDefault();
      clearActive();
      Navigate('/addProduct');
    });
    const btnUpdate = document.getElementById('btnUpdate');
    btnUpdate.addEventListener('click', (e) => {
      e.preventDefault();
      clearActive();
      Navigate('/update');
    });

    console.log('test product undef 2:', products);
    // Affichage des produits
  } // fin else

}; // fin page

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

async function showProduct(product) {

  const user = getAuthenticatedUser();
  const idUser = user.userId;
  console.log("ceci est l'id (show product)", idUser);

  const nbImage = await countAllProductBySeller(idUser);
  console.log('nombre article :', nbImage);
  let items = ``;
  let i = 0;

  console.log('test product undef:', product);

  while (i < nbImage) {
    const imageProduit = importAll(require.context('../../assets/product', true, /\.png$/));
    const id = product[i].id_product;
    const storeName = product[i].store_name;
    const nameProduct = product[i].name;
    const priceProduct = product[i].price;
    const { category } = product[i];
    const categoryId = product[i].id_category;
    items += `
    <div class="col-md-8 col-lg-6 col-xl-4" style="display:inline-block">
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
        </div>
    </div>
  `;
    i += 1;
  }

  html += items;

  const a = document.getElementsByClassName('aProductName');

  const lenght = a.length;


  // permet le render vers la page du produit cliqué
  for (let j = 0; j < lenght; j += 1) {
    a[j].addEventListener('click', async (e) => {
      e.preventDefault();
      const id = a[j].name;
      // eslint-disable-next-line prefer-template
      clearActive();
      Navigate('/test?id_product=', id);
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
  } 
}

async function countAllProductBySeller(id) {
  let number;

  const Data = {
    id,
  };

  try {
    const options = {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify(Data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // eslint-disable-next-line prefer-template
    const reponse = await fetch('/api/products/countAllBySeller', options);
    if (!reponse.ok) {
      throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
    }
    number = await reponse.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('error: ', err);
  }
  console.log('number: ', number);

  return number;
}

function importAll(r) {
  return r.keys().map(r);
}

export default SellerPage;
