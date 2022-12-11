import HomePage from '../Pages/HomePage';
import RegisterPage from '../Pages/RegisterPage';
import LoginPage from '../Pages/LoginPage';
import Test from '../Pages/Test';
import StatisticPage from '../Pages/StatisticPage';
import NewProductPage from '../Pages/NewProductPage';
import MyCartPage from '../Pages/MyCartPage';



const routes = {
  '/': HomePage,
  '/register': RegisterPage,
  '/login': LoginPage,
  '/test': Test,
  '/stats': StatisticPage,
  '/add': NewProductPage,
  '/logout' : "/logout",
  '/cart' : MyCartPage
};

export default routes;
