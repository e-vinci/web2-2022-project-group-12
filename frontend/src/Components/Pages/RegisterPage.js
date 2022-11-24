import { clearPage } from "../../utils/render";
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterPage = () => {
    clearPage();
    const main = document.querySelector('main');
    


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
        <button type="submit" class="btn btn-primary">Submit</button>


    </div> `;

    main.innerHTML = formRegister;
    

}

const main = document.addEventListener('submit',registerUser)

const registerUser = () => {
    
}
export default RegisterPage;