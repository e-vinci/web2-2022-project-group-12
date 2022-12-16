import { setAuthenticatedUser } from '../../utils/auths';
import { clearPage } from '../../utils/render';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';
import logoAsset from '../../assets/logo.png';
import { shoppingCart } from '../../utils/utilsCart';
import { createOrder } from '../../utils/utilsOrders';
import { renderPopUp } from '../../utils/utilsForm';
import { clearActive, setActiveLink } from '../../utils/activeLink';

const formLogin = `
  
<section class="h-100 gradient-form" style="background-color: #eee; margin-bottom : 200px">
        <div class="container py-5 h-100">
        <div id="snackbar">The email or the password is incorrect !</div>
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-xl-10">
                    <div class="card rounded-3 text-black">
                        <div class="row g-0">
                            <div class="col-lg-6">
                                <div class="card-body p-md-5 mx-md-4">

                                    <div class="text-center">
                                        <img src="${logoAsset}" style="width: 185px;" alt="logo">
                                        <h4 class="mt-1 mb-5 pb-1">We are VinciStore</h4>
                                    </div>

                                    <form>
                                        

                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form2Example11">Email</label>
                                            <input type="email" id="email" class="form-control"
                                                placeholder="Email address" />
                                        </div>

                                        <div class="form-outline mb-4">
                                            <label class="form-label" for="form2Example22">Password</label>
                                            <input type="password" id="pwd" class="form-control"
                                                placeholder="Password" />
                                        </div>

                                        <div class="text-center pt-1 mb-5 pb-1">
                                            <button class="btn btn-white btn-block fa-lg gradient-custom-2 mb-3"
                                                id="login" type="button" style="color : white">Login</button>
                                        </div>

                                        <div class="d-flex align-items-center justify-content-center pb-4">
                                            <p class="mb-0 me-2">Don't have an account?</p>
                                            <button type="button" class="btn btn-outline-primary" id="register">Create
                                                new</button>
                                        </div>
                                    </form>

                                </div>
                            </div>
                            <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                                <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                                    <h4 class="mb-4">Vinci Store</h4>
                                    <p class="small mb-0">Buy, sell or trade the clothes, shoes and accessories you no
                                        longer wear!
                                        You don't wear it anymore? Sell it!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>           
        </div>
    </section>
    

`;

const LoginPage = () => {
  clearPage();
  setActiveLink('loginPage');
  const main = document.querySelector('main');
  main.innerHTML = formLogin;

  const btn = document.getElementById('login');
  
  const btnRegister = document.getElementById('register');
  
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
      "email": email,
      "password": password
    };

    if(email === "" || password === ""){
      renderPopUp();
    }

    try {
      const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(newData),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const reponse = await fetch(`${process.env.API_BASE_URL}/api/users/login`, options);
      
      
      if (!reponse.ok) {
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
  
};
export default LoginPage;
