
import { getAuthenticatedUser } from '../../utils/auths';
import { clearPage } from '../../utils/render';

const html =  `<form>   
  <div class="container mt-3">

      <div class="mb-3 mt-3">
          <label for="name">Last name</label>
          <input type="text" class="form-control" id="nom" placeholder="Enter your last name..." name="firstname">
      </div>

      <div class="mb-3 mt-3">
          <label for="name">First name</label>
          <input type="text" class="form-control" id="prenom" placeholder="Enter your first name..." name="lastname">
      </div>

      <div class="mb-3 mt-3">
          <label for="email">E-mail</label>
          <input type="email" class="form-control" id="email" placeholder="Enter your e-mail..." name="email">
      </div>

      <div class ="mb-3 mt-3">
      <label for="sex">Sex</label>
      </br>
          <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="homme" value="option1">
              <label class="form-check-label" for="inlineCheckbox1">M</label>
          </div>

          <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="femme" value="option2">
              <label class="form-check-label" for="inlineCheckbox2">F</label>
          </div>

          <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="autre" value="option3" >
              <label class="form-check-label" for="inlineCheckbox3">Don't specify</label>
          </div>

      </div>

      <div class="mb-3 mt-3">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="mdp" placeholder="Enter your password here..." name="password">
      </div>

      <div class="mb-3 mt-3">
          <label for="password">Confirm your password</label>
          <input type="password" class="form-control" id="mdp2" placeholder="Repeat your password here..." name="password">
      </div>
      <button type="submit" class="btn btn-primary" id="register" >Sign up</button>


  </div> 
</form>`

const UpdateUser = () => {
  const user = getAuthenticatedUser();
  const name = user.lastname;
  const fname = user.firstname;
  const email = user.email;
  const sex = email.sex

  
  clearPage();
  const main = document.querySelector('main');
  main.innerHTML = html;
};

export default UpdateUser;
