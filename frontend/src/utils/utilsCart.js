import Navigate from "../Components/Router/Navigate";
import { getAuthenticatedUser } from "./auths";

const shoppingCart = () => {
  const cart = [];
  saveCart(cart);
};

function saveCart(cart) {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }
  saveCart();


function loadCart() {
  const cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  return cart;
}

function deleteCart() {
  sessionStorage.removeItem('shoppingCart');
}


function addItemToCart(name, price, count) {
    const user = getAuthenticatedUser();
    if(user!==undefined){
     const cart = loadCart();
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
    // eslint-disable-next-line no-console
    console.log(cart);
    // eslint-disable-next-line no-console
    console.log("Ajout avec panier existant");
    }else{
        Navigate("login");
    }
  };


function Item(name, price, count) {
  this.name = name;
  this.price = price;
  this.count = count;
}



export { shoppingCart, loadCart, deleteCart,saveCart ,addItemToCart, Item };
