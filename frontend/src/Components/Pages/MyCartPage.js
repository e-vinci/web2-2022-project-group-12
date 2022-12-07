import { getAuthenticatedUser } from "../../utils/auths";
import { clearPage } from "../../utils/render";
import { loadCart } from "../../utils/utilsCart";


const MyCartPage = () => {
  // si la session contient un panier, afficher un bouton pour le supprimer (Ceci sert uniquepent de test de localStorage)
  clearPage();
  const userEmail = getAuthenticatedUser().email;
  const cart = loadCart(userEmail);
  let html="";
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const item in cart.objects) { 
    console.log(cart.objects[item].name);

    html += `name : ${  cart.objects[item].name  }price : ${  cart.objects[item].count  }nombre : ${ cart.objects[item].price}`;

}
 const main = document.querySelector('main');
 main.innerHTML += html
};
  

export default MyCartPage;
