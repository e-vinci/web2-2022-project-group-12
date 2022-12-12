import { clearPage } from '../../utils/render';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigate from '../Router/Navigate';
import { getAuthenticatedUser } from '../../utils/auths';

// formulaire NewProduct
const formNewProduct = `  
<h2>Add a product</h2>
<form>   
<div class="container mt-3">

    <div class="mb-3 mt-3">
        <label for="name">Product Name :</label>
        <input type="text" class="form-control" id="productName" placeholder="Enter the product name" name="productName">
    </div>

    <div class="mb-3 mt-3">
        <label for="name">Product Description :</label>
        <input type="text" class="form-control" id="description" placeholder="Enter the product description" name="description">
    </div>

    <div class="mb-3 mt-3">
        <label for="name">Type :</label>
        <input type="text" class="form-control" id="type" placeholder="Enter the type of product" name="type">
    </div>

    <div class="mb-3 mt-3">
        <label for="email">Price :</label>
        <input type="int" class="form-control" id="price" placeholder="Enter the price" name="price">    
    </div>

    <div class="mb-3 mt-3">
        <label for="email">Color :</label>
        <input type="int" class="form-control" id="color" placeholder="Enter the color of the product" name="color">
    </div>
    
    <div class="mb-3 mt-3">
        <label class="control-label small" for="file_img">Add image(jpg/png):</label> 
        <input type="file" class="form-control" name="file_img" id="image">
    </div>

    

    <button type="submit" class="btn btn-primary" id="addProduct" >Add Product</button>
</div> 
</form>
`;

const NewProductPage = () => {
  clearPage();
  // verifie si l'user s'est login pour acceder à cette page
  const user = getAuthenticatedUser();
  if (user === undefined) {
    Navigate('/login');
  } else {
    clearPage();
    const main = document.querySelector('main');
    main.innerHTML = formNewProduct;

    const btn = document.getElementById('addProduct');

    // Ajout du Produit aprés avoir appuyé sur le bouton submit
    btn.addEventListener('click', async (e) => {
      e.preventDefault();

      // Récupération de toute les données avec les id
      const productname = document.getElementById('name').value;
      const description = document.getElementById('description').value;
      const type = document.getElementById('type').value;
      const price = document.getElementById('price').value;
      const color = document.getElementById('color').value;

      if (
        productname.value === undefined ||
        description.value === undefined ||
        type.value === undefined ||
        price.value === undefined ||
        color.value === undefined
      ) {
        console.error('Veuillez compléter tous les champs');
      }

      // Création d'un nouvel objet json
      const NewProduct = {
        productname,
        description,
        price,
        color,
      };

      try {
        const options = {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          body: JSON.stringify(NewProduct),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        const reponse = await fetch('/api/products/add', options);

        if (!reponse.ok) {
          throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
        }
        Navigate("product");
        /* const user = await reponse.json(); */
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('error: ', err);
      }
    });
  }
};

export default NewProductPage;
