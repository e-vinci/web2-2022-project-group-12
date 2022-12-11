
import { getAuthenticatedUser } from "../../utils/auths";
import { clearPage } from "../../utils/render";
import { getCartTotal, loadCart, removeItemFromCart } from "../../utils/utilsCart";
import Navigate from "../Router/Navigate";

const html = `
<div class="col-md-4 order-md-2 mb-4 mx-auto" style="margin-top: 5%">
<h4 class="d-flex justify-content-between align-items-center mb-3">
  <span class="text-muted">Your cart</span>
  <span class="badge badge-secondary badge-pill">3</span>
</h4>
<ul class="list-group mb-3" id="listItem">

</ul>

<button type="button" class="btn btn-success btn-lg" id="checkoutButton">Checkout</button>
`;

const MyCartPage = () => {
  // si la session contient un panier, afficher un bouton pour le supprimer (Ceci sert uniquepent de test de localStorage)
  clearPage();
  const userEmail = getAuthenticatedUser().email;
  const cart = loadCart(userEmail);
  const main = document.querySelector('main');
  if(cart.objects.length === 0){
    main.innerHTML = `<h1 class="cover-heading  " style="margin-top : 200px; text-align : center">Votre panier est vide &#128524</h1>`;
  }else{
  
  
  main.innerHTML = html;
  let html2 = ``;
  
  
  console.log("le panier est", cart.objects);


// eslint-disable-next-line prefer-destructuring
const length = cart.objects.length;
const id = document.getElementById('listItem');
console.log("lenght : ", length)
for(let i = 0 ; i<length;i+=1){
  let totalPriceForThisArticle = 0;
  totalPriceForThisArticle = cart.objects[i].price * cart.objects[i].count
  html2 += `
  <li class="list-group-item d-flex justify-content-between lh-condensed">
  <div>
    <a href="" class="buttonToItem" class="my-0">${cart.objects[i].name}</a>
  </div>
  <span class="text-muted">${cart.objects[i].price}</span>
  <small class="text-muted">Nombre : ${cart.objects[i].count}</small>
  <small class="text-muted">Total price : ${totalPriceForThisArticle}</small>
  <button type="button" class="deleteArticleButton btn btn-light">Supprimer Article</button>
  </li>
`
}

const totalPrice = getCartTotal();
html2 += `<li class="list-group-item d-flex justify-content-between">
<span>Total Price</span>
<strong>${totalPrice} €</strong>
</li>`

id.innerHTML = html2;

const btnToArticle = document.getElementsByClassName('buttonToItem');
for(let y=0;y<btnToArticle.length; y+=1){
  // eslint-disable-next-line no-loop-func
   btnToArticle[y].addEventListener('click', async (e) => {
    e.preventDefault();
     console.log("Je suis dans le event listener");
     // eslint-disable-next-line no-console
     Navigate("/test?id_product=",cart.objects[y].name);
   });
 }


const btn = document.getElementsByClassName('deleteArticleButton');
  for(let y=0;y<btn.length; y+=1){
   // eslint-disable-next-line no-loop-func
    btn[y].addEventListener('click', async (e) => {
      e.preventDefault();
      console.log("Je suis dans le event listener");
      
      // eslint-disable-next-line no-console
      removeItemFromCart(cart.objects[y].name);
      Navigate("/cart");
    });
  }
  const btnCheckout = document.getElementById('checkoutButton');
  btnCheckout.addEventListener('click', (e)=>{
    e.preventDefault();
    Navigate("/checkout");
  });
}

};
  

export default MyCartPage;
