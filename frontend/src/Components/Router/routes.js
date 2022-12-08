import HomePage from '../Pages/HomePage';
import RegisterPage from '../Pages/RegisterPage';
import LoginPage from '../Pages/LoginPage';
import Test from '../Pages/Test';
import StatisticPage from '../Pages/StatisticPage';
import BasicSalerPage from '../Pages/BasicSellerPage';
import MyCartPage from '../Pages/MyCartPage';
import NewProductPage from '../Pages/NewProductPage';



const routes = {
  '/': HomePage,
  '/register': RegisterPage,
  '/login': LoginPage,
  '/test': Test,
  '/stats': StatisticPage,
  '/basicseller': BasicSalerPage,
  '/logout' : "/logout",
  '/cart' : MyCartPage,
  '/addProduct' : NewProductPage
};



export default routes ;
