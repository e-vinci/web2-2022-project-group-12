import { clearPage } from '../../utils/render';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigate from '../Router/Navigate';
import { getAuthenticatedUser } from '../../utils/auths';
import { setUserIcon } from '../../utils/userIcon';
import Navbar from '../Navbar/Navbar';
import { setActiveLink } from '../../utils/activeLink';
import { renderPopUp } from '../../utils/utilsForm';

const NewProductPage = () => {
  clearPage();
  setActiveLink('userPage');

  setUserIcon('extUserPage');
  Navbar();
  // verifie si l'user s'est login pour acceder à cette page
  const user = getAuthenticatedUser();
  if (user === undefined) {
    Navigate('/login');
  } else {
    clearPage();

    // formulaire NewProduct
    const formNewProduct = `
      <div class="">
          <h2>Add a product</h2>
      </div>
      <form>

              <div class="mb-3 mt-3">
                  <label for="name">Product Name :</label>
                  <input type="text" class="form-control" id="productName" placeholder="Enter the product name"
                      name="productName">
              </div>

              <div class="mb-3 mt-3">
                  <label for="description">Product Description :</label>
                  <textarea class="form-control" id="description" placeholder="Enter the product description" name="description" rows="5"></textarea>
              </div>

              <div class="mb-3 mt-3">
                  <label for="email">Price :</label>
                  <input type="text" class="form-control" id="price" placeholder="Enter the price" name="price">
              </div>

              <div class="mb-3 mt-3">
                  <label for="email">Category :</label>
                  <select id="categories" class="form-select" aria-label="Default select example">
                    <option selected disabled>Choose</option>

                  </select>
              </div>

              <div class="mb-3 mt-3">
                  <label for="color">Color :</label>
                  <input type="color" class="form-control" id="color" placeholder="Enter the color of the product"
                      name="color">
              </div>

              <button type="submit" class="btn btn-success rounded-pill position-relative" id="addProduct"><i class="bi bi-plus-lg"></i> Add</button>
              <div id="snackbar">Product added!</div>
      
      </form>
    `;
    const main = document.querySelector('main');
    main.innerHTML = formNewProduct;

    getCategories()

    const btn = document.getElementById('addProduct');

    // Ajout du Produit aprés avoir appuyé sur le bouton submit
    btn.addEventListener('click', async (e) => {
      e.preventDefault();

      // Récupération de toute les données avec les id
      const productname = document.getElementById('productName').value;
      const description = document.getElementById('description').value;
      const price = document.getElementById('price').value;
      const color = document.getElementById('color').value;

      const idUser = user.userId;

      const selectElement = document.getElementById('categories');
      const idCategory = selectElement.value;

      if (
        productname === undefined ||
        description === undefined ||
        price === undefined ||
        color === undefined ||
        idCategory === undefined
      ) {
        renderPopUp();
      }

      // Création d'un nouvel objet json
      const NewProduct = {
        productname,
        description,
        price,
        color,
        idUser,
        idCategory,
      };

      try {
        const options = {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          body: JSON.stringify(NewProduct),
          headers: {
            'Content-Type': 'application/json',
          },
        };

        // const reponse = await fetch(`${process.env.API_BASE_URL}/api/products/add`, options);
        const reponse = await fetch(`/api/products/add`, options);

        if (!reponse.ok) {
          throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
        }
        const idProduct = await reponse.json();

        Navigate('/product?id_product=', idProduct);
        /* const user = await reponse.json(); */
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('error: ', err);
      }
    });
  }
};

async function getCategories() {
  let category;
  try {
    const options = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // category = await fetch('${process.env.API_BASE_URL}/api/categories/getAllCategories', options);
    category = await fetch('/api/categories/getAllCategories', options);

    if (!category.ok) {
      throw new Error(`fetch error : ${category.status}${category.statusText}`);
    }

    category = await category.json();
  } catch (err) {
    console.error('error: ', err);
  }

  const categoryHtml = document.getElementById('categories');
  console.log(category, 'category name');
  category.forEach((categorie) => {
    const categoryName = categorie.name;
    const categoryId = categorie.id_category;

    categoryHtml.innerHTML += `
       <option value="${categoryId}">${categoryName}</option>
      `;
  });
  }

export default NewProductPage;
