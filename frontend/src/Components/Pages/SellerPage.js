import 'bootstrap/dist/css/bootstrap.min.css';
import Navigate from '../Router/Navigate';
import { clearActive } from '../../utils/activeLink';
import SellerLibrary from '../../Domain/SellerLibrary';
import ProductLibrary from '../../Domain/ProductLibrary';

// Calling the page to render
// recoit en parametre l'user depuis la UserPage
async function SellerPage(user) {
  if (user === undefined) {
    // renvoye vers login si pas connecté
    clearActive();
    Navigate('/login');
  }else {
    // renderise la page seller
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
    const btnUpdate = document.getElementById('btnUpdate');
    btnUpdate.addEventListener('click', (e) => {
      e.preventDefault();
      clearActive();
      Navigate('/update');
    });

    // recupere les produits du seller
    const products = await SellerLibrary.prototype.getAllBySeller(user.userId);
    // affiche les produits du seller
    ProductLibrary.prototype.showProducts(products);
  } // fin else

}; // fin page

export default SellerPage;
