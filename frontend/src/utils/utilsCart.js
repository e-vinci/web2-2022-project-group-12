import Navigate from "../Components/Router/Navigate";
import { getAuthenticatedUser } from "./auths";

const shoppingCart = (email) => {
    const items = [];
    const cart = {
     objects : items,
     email
  }
  console.log("Cart created");
  createCart(cart,email);
};

function createCart(cart,email){
    let string = "shoppingCart";
    string+=email;
    localStorage.setItem(string,JSON.stringify(cart));
}

function saveCart(cart) {
    const user = getAuthenticatedUser();
    let string = "shoppingCart";
    string+=user.email;
    localStorage.setItem(string, JSON.stringify(cart));
  }

function loadCart(emailUser) {
    console.log("Lemial du user load cart est ", emailUser);
    let string = "shoppingCart";
    string+=emailUser
  const cart = JSON.parse(localStorage.getItem(string));
  if(cart.email === emailUser){
  return cart;
}
return  console.error("le user n'a pas de cart")
}

function deleteCart() {
  localStorage.removeItem('shoppingCart');
}


function addItemToCart(name, price, count) {
    const user = getAuthenticatedUser();
    if(user!==undefined){
        console.log("email",user.email);
     const cart = loadCart(user.email);
     console.log("tentative d'ajout dans le cart", cart);
    // eslint-disable-next-line no-restricted-syntax
        for (const item in cart.objects) {
            if (cart.objects[item].name === name) {
            cart.objects[item].count += count;
            saveCart(cart);
        return;
      }
    }
    const itemToadd = new Item(name, price, count);
    cart.objects.push(itemToadd);
    console.log(cart);
    saveCart(cart);
    // eslint-disable-next-line no-console
    console.log(cart);
    // eslint-disable-next-line no-console
    console.log("Ajout avec panier existant");
    }else{
        Navigate("login");
    }
  };

  function removeItemFromCart(name){
    console.log("l'objet a supprimer est : ", name);
    const user = getAuthenticatedUser();
    const cart = loadCart(user.email);
    console.log("cart avant remove ", cart)
    // eslint-disable-next-line no-restricted-syntax
    for(const item in cart.objects) {
      if(cart.objects[item].name === name) {
        cart.objects[item].count -= 1;
        if(cart.objects[item].count === 0) {
          cart.objects.splice(item,1);
        }
        console.log("Normaly Items has been removed");
        console.log(cart);
        break;
      }
  }
  saveCart(cart);
}



function Item(name, price, count) {
  this.name = name;
  this.price = price;
  this.count = count;
}



export { shoppingCart, loadCart, deleteCart,saveCart ,addItemToCart,removeItemFromCart, Item };
