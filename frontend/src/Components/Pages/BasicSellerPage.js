import 'bootstrap/dist/css/bootstrap.min.css';
import { clearPage } from '../../utils/render';

// Calling the page to render
const BasicSalerPage = () => {
  clearPage();
  const main = document.querySelector('main');
  const html = `
        <button type="button" class="btn btn-success">Add product</button>
`;
  main.innerHTML = html;
};

export default BasicSalerPage;
