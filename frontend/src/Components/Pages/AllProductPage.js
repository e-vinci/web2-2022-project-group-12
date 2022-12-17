import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { addItemToCart } from '../../utils/utilsCart';
import Navbar from '../Navbar/Navbar';
import { clearPage } from '../../utils/render';
import { setActiveLink } from '../../utils/activeLink';
import { setUserIcon } from '../../utils/userIcon';
import { showProducts } from './exportProducts';

const AllProductPage = async () => {
  clearPage();
  setActiveLink('shopPage');
  setUserIcon('extUserPage');
  Navbar();
  
  const html = `
        <div class="row px-xl-5">
          <div class="py-5">
              <div class="row justify-content" id="imgProduct">
  
              </div>
          </div>
      </div>
    `;
  const main = document.querySelector('main');
  main.innerHTML = html;

  try {
    const options = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // const reponse = await fetch(`${process.env.API_BASE_URL}/api/products/getAll`, options);
    const reponse = await fetch(`/api/products/getAll`, options);

    console.log("coucou2");

    if (!reponse.ok) {
      throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
    }

    const product = await reponse.json();
    await showProducts(product);

    const btn = document.getElementsByName('btnAddtoCart');

    for (let y = 0; y < btn.length; y += 1) {
      btn[y].addEventListener('click', async (e) => {
        e.preventDefault();
        console.log(btn[y].value);
        addItemToCart(btn[y].value, 5, 1);
        Navbar();
      });
    }
  } catch (err) {
    console.error('error: ', err);
  }
};


export default AllProductPage;
