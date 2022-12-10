import { clearPage } from '../../utils/render';
import 'bootstrap/dist/css/bootstrap.min.css';
import { shoppingCart } from '../../utils/utilsCart';
import Navigate from '../Router/Navigate';

// Fromulaire Bootstrap
const formRegister = `
  <form>   
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
  </form>`;

const RegisterPage = () => {
  clearPage();
  const main = document.querySelector('main');
  main.innerHTML = formRegister;

  const btn = document.getElementById('register');

  // Ajout de l'utilisateur aprés avoir appuyé sur le bouton submit
  btn.addEventListener('click', async (e) => {
    e.preventDefault();

    // Récupération de toute les données avec les id
    const lastname = document.getElementById('nom').value;
    const firstname = document.getElementById('prenom').value;
    const email = document.getElementById('email').value;
    const homme = document.getElementById('homme').checked;
    const femme = document.getElementById('femme').checked;
    const autre = document.getElementById('autre').checked;
    const password = document.getElementById('mdp').value;
    const passwordConfirmed = document.getElementById('mdp2').value;
    let sex;

    // vérification des checkbox
   
    if(homme === true){
      sex = 'M';
    }
    if(femme === true){
      sex = 'F';
    }
    if(autre === true){
      sex = 'A';
    }

    if(lastname.value === undefined || firstname.value === undefined || email.value === undefined || password.value === undefined || passwordConfirmed.value === undefined){
      console.error("Please, complete all the forms");
    }

    if(password !== passwordConfirmed){
      console.error("Passwords don't match");
    }



    // Création d'un nouvel objet json
    const newData = {
      lastname,
      firstname,
      email,
      password,
      passwordConfirmed,
      sex,
    };

    try {
      const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(newData),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const reponse = await fetch('/api/users/register', options);

      if (!reponse.ok) {
        throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
      }
      shoppingCart(email);
      Navigate("login");
      /* const user = await reponse.json(); */
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('error: ', err);
    }
  });
};
export default RegisterPage;
