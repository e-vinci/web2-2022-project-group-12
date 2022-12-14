import { clearPage } from '../../utils/render';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addItemToCart } from '../../utils/utilsCart';

// Cette page permet l'affichage des données d'un seul produit en cliquant sur un bouton de la homepage

const ProductPage = async () => {
  clearPage();
  const main = document.querySelector('main');

  // permet d'aller chercher un paramètre dans l'url
  const id = window.location.search;
  const url = id.split('=');
  const product = await getProductById(url[1]);
  console.log("produit", product)
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
                <p><a href="#!" class="text-dark">${product.name}</a></p>
                <p class="small text-muted">by ${product.store_name}</p>
              </div>
              <div>
                <div class="d-flex flex-row justify-content-end mt-1 mb-4 text-danger">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                </div>
                <p class="small text-muted">Rated 4.0/5</p>
              </div>
            </div>
          </div>
          <hr class="my-0" />
          <div class="card-body pb-0">
            <div class="d-flex justify-content-between">
              <p class="text-dark">${product.price} €</p>
            </div>
            <p class="small text-muted">${product.description}</p>
          </div>
          <hr class="my-0" />
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center pb-2 mb-1">
              <a href="#!" class="text-dark fw-bold">Cancel</a>
              <button type="button" id="btnAddtoCart" class="btn btn-primary">Add to cart</button>
            </div>
          </div>
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
};

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
    console.log("TEST ", id)
    // eslint-disable-next-line prefer-template
    const reponse = await fetch('/api/products/getIdProduct/'+id, options);
    console.log("TEST ", reponse)
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

export default ProductPage;
