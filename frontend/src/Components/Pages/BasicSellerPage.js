import 'bootstrap/dist/css/bootstrap.min.css';
import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';
import { getAuthenticatedUser } from '../../utils/auths';


const html = `
  <h2>Add a product</h2>
      <button type="submit" class="btn btn-primary" id="addProduct" >Add New Product</button>


    <div class="container py-5">
      <div class="row justify-content" id="MyProducts">
      
      </div>
    </div>
  
`;

// Calling the page to render
const BasicSalerPage = async () => {
  clearPage();
  const main = document.querySelector('main');
  main.innerHTML = html;

  const user = getAuthenticatedUser()
  const idUser= user.userId
  console.log("ceci est l'id", idUser)

  const btn = document.getElementById('addProduct');
  btn.addEventListener('click', async (e) => {
    e.preventDefault();

    Navigate('/addProduct')
    
  });


    const product = await getAllProductBySeller(idUser)
    await showProduct(product);

    
} 
  
 

async function getAllProductBySeller(id) {
  

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
    const reponse = await fetch('/api/products/getAllBySeller', options);
    console.log("response:",reponse)
    if (!reponse.ok) {
      throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
    }
    const products = await reponse.json();
    console.log("liste de produit", products)
    return products;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('error: ', err);
  }
  return null;
}



async function showProduct(product) {
  const cardProduct = document.getElementById('MyProducts');


  const user = getAuthenticatedUser()
  const idUser= user.userId
  console.log("ceci est l'id (show product)", idUser)

  const nbImage = await countAllProductBySeller(idUser);
  console.log("nombre article :", nbImage)
  let items = ``;
  let i = 0;

  while (i < nbImage) {
    const id = product[i].id_product;
    const nameProduct = product[i].name;
    const priceProduct = product[i].price;
    items += `
    <div class="col-md-8 col-lg-6 col-xl-4" >
    <div class="card" style="border-radius: 15px;" >
    <div class="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
            data-mdb-ripple-color="light" >
    <img src="${1}"
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
                <p class="small text-muted">Laptops</p>
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
              <p><a href="#!" class="text-dark">${priceProduct}</a></p>
              
            </div>
            <p class="small text-muted">VISA Platinum</p>
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

  for(let j = 0; j<lenght;j+=1){

    a[j].addEventListener('click' , async (e) => {
      e.preventDefault();
      const id = a[j].name;
      // eslint-disable-next-line prefer-template
      Navigate("/test?id_product=",id);
  })}; 
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
console.log("number: ",number)

  return number;
}


export default BasicSalerPage;
 
