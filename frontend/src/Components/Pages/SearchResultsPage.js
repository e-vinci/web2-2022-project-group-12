/* eslint-disable no-console */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { getSearch } from '../../utils/utilsSearch';
import { clearPage } from '../../utils/render';
import {setActiveLink } from '../../utils/activeLink';
import { setUserIcon } from '../../utils/userIcon';
import Navbar from '../Navbar/Navbar';
import { showProducts } from './exportProducts';

// HTML CODE
const html = `
<div class="text-center" id="resultStatus">

</div>

<div class="py-5">
    <div class="row justify-content" id="imgProduct">
      
    </div>
</div>
  `;

const SearchResultsPage = async () => {
  clearPage();
  setActiveLink('extUserPage');
  setUserIcon('extUserPage');
  Navbar();
  const main = document.querySelector('main');
  main.innerHTML = html;
  const results = getSearch();
  const resultStatus = document.getElementById('resultStatus');
  const nombreResultats = results.length;
  if (nombreResultats === 0) {
    resultStatus.innerHTML += `<p>No results found</p>`;
  } else {
    resultStatus.innerHTML += `<p>${nombreResultats} results found</p>`;
    showProducts(results);
  } // fin else
}; // fin page
export default SearchResultsPage;
