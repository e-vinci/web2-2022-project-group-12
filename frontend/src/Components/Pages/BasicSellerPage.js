import 'bootstrap/dist/css/bootstrap.min.css';
import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';
import { getAuthenticatedUser } from '../../utils/auths';

const html = `
    <div class="text-center">
      <button type="submit" class="btn btn-primary" id="addProduct" >Add New Product</button>
    </div>
      

    <div class="text-center">
      <h3 class="display-1"> My products </h3>
    </div>

    <div class="container py-5">
      <div class="row justify-content" id="MyProducts">
      
    </div>
    
  
`;

// Calling the page to render
const BasicSellerPage = async () => {
  clearPage();
  const user = await getAuthenticatedUser();
  const { email } = user;
  console.log(email);
  if (user === undefined) {
    Navigate('/login');
  } else {
    const main = document.querySelector('main');
    main.innerHTML = html;
    const idUser = user.userId;
    console.log("ceci est l'id", idUser);

    const btn = document.getElementById('addProduct');
    btn.addEventListener('click', async (e) => {
      e.preventDefault();

      Navigate('/addProduct');
    });

    const product = await getAllBySeller(idUser);
    console.log('test product undef 2:', product);
    await showProduct(product);
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
  const cardProduct = document.getElementById('MyProducts');

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
      Navigate('/test?id_product=', id);
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

export default BasicSellerPage;
