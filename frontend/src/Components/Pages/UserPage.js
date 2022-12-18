import { clearPage } from '../../utils/render';
import 'bootstrap';
import Navigate from '../Router/Navigate';
import { getAuthenticatedUser } from '../../utils/auths';
import 'animate.css';
import { clearActive, setActiveLink } from '../../utils/activeLink';
import { setUserIcon } from '../../utils/userIcon';
import Navbar from '../Navbar/Navbar';
import SellerPage from './SellerPage';
import UserLibrary from '../../Domain/UserLibrary';

const UserPage = async () => {
  clearPage(); 
  setActiveLink('userPage'); 
  setUserIcon('userPage');
  
  // reload la navbar apres avoir set l'actif
  Navbar(); 

  // recupere le user connecté
  const user = await getAuthenticatedUser(); 

  // recupere l'id seller si l'user est seller
  const seller = await UserLibrary.prototype.isSeller(user.userId); 

  // verifications
  if (user === undefined) {
    // si l'user est undefined on renvoye vers le login 
    clearActive();
    Navigate('/login');
  } else {
    // sinon on renderise la page user
    // ici se trouvent les elements commun aux 2 pages seller et user

    // eslint-disable-next-line
    const main = document.querySelector('main');
    // eslint-disable-next-line no-unused-vars
    main.innerHTML += `
      <div class="d-flex justify-content-between">
        <div class="d-flex justify-content-start col">
          <div>
            <h1 class="display-6" id="nomUser">
              <i class="bi bi-person-fill"></i> 
            </h1>
          </div>
        </div>
        <div id="boutons" class="d-flex flex-row-reverse col-4 p-3 justify-content-evenly">
            <button type="button" id="btnUpdate" class="btn btn-outline-secondary rounded-pill position-relative"><i class="bi bi-gear-fill"></i> Edit your profile</button>
        </div>
        
      </div>
        <div id="sellerThings">
        
        </div>
      </div>

    `;

    const id = document.getElementById('nomUser');
    id.innerHTML += `${user.firstName} ${user.lastName}`;

    if (seller !== null) {

      // si l'utilisateur connecté est un seller allors renderiser la page seller
      SellerPage(user);

    }else {

      // sinon afficher le bouton devenir un seller
      const boutons = document.getElementById('boutons');
      boutons.innerHTML += `
        <button type="button" id="btnSeller"class="btn btn-success rounded-pill position-relative"><i class="bi bi-shop"></i> Start selling!</button>
      `;
      const btn = document.getElementById('btnSeller');
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        clearActive();
        Navigate('/becomeSeller');
      });
      
    } // fin else

    // bouton settings commun aux 2 pages
    const btn = document.getElementById('btnUpdate');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      clearActive();
      Navigate('/settings');
    });

  }
};


export default UserPage;
