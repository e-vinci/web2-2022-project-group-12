import { loadCart } from "../../utils/utilsCart";


const MyCartPage = () => {
  // si la session contient un panier, afficher un bouton pour le supprimer (Ceci sert uniquepent de test de localStorage)
  if (sessionStorage.getItem('shoppingCart') != null) {
    const main = document.querySelector('main');
    main.innerHTML = `<button type="button" id="removeButton"class="btn btn-primary">Supprimer Panier</button>`;
  } else {
    // si non (ou quand on clique sur supprimer panier, affiche qu'il n'y a pas de panier)
    const main = document.querySelector('main');
    main.innerHTML = "Il n'y a pas de panier ";
  }
  // supprimer le panier
  const deleteCartTest = () => {
    sessionStorage.removeItem('shoppingCart');
    MyCartPage();
  };

  const btn = document.getElementById('removeButton');
  btn.addEventListener('click', deleteCartTest);

  const cart = loadCart();
  console.log(cart);

};
export default MyCartPage;
