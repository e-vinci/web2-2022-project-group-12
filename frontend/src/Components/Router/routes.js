import HomePage from '../Pages/HomePage';
import RegisterPage from '../Pages/RegisterPage';
import LoginPage from '../Pages/LoginPage';
import Test from '../Pages/Test';
import StatisticPage from '../Pages/StatisticPage';
import BasicSalerPage from '../Pages/BasicSellerPage';
import MyCartPage from '../Pages/MyCartPage';
import NewProductPage from '../Pages/NewProductPage';
import UserPage from '../Pages/UserPage';
import UpdateUser from '../Pages/UpdateUser';
import CheckoutPage from '../Pages/CheckoutPage';
import StorePage from '../Pages/StorePage';



const routes = {
  '/': HomePage,
  '/register': RegisterPage,
  '/login': LoginPage,
  '/test': Test,
  '/stats': StatisticPage,
  '/basicseller': BasicSalerPage,
  '/logout' : "/logout",
  '/cart' : MyCartPage,
  '/addProduct' : NewProductPage,
  '/user' : UserPage,
  '/update' : UpdateUser,
  '/checkout' : CheckoutPage,
  '/store' : StorePage
};



export default routes ;
