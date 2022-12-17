/* eslint-disable class-methods-use-this */
import Navigate from "../Components/Router/Navigate";
import { clearActive } from '../utils/activeLink';
import { importAll } from "../utils/utilsImages";
import { addItemToCart , countProductCart } from "../utils/utilsCart";
import { renderPopUp } from "../utils/utilsForm";
import { getAuthenticatedUser } from "../utils/auths";
import { setSearch } from "../utils/utilsSearch";

class ProductLibrary{


    // Méthode pour afficher tous les produits de la base de donnée
async showProduct(){

    let product;
    try {
        const options = {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
          },
        };
    
        const reponse = await fetch(`/api/products/getAll`, options);
    
        if (!reponse.ok) {
          throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
        }
    
        
         product = await reponse.json();
    
      } catch (err) {
        console.error('error: ', err);
      }
      
    const cardProduct = document.getElementById('imgProduct'); 
    
    let items = ``;
    let i = 0;
    while (i < product.length) {
     
      const imageProduit = importAll(require.context('../assets/product', true, /\.png$/));
      const id = product[i].id_product;
      let storeName;
      storeName = product[i].store_name;
  
      if(storeName === undefined){
        storeName = "Pas de vendeur";
      }
      const nameProduct = product[i].name;
      const priceProduct = product[i].price;
      const { category } = product[i];
      const categoryId = product[i].id_category;
      items += `
        <div class="col-md-8 col-lg-6 col-xl-4">
          <div class="card" style="border-radius: 15px;">
              <div class="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
                  data-mdb-ripple-color="light">
                  <img src="${imageProduit[i]}" style="border-top-left-radius: 15px; border-top-right-radius: 15px;"
                      class="img-fluid" alt="Laptop" />
                  <a href="#!">
                      <div class="mask"></div>
                  </a>
              </div>
  
              <div class="card-body pb-0">
                  <div class="d-flex justify-content-between">
                      <div>
                          <p><a href="#!" class="text-dark aProductName" name="${id}">${nameProduct}</a></p>
                          <p class="small text-muted"> ${storeName}</p>
                      </div>
                      <div>
                          <p class="small text-muted"><a href="#" class="text-dark categoryName" name="${categoryId}">${category}</a></p>
                      </div>
                  </div>
              </div>
              <hr class="my-0" />
              <div class="card-body pb-0">
                  <div class="d-flex justify-content-between">
                      <p class="text-dark">${priceProduct}€</p>
                  </div>
              </div>
              <hr class="my-0" />
              <div class="card-body">
                  <div class="d-flex justify-content-between align-items-center pb-2 mb-1">
                      <a href="#!" class="text-dark fw-bold">Cancel</a>
                      <button type="button" name="btnAddtoCart" value="${id}" class="btn btn-dark"><i class="bi bi-cart-plus"></i></button>
                  </div>
              </div>
          </div>
      </div>
      `;
      i += 1;
    }
    cardProduct.innerHTML = items;
  
    const a = document.getElementsByClassName('aProductName');
  
    const lenght = a.length;
  
    for (let j = 0; j < lenght; j += 1) {
      a[j].addEventListener('click', async (e) => {
        e.preventDefault();
        const id = a[j].name;
        // eslint-disable-next-line prefer-template
        clearActive();
        Navigate('/product?id_product=', id);
      });
    }
  
    // permet le render vers la page de la categorie cliqué
    const cat = document.getElementsByClassName('categoryName');
    
