import { clearPage } from '../../utils/render';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addItemToCart } from '../../utils/utilsCart';
import Navigate from '../Router/Navigate';
import { getAuthenticatedUser } from '../../utils/auths';

// Cette page permet l'affichage des données d'un seul produit en cliquant sur un bouton de la homepage

const ProductPage = async () => {
  clearPage();
  const main = document.querySelector('main');
  const user = await getAuthenticatedUser();
  // permet d'aller chercher un paramètre dans l'url
  const id = window.location.search;
  const url = id.split('=');
  const product = await getProductById(url[1]);
  const productId = product.id_product;
  const productName = product.name;
  const productPrice = product.price;
  const productDescription = product.description;
  const { category } = product;
  const categoryId = product.id_category;
  console.log('produit', product);
  // html de la page
  const html = `
  <div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-4">
            <div class="card" style="border-radius: 50px;">
                <div class="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
                    data-mdb-ripple-color="light">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/12.webp"
                        style="border-top-left-radius: 50%; border-top-right-radius: 50%;" class="img-fluid"
                        alt="Laptop" />
                    <a href="#!">
                        <div class="mask"></div>
                    </a>
                </div>
                <div class="card-body pb-0">
                    <div class="d-flex justify-content-between">
                        <div>
                            <p><a href="#!" class="text-dark">${productName}</a></p>
                        </div>
                        <div>
                          <p class="small text-muted"><a href="#" class="text-dark categoryName" name="${categoryId}">${category}</a></p>
                        </div>
                    </div>
                </div>
                <hr class="my-0" />
                <div class="card-body pb-0">
                    <div class="d-flex justify-content-between">
                        <p>${productPrice}€</p>
                    </div>
                    <p class="small text-muted">VISA Platinum</p>
                </div>
                <hr class="my-0" />
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center pb-2 mb-1">
                        <a href="#!" class="text-dark fw-bold">Cancel</a>
                        <button type="button" name="btnAddtoCart" class="btn btn-primary">Add to cart</button>
                    </div>
                </div>
            </div>
          </div>
          <hr class="my-0" />
          <div class="card-body pb-0">
            <div class="d-flex justify-content-between">
              <p class="text-dark">${productPrice} €</p>
            </div>
            <p class="small text-muted">${productDescription}</p>
          </div>
          <hr class="my-0" />
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center pb-2 mb-1">
              <a href="#!" class="text-dark fw-bold">Cancel</a>
              <button type="button" id="btnAddtoCart" class="btn btn-primary">Add to cart</button>
            </div>
          </div>
          <div id="loginStatus">
          
          </div>
          <div id="Reviews">

          </div>

        </div>
    </div>
  </div>
          `;
  main.innerHTML = html;

  // Permet d'ajouter le produit dans le panier
  const btn = document.getElementById('btnAddtoCart');

  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    addItemToCart(product.id, product.name, product.price, 1);
  });

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

  const loginStatus = document.getElementById('loginStatus');
  const reviewshtml = document.getElementById('Reviews');

  const reviewlist = getReviews(productId);

  if (user === undefined && reviewlist.length > 0) {
    loginStatus.innerHTML += `<p>You must be logged in in order to review this product</p>`;
    reviewlist.forEach((lareview) => {
      const userReview = lareview.id_user;
      const messageReview = lareview.message;
      reviewshtml.innerHTML += `${userReview} ${messageReview}`;
    });
  } else if(user === undefined && reviewlist.length === 0){
    loginStatus.innerHTML += `<p>You must be logged in in order to review this product</p>`;
    reviewshtml.innerHTML += `<p>No reviews on this product yet</p>`;
  } else if(!(user === undefined && reviewlist.length === 0)){
    loginStatus.innerHTML += `
    <hr class="my-0" />
    <div class="container-fluid">
      <form action="">
          <label for="description">Give an honest review</label>
          <div id="errorMessage">

          </div>
          <div class="input-group">
              <textarea type="text" class="form-control" placeholder="Enter your review here..." id="reviewMessage" rows="3"></textarea>
              <div class="input-group-append">
                  <button class="input-group-text btn btn-dark text-white" id="reviewBtn">
                    <i class="bi bi-arrow-return-left"></i>
                  </button>
              </div>
          </div>
      </form>
    </div>
    `;
    reviewshtml.innerHTML += `<p>No reviews on this product yet</p>`;
  }else{
    loginStatus.innerHTML += `
    <hr class="my-0" />
    <div class="container-fluid">
      <form action="">
          <label for="description">Give an honest review</label>
          <div id="errorMessage">

          </div>
          <div class="input-group">
              <textarea type="text" class="form-control" placeholder="Enter your review here..." id="reviewMessage" rows="3"></textarea>
              <div class="input-group-append">
                  <button class="input-group-text btn btn-dark text-white" id="reviewBtn">
                    <i class="bi bi-arrow-return-left"></i>
                  </button>
              </div>
          </div>
      </form>
    </div>
    `;
    reviewlist.forEach((lareview) => {
      const userReview = lareview.id_user;
      const messageReview = lareview.message;
      reviewshtml.innerHTML += `${userReview} ${messageReview}`;
    });


    // Ajout d'une review au produit
    btn.addEventListener('click', async (e) => {
      e.preventDefault();

      // Récupération de toute les données avec les id
      const reviewMessage = document.getElementById('reviewMessage').value;
      const errorMessage = document.getElementById('errorMessage');

      if (reviewMessage === undefined || reviewMessage.length < 1) {
        errorMessage.innerHTML += `<p class="alert"><i class="bi bi-exclamation-circle-fill"></i> You can not send an empty message!</p>`;
      }

      // Création d'un nouvel objet json
      const NewReview = {
        idUser: user.id_user,
        message: reviewMessage,
        idProduct: product.id_product,
      };

      postReview(NewReview);
    }); // fin eventListener
  }// fin else
}; // fin page

async function getProductById(id) {
  // Permet d'aller chercher les informations du produit
  let product;

  try {
    const options = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log('TEST ', id);
    // eslint-disable-next-line prefer-template
    const reponse = await fetch('/api/products/getIdProduct/' + id, options);
    product = await reponse.json();
    if (!reponse.ok) {
      throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('error: ', err.message);
  }
  return product;
}

async function postReview(data) {
  let idReview;
  try {
    const options = {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const reponse = await fetch('/api/products/addReview', options);

    if (!reponse.ok) {
      throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
    }
    idReview = await reponse.json();
    console.log(idReview);
    /*  
console.log("id ::::::", idProduct);
const path =`'../../assets/product/image${idProduct}.img'`;
console.log("le path pour nouveau file::",path);
fs.appendFile(path,image); 
*/
    /* const user = await reponse.json(); */
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('error: ', err);
  }
  return idReview;
}

async function getReviews(data) {
  let result;
  try {
    const options = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // eslint-disable-next-line prefer-template
    const reponse = await fetch('/api/products/getAllReviews/' + data, options);
    if (!reponse.ok) {
      throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
    }
    result = await reponse.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('error: ', err);
  }
  return result;
}

export default ProductPage;
