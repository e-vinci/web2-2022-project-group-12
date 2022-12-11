/* eslint-disable no-console */
import 'bootstrap/dist/css/bootstrap.min.css';
import { clearPage } from '../../utils/render';


const store = `
    <div>
        <div class"img-circle">
            <div class"img-responsive">
                image circulaire du store
            </div>
            
        </div>
        <div>
            <h2>Store name</h2>
            <h4>by Nom Prenom du vendeur</h4>
            <p>vendeur@gmail.com</p>
        </div>
    </div>
    `;


const StorePage = async () => {
    clearPage();
    const main = document.querySelector('main');
    main.innerHTML = store;
}

export default StorePage;