import 'bootstrap/dist/css/bootstrap.min.css';
import Navigate from '../Router/Navigate';
import { clearActive } from '../../utils/activeLink';
import { showProducts } from './exportProducts';

// Calling the page to render
async function SellerPage(user) {
  if (user === undefined) {
    clearActive();
    Navigate('/login');
  }else {
    const sellerHtml = document.getElementById('sellerThings');
    sellerHtml.innerHTML +=`
      <div class="d-flex justify-content-start">
          <h3>Products you're selling: </h3>
        </div>

        <div class="py-5">
          <div class="row d-flex justify-content" id="imgProduct">

          </div>
      </div>
    `;

    const boutons = document.getElementById('boutons');
    boutons.innerHTML +=`
      <button type="button" id="btnAdd" class="btn btn-success rounded-pill position-relative"><i class="bi bi-plus-lg"></i> Add product</button>
    `;

    const btnAdd = document.getElementById('btnAdd');
    btnAdd.addEventListener('click', async (e) => {
      e.preventDefault();
      clearActive();
      Navigate('/addProduct');
    });
    const products = await getAllBySeller(user.userId);
    showProducts(products);
  } // fin else

} // fin page

async function getAllBySeller(idSeller) {
  let products;
  try {
    const options = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // const reponse = await fetch(`${process.env.API_BASE_URL}/api/products/getAllBySeller/` + idSeller, options);
    // eslint-disable-next-line prefer-template
    const reponse = await fetch(`/api/products/getAllBySeller/` + idSeller, options);

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

export default SellerPage;
