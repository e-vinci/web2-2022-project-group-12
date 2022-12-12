import 'bootstrap/dist/css/bootstrap.min.css';
import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate';


const html = `
  <h2>Add a product</h2>
      <button type="submit" class="btn btn-primary" id="addProduct" >Add New Product</button>
`;

// Calling the page to render
const BasicSellerPage = () => {
  clearPage();
  const main = document.querySelector('main');
  main.innerHTML = html;

  const btn = document.getElementById('addProduct');
  btn.addEventListener('click', async (e) => {
    e.preventDefault();

    Navigate('addProduct')
    
  });

};

export default BasicSellerPage;