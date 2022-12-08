import 'bootstrap/dist/css/bootstrap.min.css';
import { clearPage } from '../../utils/render';


const html = `
  <h2>Add a product</h2>
  <form>   
  <div class="container mt-3">

      <div class="mb-3 mt-3">
          <label for="name">Product Name :</label>
          <input type="text" class="form-control" id="productName" placeholder="Enter the product name" name="productName">
      </div>

      <div class="mb-3 mt-3">
          <label for="name">Type :</label>
          <input type="text" class="form-control" id="type" placeholder="Enter the type of product" name="type">
      </div>

      <div class="mb-3 mt-3">
          <label for="email">Prix :</label>
          <input type="int" class="form-control" id="prix" placeholder="Enter te prix" name="prix">
      </div>

      

      <button type="submit" class="btn btn-primary" id="addProduct" >Add Product</button>
  </div> 
</form>
`;

// Calling the page to render
const BasicSalerPage = () => {
  clearPage();
  const main = document.querySelector('main');
  main.innerHTML = html;

  const btn = document.getElementById('addProduct');
  btn.addEventListener('click', async (e) => {
    e.preventDefault();

    const productName = document.getElementById('productName').value;
    const type = document.getElementById('type').value;
    const prix = document.getElementById('prix').value;

    const newData = {
      productName,
      type,
      prix
    }

    try {
      const options = {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        body: JSON.stringify(newData),
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const reponse = await fetch('/api/products/add', options);

      if (!reponse.ok) {
        throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
      }
      /* const user = await reponse.json(); */
    } catch (err) {
        
      console.error('error: ', err);
    }
  });

};

export default BasicSalerPage;
