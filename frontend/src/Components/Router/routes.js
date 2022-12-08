import HomePage from '../Pages/HomePage';
import RegisterPage from '../Pages/RegisterPage';
import LoginPage from '../Pages/LoginPage';
import Test from '../Pages/Test';
import StatisticPage from '../Pages/StatisticPage';
import BasicSalerPage from '../Pages/BasicSellerPage';
import MyCartPage from '../Pages/MyCartPage';
import UserPage from '../Pages/UserPage';
import UpdateUser from '../Pages/UpdateUser';



const routes = {
  '/': HomePage,
  '/register': RegisterPage,
  '/login': LoginPage,
  '/test': Test,
  '/stats': StatisticPage,
  '/basicseller': BasicSalerPage,
  '/logout' : "/logout",
  '/cart' : MyCartPage,
  '/user' : UserPage,
  '/update' : UpdateUser,
};

export default routes;
