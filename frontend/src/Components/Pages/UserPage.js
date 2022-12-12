import { getAuthenticatedUser } from '../../utils/auths';
import { clearPage } from '../../utils/render';
import 'bootstrap';
import Navigate from '../Router/Navigate';

const UserPage = () => {
  // Get logged in user
  const user = getAuthenticatedUser();
  console.log(`User: ${  user}`);
  console.log(`Username: ${  user.first_name}`);

  const html = `
  <div class="text-center">
      <button type="button" id="btnUpdate" class="btn btn-success" style="margin-top: 30px;" role="button" aria-pressed="true">Edit my profile</button>
  </div>
  <div>
    <h1 style="margin-left: 50px;">Hello ${user.first_name}</h1>
  </div>
  `;

  clearPage();
  const main = document.querySelector('main');
  main.innerHTML = html;
  const btn = document.getElementById('btnUpdate');
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    Navigate('update');
  });
};

export default UserPage; 
