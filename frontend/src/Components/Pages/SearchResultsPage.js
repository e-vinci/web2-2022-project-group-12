/* eslint-disable no-console */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { getSearch } from '../../utils/utilsSearch';
import { clearPage } from '../../utils/render';

// HTML CODE
const html = `
<div class="text-center" id="resultStatus">

</div>

<div class="container py-5">
    <div class="row justify-content" id="imgProduct">
      
    </div>
</div>
  `;

const SearchResultsPage = async () => {
  clearPage();
  const main = document.querySelector('main');

  main.innerHTML = html;

  const results= getSearch();

  const resultStatus = document.getElementById('resultStatus');
  console.log('resultat avant .lenght', results);
  const nombreResultats = results.length;
  if (nombreResultats === 0) {
    resultStatus.innerHTML += `<p>Pas resultats trouvés</p>`;
  } else {
    resultStatus.innerHTML += `<p>${nombreResultats} resultats trouvés</p>`;
    const placeResultats = document.getElementById('imgProduct');
    results.forEach(resultat => {
      // const imageUrl = resultat?.url;
      const productId = resultat.id_product;
      const productName = resultat.name;
      const productPrice = resultat.price;
      const storeName = resultat.seller;
      const {category} = resultat;

      placeResultats.innerHTML+=`
        <div class="col-md-8 col-lg-6 col-xl-4">
          <div class="card" style="border-radius: 15px;">
              <div class="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
                  data-mdb-ripple-color="light">
                  <img src="INSERER imageUrl ici apres" style="border-top-left-radius: 15px; border-top-right-radius: 15px;"
                      class="img-fluid" alt="Laptop" />
                  <a href="#!">
                      <div class="mask"></div>
                  </a>
              </div>

              <div class="card-body pb-0">
                  <div class="d-flex justify-content-between">
                      <div>
                          <p><a href="#!" class="text-dark aProductName" name="${productId}">${productName}</a></p>
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
                      <p class="text-dark">${productPrice}€</p>
                  </div>
              </div>
              <hr class="my-0" />
              <div class="card-body">
                  <div class="d-flex justify-content-between align-items-center pb-2 mb-1">
                      <a href="#!" class="text-dark fw-bold">Cancel</a>
                      <button type="button" name="btnAddtoCart" value="${productId}" class="btn btn-dark"><i class="bi bi-cart-plus"></i></button>
                  </div>
              </div>
          </div>
      </div>
      `;
    });
  }
};
export default SearchResultsPage;