    for (let j = 0; j < cat.length; j += 1) {
      cat[j].addEventListener('click', async (e) => {
        e.preventDefault();
        const idcat = cat[j].name;
        // eslint-disable-next-line prefer-template
        clearActive();
        Navigate('/category?=', idcat);
      });
    } 
  }; 
  


  // Fonction pour afficher les 5 derniers produits de la db
  async showLastProduct() {
    let product;
    try {
        const options = {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
          },
        };
    
        const reponse = await fetch(`/api/products/selectLastProduct`, options);
    
        if (!reponse.ok) {
          throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
        }
    
         product = await reponse.json();
       
    
      } catch (err) {
        console.error('error: ', err);
      }
  
    const cardProduct = document.getElementById('imgProduct');
    let items = ``;
    let i = 0;
  
    while (i <  product.length) {
  
      const imageProduit = importAll(require.context('../assets/product', true, /\.png$/));
  
      const id = product[i].id_product;
      let storeName;
      storeName = product[i].store_name;
  
      if(storeName === undefined){
        storeName = "Pas de vendeur";
      }
      const nameProduct = product[i].name;
      const priceProduct = product[i].price;
      const {category} = product[i];
      const categoryName = {category}.name;
      const categoryId = product[i].id_category;
  
      items += `
        <div class="col-md-8 col-lg-6 col-xl-4">
            <div class="card" style="border-radius: 15px;">
                <div class="bg-image hover-overlay ripple ripple-surface ripple-surface-light" data-mdb-ripple-color="light">
                    <img src="${imageProduit[i]}" style="border-top-left-radius: 15px; border-top-right-radius: 15px;" class="img-fluid" alt="Laptop" />
                </div>
  
            <div class="card-body pb-0">
                <div class="d-flex justify-content-between">
                      <div>
                          <p><a href="#!" class="text-dark productName" name="${id}">${nameProduct}</a></p>
                          <p class="small text-muted"> ${storeName}</p>
                      </div>
                      <div>
                          <p class="small text-muted"><a href="#" class="text-dark categoryName" name="${categoryId}">${categoryName}</a></p>
                      </div>
                  </div>
              </div>
              <hr class="my-0" />
              <div class="card-body pb-0">
                  <div class="d-flex justify-content-between">
                      <p class="text-dark">${priceProduct}€</p>
                  </div>
              </div>
              <hr class="my-0" />
              <div class="card-body">
                  <div class="d-flex justify-content-between align-items-center pb-2 mb-1">
                      <a href="#!" class="text-dark fw-bold">Cancel</a>
                      <button type="button" name="btnAddtoCart" value="${id}" class="btn btn-dark"><i class="bi bi-cart-plus"></i></button>
                  </div>
              </div>
          </div>
      </div>
    `;
      i += 1;
    }
    cardProduct.innerHTML = items;

    const btn = document.getElementsByName('btnAddtoCart');
    for (let y = 0; y < btn.length; y += 1) {
      btn[y].addEventListener('click', async (e) => {
        e.preventDefault();
        renderPopUp();
        addItemToCart(product[y].id_product ,product[y].name, product[y].price, 1);
        const nombre = document.getElementById('numberOfArticles');
        const newNombre = countProductCart();
        nombre.innerHTML = newNombre;

      });
    }
  
    const productName = document.getElementsByClassName('productName');
    for (let j = 0; j < product.length; j += 1) {
      productName[j].addEventListener('click', async (e) => {
        e.preventDefault();
        const id = productName[j].name;
        // eslint-disable-next-line< prefer-template
        clearActive();
        Navigate('/product?=', id);
      });
    }
  
    
    const cat = document.getElementsByClassName('categoryName');
    for (let j = 0; j < cat.length; j += 1) {
      cat[j].addEventListener('click', async (e) => {
        e.preventDefault();
        const idcat = cat[j].name;
        // eslint-disable-next-line prefer-template
        clearActive();
        Navigate('/category?=', idcat);
      });}
  }; 

  

// Function to display all categories
  async fetchCategories(){

    let categories;
    try {
        const options = {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          headers: {
            'Content-Type': 'application/json',
          },
        };
    
        const reponse = await fetch('/api/categories/getAllCategories', options);
    
        if (!reponse.ok) {
          throw new Error(`fetch error : ${reponse.status}${reponse.statusText}`);
        }
    
          categories = await reponse.json();
          

        

        }
       catch (err) {
        console.error('error: ', err);
      }
      return  categories;
      

  }

  
  async newProduct(){
    
    const btn = document.getElementById('addProduct');
    const user = getAuthenticatedUser();

    // Adding the product after pressing the submit button
    btn.addEventListener('click', async (e) => {
            e.preventDefault();

        // Recovery of all data with id
        const productname = document.getElementById('productName').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const color = document.getElementById('color').value;

        const idUser= user.userId

        const selectElement = document.getElementById('select1');
        const idCategory = selectElement.value;

        console.log("les donnees", productname,description,price,color,idUser,idCategory);
        console.log("les donnees .value", productname.value,description.value,price.value,color.value,idUser.value,idCategory.value);

        if (
            productname === undefined ||
            description === undefined ||
            price === undefined ||
            color === undefined ||
            idCategory === undefined
        ) {
            console.error('Veuillez compléter tous les champs');
        }

        // Création d'un nouvel objet json
        const NewProduct = {
            productname,
            description,
            price,
            color,
            idUser,
            idCategory
        };

        try {
            const options = {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                body: JSON.stringify(NewProduct),
                headers: {
                    'Content-Type': 'application/json',
                },
            };

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



  async searchBar(){

    const btnSearch = document.getElementById('searchbtn');
    btnSearch.addEventListener('click', async (e) => {
      e.preventDefault();
      // Récupération de toute les données avec les id
      const data = document.getElementById('search').value;
  
      if (data === undefined) {
        console.error('Search vide, ignorer l action');
      } else {
        try {
          const options = {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
  
            headers: {
              'Content-Type': 'application/json',
            },
          };
          console.log(JSON.stringify(data));
          // eslint-disable-next-line prefer-template
          const results = await fetch(`/api/products/search/` + data, options);
          const products = await results.json();
          console.log(products);
  
          setSearch(products);
  
          if (!results.ok) {
            throw new Error(`fetch error : ${results.status}${results.statusText}`);
          }
          clearActive();
          Navigate('/search');
          /* const user = await reponse.json(); */
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('error: ', err);
        }
      } 
    }); 

  }

  
  
}

export default ProductLibrary ;