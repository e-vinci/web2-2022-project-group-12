/* eslint-disable class-methods-use-this */
import Navigate from "../Components/Router/Navigate";
import { clearActive } from '../utils/activeLink';
import { shoppingCart } from "../utils/utilsCart";
import { renderPopUp } from "../utils/utilsForm";
import { createOrder } from "../utils/utilsOrders";
import { setAuthenticatedUser } from "../utils/auths";
import Navbar from "../Components/Navbar/Navbar";


class UserLibrary{

/* NEW FUNCTION LOGIN */    

async login(){
    const btn = document.getElementById('login');
    const btnRegister= document.getElementById('register');
  
    btnRegister.addEventListener('click', async (e) => {
        e.preventDefault();
        clearActive();
        Navigate('/register');
    });

    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('pwd').value;

        const newData = {
          email,
        password
        };

        try {
        const options = {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            body: JSON.stringify(newData),
            headers: {
            'Content-Type': 'application/json',
            },
        };

        console.log("coucou logi  ")
        const reponse = await fetch(`/api/users/login`, options);
        console.log(reponse)
      
      
        if (!reponse.ok) {
            renderPopUp();
            throw new Error(
            // eslint-disable-next-line no-irregular-whitespace
            `fetch error : ${reponse.status} : ${reponse.statusText}`,
            );
        }
      
        const user = await reponse.json();
      
        // If user has no cart, one is created
        let userCart = "shoppingCart";
            userCart += user.email;
            if ( await localStorage.getItem(userCart) == null){
                await shoppingCart(user.email);
            }

        // If user has no order history, creates one
        let userOrder = "orders";
            userOrder += user.email;
            if ( await localStorage.getItem(userOrder) == null){
                await createOrder(user.email);
            }

        // sets the Authenticated user to the actual user
        await setAuthenticatedUser(user);

        // reloads Navbar (display is different when user logged in)
        await Navbar();

        // navigte to homePage
        clearActive();
        await Navigate('/');

        } catch (err) {
        // eslint-disable-next-line
        console.error('error: ', err);
        }
    });
}

/* NEW FUNCTION REGISTER */ 

async register(){


    const btn = document.getElementById('register');
    const btnLogin = document.getElementById('login');
  
    btnLogin.addEventListener('click', async (e) => {
        e.preventDefault();
        clearActive();
        Navigate('/login');
    });

    // Adding the user after pressing the submit button
    btn.addEventListener('click', async (e) => {
        e.preventDefault();

        // Recovery of all data with id
        const lastname = document.getElementById('nom').value;
        const firstname = document.getElementById('prenom').value;
        const email = document.getElementById('email').value;
        const homme = document.getElementById('homme').checked;
        const femme = document.getElementById('femme').checked;
        const autre = document.getElementById('autre').checked;
        const password = document.getElementById('mdp').value;
        const passwordConfirmed = document.getElementById('mdp2').value;
    

        // Checkbox verification
        let sex;
        if (homme === true) {
            sex = 'M';
        }
        if (femme === true) {
            sex = 'F';
        }   
        if (autre === true) {
            sex = 'A';
        }

        // If values are undifined
        if (
            lastname.value === undefined ||
            firstname.value === undefined ||
            email.value === undefined ||
            password.value === undefined ||
            passwordConfirmed.value === undefined
        ) {
            console.error('Please, complete all the forms');
        }

        if (password !== passwordConfirmed) {
            console.error("Passwords don't match");
        }

        // Creation of a new json object
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

            const reponse = await fetch(`/api/users/register`, options);

            if (!reponse.ok) {
                throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
            }

            shoppingCart(email);
            createOrder(email);
            clearActive();
            Navigate('/login');

        
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('error: ', err);
        }
    });
} 

}

export default UserLibrary;