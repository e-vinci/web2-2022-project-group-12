import { clearPage } from "../../utils/render";
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () =>{
    clearPage();
    const main = document.querySelector('main');

    const formLogin = `<div class="container mt-3">

    <div class="mb-3 mt-3">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email" placeholder="Entrez votre email" name="email">
    </div>


    <div class="mb-3 mt-3">
        <label for="password">Mot de passe</label>
        <input type="password" class="form-control" id="mdp" placeholder="Entrez votre mot de passe" name="password">
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>


</div>`;
    main.innerHTML = formLogin;

}

export default LoginPage;