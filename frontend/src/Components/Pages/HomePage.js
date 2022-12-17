/* eslint-disable no-console */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import Navigate from '../Router/Navigate';
import { clearPage } from '../../utils/render';
import { setActiveLink } from '../../utils/activeLink';
import { setUserIcon } from '../../utils/userIcon';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { showProducts } from './exportProducts';


// HTML CODE
const html = `
    <div class="text-center">
        <h1 class="display-3"> Vinci Store </h1>
    </div>

    <!-- HTML CAROUSSEL -->
    <div class="carousselContainer">
        <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
            <div class="carousel-indicators" id="carousel-buttons">

            </div>
            <div class="carousel-inner" id="carousel-items">

            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>

    <div class="text-center">
          <h3 class="display-6">Last collection ! </h3>
      </div>

      <!-- HTML PRODUCTS -->
      <div class=" py-5">
          <div class="row justify-content" id="imgProduct">
          
          </div>
          
      </div>

    <!-- HTML CATEGORIES -->
    <div class="pt-5">
    <h1>Categories</h1>
            <div class="row px-xl-5 pb-3" id="categories">
            
            </div>
      </div>
  `;



// HOME PAGE 
const HomePage = async () => {
  clearPage();
  setActiveLink('homePage');
  setUserIcon('extUserPage');
  Navbar();
 
  const main = document.querySelector('main');
  
  main.innerHTML = html;
  // eslint-disable-next-line no-useless-escape
  const imageCaroussel = importAll(require.context('../../assets/caroussel', true, /\.png$/));

  // Construction Caroussel 

  const carrouselListItem = document.getElementById('carousel-items');
  let i = 0;
  let items = ``;
  while (i < 2) {
    if (i === 0) {
      items += `<div class="carousel-item active" data-bs-interval="10000">
    <img src="${imageCaroussel[i]}" id="item-${i}" class="d-block w-100" alt="img">
   </div>`;
    } else {
      items += `<div class="carousel-item" data-bs-interval="10000">
    <img src="${imageCaroussel[i]}" class="d-block w-100" alt="img">
   </div>`;
    }

    i += 1;
  }
  carrouselListItem.innerHTML = items;

  i = 0;
  items = ``;
  const carouselButtons = document.getElementById('carousel-buttons');
  while (i < 2) {
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

  // Fetch pour aller chercher tous les produits dans la db
  try {
    const options = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // const reponse = await fetch(`${process.env.API_BASE_URL}/api/products/selectLastProduct`, options);
    const reponse = await fetch(`/api/products/selectLastProduct`, options);

    if (!reponse.ok) {
      throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
    }

    const product = await reponse.json();
    await showProducts(product);

    
  } catch (err) {
    console.error('error: ', err);
  }


  try {
    const options = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // const reponse = await fetch('${process.env.API_BASE_URL}/api/categories/getAllCategories', options);
    const reponse = await fetch('/api/categories/getAllCategories', options);

    if (!reponse.ok) {
      throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
    }

    const category = await reponse.json();
    await showCategories(category);

    }
   catch (err) {
    console.error('error: ', err);
  }

  Footer();
};



async function showCategories(categories){
  
  const category = document.getElementById('categories')
  let items =``;
  let i = 0;

  while (i < categories.length){
    const categoryName = categories[i].name;
    const categoryId = categories[i].id_category;

    items+=`
      <div class="col-lg-4 col-md-6 pb-1">
          <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                <a href = "#" class="text-dark categoryName textProduct" name="${categoryId}"><h5 class="font-weight-semi-bold m-0" >${categoryName}</h5></a>
          </div>
      </div>
    `
    i += 1;
  }
  
  category.innerHTML = items;

   
  const cat = document.getElementsByClassName('categoryName');
  for (let j = 0; j < cat.length; j += 1) {
    cat[j].addEventListener('click', async (e) => {
      console.log(cat[j].name)
      e.preventDefault();
      const idcat = cat[j].name;
      // eslint-disable-next-line prefer-template
      Navigate('/category?=', idcat);
    });}
  
 

}


function importAll(r) {
  return r.keys().map(r);
}


export default HomePage;
