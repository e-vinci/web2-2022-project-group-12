import { clearPage } from '../../utils/render';
import 'bootstrap';
import Navigate from '../Router/Navigate';
import { getAuthenticatedUser } from '../../utils/auths';

const html = `
  <div class="text-center">
      <button type="button" id="btnUpdate" class="btn btn-success" style="margin-top: 30px;" role="button" aria-pressed="true">Edit my profile</button>
  </div>
  <div>
    <h1 style="margin-left: 50px;">Hello</h1>
  </div>
  `;

const UserPage = () => {
  clearPage();
  // verifie si l'user s'est login pour acceder à cette page
  const user = getAuthenticatedUser();
  if (user === undefined) {
    Navigate('/login');
  } else {
    clearPage();
    const main = document.querySelector('main');
    main.innerHTML = html;
    const btn = document.getElementById('btnUpdate');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      Navigate('update');
    });
  }
};

export default UserPage;
