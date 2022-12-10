/* eslint-disable no-console */
import 'bootstrap/dist/css/bootstrap.min.css';
import { clearPage } from '../../utils/render';


const html = `
    <div class="container mt-3">
        <div class="col-xs-3">
            
        </div>
        <div class="col-xs-3">
            
        </div>
    </div>

    `;


const StorePage = async () => {
    clearPage();
    const main = document.querySelector('main');
    main.innerHTML = html;
}

export default StorePage;