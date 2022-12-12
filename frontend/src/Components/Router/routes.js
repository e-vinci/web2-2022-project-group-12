import HomePage from '../Pages/HomePage';
import RegisterPage from '../Pages/RegisterPage';
import LoginPage from '../Pages/LoginPage';
import Product from '../Pages/Product';
import StatisticPage from '../Pages/StatisticPage';
import NewProductPage from '../Pages/NewProductPage';
import MyCartPage from '../Pages/MyCartPage';
import UserPage from '../Pages/UserPage';
import BecomeSeller from '../Pages/BecomeSeller';
import CheckoutPage from '../Pages/CheckoutPage';
import StorePage from '../Pages/StorePage';
import BasicSalerPage from '../Pages/BasicSellerPage';
import PaypalPage from '../Pages/Paypal';
import UpdateUser from '../Pages/UpdateUser';

const routes = {
  '/': HomePage,
  '/register': RegisterPage,
  '/login': LoginPage,
  '/product': Product,
  '/stats': StatisticPage,
  '/add': NewProductPage,
  '/logout': '/logout',
  '/cart': MyCartPage,
  '/addProduct': NewProductPage,
  '/user': UserPage,
  '/becomeSeller': BecomeSeller,
  '/checkout': CheckoutPage,
  '/store': StorePage,
  '/paypal': PaypalPage,
  '/basicseller' : BasicSalerPage,
  '/update': UpdateUser
};

export default routes;
