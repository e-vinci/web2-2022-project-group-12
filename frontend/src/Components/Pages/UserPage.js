import { clearPage } from '../../utils/render';
import 'bootstrap';
import Navigate from '../Router/Navigate';
import { getAuthenticatedUser } from '../../utils/auths';

const html = `
  <div>
    <button type="button" id="btnSeller" class="btn btn-success" style="margin-top: 30px; margin-left: 1600px" role="button" aria-pressed="true">Become a seller</button>
  </div>
  <div>
    <button type="button" id="btnUpdate" class="btn btn-success" style="margin-top: 30px; margin-right: 1600px" role="button" aria-pressed="true">Update your profile</buttton>
  </div>
  <div>
    <h1 style="margin-left: 50px;">Hello<div id="firstnameDiv"></div></h1>
  </div>
  `;

const UserPage = () => {
  clearPage();
  const user = getAuthenticatedUser();

  // eslint-disable-next-line
  const firstName = user.firstName;

  // verifie si l'user s'est login pour acceder à cette page
  if (user === undefined) {
    Navigate('/login');
  } else {
    clearPage();
    const main = document.querySelector('main');
    main.innerHTML = html;
    const id = document.getElementById('firstnameDiv');
    id.innerHTML = firstName;
    const btn = document.getElementById('btnSeller');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      Navigate('/becomeSeller');
    });
    const btnUpdate = document.getElementById('btnUpdate');
    btnUpdate.addEventListener('click', (e) => {
      e.preventDefault();
      Navigate('/update');
    });
    getProductsBySeller(user.userId);
    console.log("IDDDDD", user.userId);
    console.log('LALALALA', getProductsBySeller(user.userId));
  }
};

async function getProductsBySeller(idSeller) {
  
}

export default UserPage;
