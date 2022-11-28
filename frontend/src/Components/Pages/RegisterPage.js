import { clearPage } from "../../utils/render";
import 'bootstrap/dist/css/bootstrap.min.css';


const formRegister = `   
    <div class="container mt-3">

        <div class="mb-3 mt-3">
            <label for="name">Nom</label>
            <input type="text" class="form-control" id="nom" placeholder="Entrez votre nom" name="firstname">
        </div>

        <div class="mb-3 mt-3">
            <label for="name">Prénom</label>
            <input type="text" class="form-control" id="prenom" placeholder="Entrez votre prénom" name="lastname">
        </div>

        <div class="mb-3 mt-3">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" placeholder="Entrez votre email" name="email">
        </div>

        <div class ="mb-3 mt-3">
        <label for="sex">Sex</label>
        </br>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="homme" value="option1">
                <label class="form-check-label" for="inlineCheckbox1">Homme</label>
            </div>

            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="femme" value="option2">
                <label class="form-check-label" for="inlineCheckbox2">Femme</label>
            </div>

            <div class="form-check form-check-inline">
                <input class="form-check-input" type="checkbox" id="autre" value="option3" >
                <label class="form-check-label" for="inlineCheckbox3">Autre</label>
            </div>

        </div>

        <div class="mb-3 mt-3">
            <label for="password">Mot de passe</label>
            <input type="password" class="form-control" id="mdp" placeholder="Entrez votre mot de passe" name="password">
        </div>

        <div class="mb-3 mt-3">
            <label for="password">Confirmation du mot de passe</label>
            <input type="password" class="form-control" id="mdp2" placeholder="Confirmer votre mot de passe" name="password">
        </div>
        <button type="submit" class="btn btn-primary" id="register" >Submit</button>


    </div> `;

const RegisterPage = () => {
    clearPage();
    const main = document.querySelector('main');
    main.innerHTML = formRegister;

    const btn = document.getElementById('register');

    btn.addEventListener('click', async (e) => {
        e.preventDefault();

        const lastname = document.getElementById('nom').value;
        const firstname = document.getElementById('prenom').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('mdp').value;
        const passwordConfirmed = document.getElementById('mdp2').value;
        
        const newData = {
            lastname : lastname,
            firstname : firstname,
            email : email,
            password : password,
            passwordConfirmed : passwordConfirmed,
            sex:'M'
        }

        try {

            const options = {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
              body: JSON.stringify(newData),
              headers: {
                "Content-Type": "application/json",
              },
            };
      
            const reponse = await fetch("/api/users/register",options);
      
            if (!reponse.ok) {
              throw new Error(
                "fetch error : " + reponse.status + " : " + reponse.statusText
              );
            }
            const user = await reponse.json();
          } catch (err) {
            console.error("error: ", err);
          }

    })



}


   




export default RegisterPage;