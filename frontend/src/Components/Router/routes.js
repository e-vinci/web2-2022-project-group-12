import HomePage from '../Pages/HomePage';
import RegisterPage from '../Pages/RegisterPage';
import LoginPage from '../Pages/LoginPage';
import Product from '../Pages/Product';
import StatisticPage from '../Pages/StatisticPage';
import BasicSalerPage from '../Pages/BasicSellerPage';
import MyCartPage from '../Pages/MyCartPage';
import NewProductPage from '../Pages/NewProductPage';
import UserPage from '../Pages/UserPage';
import UpdateUser from '../Pages/UpdateUser';
import CheckoutPage from '../Pages/CheckoutPage';



const routes = {
  '/': HomePage,
  '/register': RegisterPage,
  '/login': LoginPage,
  '/product': Product,
  '/stats': StatisticPage,
  '/basicseller': BasicSalerPage,
  '/logout' : "/logout",
  '/cart' : MyCartPage,
  '/addProduct' : NewProductPage,
  '/user' : UserPage,
  '/update' : UpdateUser,
  '/checkout' : CheckoutPage
};



export default routes ;
