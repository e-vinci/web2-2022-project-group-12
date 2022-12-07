import { Item, loadCart, saveCart } from '../../utils/utilsCart';

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

  let cart = loadCart();

  
  function addItemToCart(name, price, count) {
    cart = loadCart();
    // eslint-disable-next-line no-restricted-syntax
    for (const item in cart) {
      if (cart[item].name === name) {
        cart[item].count += count;
        saveCart(cart);
        return;
      }
    }
    const itemToadd = new Item(name, price, count);
    cart.push(itemToadd);
    saveCart(cart);
  };

  addItemToCart("pomme",5,5);
  // eslint-disable-next-line no-console
  console.log("LE PAINIER EST", cart);
  addItemToCart("pomme",5,5);
  addItemToCart("orange",5,5);
// eslint-disable-next-line no-console
  console.log("LE PAINIER EST", cart);


};
export default MyCartPage;
