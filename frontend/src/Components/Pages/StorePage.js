/* eslint-disable no-console */
import 'bootstrap/dist/css/bootstrap.min.css';
import { clearPage } from '../../utils/render';

const StorePage = async () => {
  clearPage();
  const main = document.querySelector('main');

  // permet d'aller chercher un paramètre dans l'url
  const id = window.location.search;
  const url = id.split('=');
  const store = await getStoreById(url[1]);

  const profile = `
    <div class="container">
        <div class="row" style="margin-top:30px">
            <div class="col-md-2 order-md-1">
                <div class"img-circle">
                    <div class"img-responsive">
                        image circulaire du store
                    </div>
                    
                </div>
            </div>

            <div id="firstDiv" class ="col-md-8 order-md-2 mb-4 ">
                <div class="mx-auto">
                    <h2>${store.store_name} test</h2>
                    <h4>by ${store.frist_name} ${store.last_name} test</h4>
                    <p><i class="bi bi-envelope-fill"></i> ${store.email}</p>
                </div>
            </div>
        </div>
    </div>
    `;
  main.innerHTML = profile;
};

async function getStoreById(id) {
  // Permet d'aller chercher les informations du produit
  let store;

  try {
    const options = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // eslint-disable-next-line prefer-template
    const reponse = await fetch('/api/users/getIdStore/' + id, options);
    if (!reponse.ok) {
      throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
    }

    store = await reponse.json();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('error: ', err);
  }
  return store;
}

export default StorePage;
