/* eslint-disable no-console */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { clearPage } from '../../utils/render';
import { clearActive } from '../../utils/activeLink';
import { setUserIcon } from '../../utils/userIcon';
import Navbar from '../Navbar/Navbar';
import { showProducts } from './exportProducts';

// HTML CODE
const html = `
    <div id="titleCategory" class="d-flex justify-content-center align-items-center" style="margin-bottom:40px">
    </div>
    <div class="row justify-content" id="imgProduct">
      
    </div>
  `;

const CategoryPage = async () => {
  clearPage();
  clearActive();
  setUserIcon('extUserPage');
  Navbar();
  const main = document.querySelector('main');
  main.innerHTML = html;
  const id = window.location.search;
  const url = id.split('=');
  const results = await listbyCategorie(url[1]);
  const category = await getCategorie(url[1]);

  const titleCategory = document.getElementById('titleCategory');
  titleCategory.innerHTML = `
    <h2>Category: ${category.name}</h2>
  `;
  showProducts(results);
};
export default CategoryPage;

async function listbyCategorie(id) {
  let categorie;

  try {
    const options = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // const reponse = await fetch(`${process.env.API_BASE_URL}/api/products/listByCategory/` + id, options);

    // eslint-disable-next-line prefer-template
    const reponse = await fetch(`/api/products/listByCategory/` + id, options);

    if (!reponse.ok) {
      throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
    }
    categorie = await reponse.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('error: ', err);
  }
  return categorie;
}

async function  getCategorie(id) {
  let categorie;

  try {
    const options = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // const reponse = await fetch(`${process.env.API_BASE_URL}/api/products/getCategory/` + id, options);

    // eslint-disable-next-line prefer-template
    const reponse = await fetch(`/api/categories/getCategory/` + id, options);

    if (!reponse.ok) {
      throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
    }
    categorie = await reponse.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('error: ', err);
  }
  return categorie;
}
