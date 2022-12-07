/* eslint-disable no-console */
import 'bootstrap/dist/css/bootstrap.min.css';
import img from '../../img/produit1.png';
import 'animate.css';
import image from '../../assets/image1.png';
import Navbar from '../Navbar/Navbar';
// import img2 from '../../img/produit2.png';

// HTML CODE
const html = `
<div class="text-center">
  <h1 class="display-1"> Vinci Store </h1>
</div>


<div class = "carousselContainer ">
  <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
  <div class="carousel-indicators" id="carousel-buttons">

        </div>
        <div class="carousel-inner" id = "carousel-items">

        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
        </div>
      </div>
    </div>
  </div>
</div>
</div>

<div class="text-center">
  <h1 class="display-1"> Products </h1>
</div>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

<div class="container py-5">
    <div class="row justify-content" id="imgProduct">
      
    </div>
</div>
  `;

const HomePage = async () => {
  Navbar();
  const main = document.querySelector('main');
  countAllProduct();
  main.innerHTML = html;

  const carrouselListItem = document.getElementById('carousel-items');
  let i = 0;
  let items = ``;
  while (i < 10) {
    if (i === 0) {
      items += `<div class="carousel-item active" data-bs-interval="10000">
    <img src="${img}" id="item-${i}" class="d-block w-100" alt="img">
   </div>`;
    } else {
      items += `<div class="carousel-item" data-bs-interval="10000">
    <img src="${img}" class="d-block w-100" alt="img">
   </div>`;
    }

    i += 1;
  }
  carrouselListItem.innerHTML = items;

  i = 0;
  items = ``;
  const carouselButtons = document.getElementById('carousel-buttons');
  while (i < 10) {
    if (i === 0) {
      items += `<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="${i}" class="active" aria-current="true" aria-label="Slide ${i +
        1}"></button>
      `;
    } else {
      items += `<button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="${i}" aria-label="Slide ${i +
        1}"></button>`;
    }

    i += 1;
  }
  carouselButtons.innerHTML = items;

  try {
    const options = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const reponse = await fetch('/api/products/getAll', options);
    

    if (!reponse.ok) {
      throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
    }
    const product = await reponse.json(); 
    showProduct(product);
  }
  
  catch (err) {
      
    console.error('error: ', err);
  }

};

async function showProduct(product){
  
  const cardProduct = document.getElementById('imgProduct');
  const nbImage = await countAllProduct();
  let items = ``;
  let i = 0;
 
  
  
  while (i < nbImage){
   
    const nameProduct = product[i].productname;
    const priceProduct = product[i].prix;
    items += `
    <div class="col-md-8 col-lg-6 col-xl-4" >
    <div class="card" style="border-radius: 15px;" >
    <div class="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
            data-mdb-ripple-color="light" >
    <img src="${image}"
    style="border-top-left-radius: 15px; border-top-right-radius: 15px;" class="img-fluid"
    alt="Laptop"/>
  <a href="#!">
    <div class="mask"></div>
  </a>
  </div>

  <div class="card-body pb-0">
            <div class="d-flex justify-content-between">
              <div>
                <p><a href="#!" class="text-dark">${nameProduct}</a></p>
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
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center pb-2 mb-1">
              <a href="#!" class="text-dark fw-bold">Cancel</a>
              <button type="button" class="btn btn-primary" id="btn">Buy now</button>
            </div>
          </div>
          </div>
          </div>
  `;
  i += 1;
  }
  cardProduct.innerHTML = items;
};



async function countAllProduct(){
  let number;
  try {
    const options = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const reponse = await fetch('/api/products/countAll', options);
    
    if (!reponse.ok) {
      throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
    }
    number = await reponse.json(); 
    

  }
  catch (err) {
      
    console.error('error: ', err);
  }
  return number;
}


export default HomePage;

