import Navigate from "../Components/Router/Navigate";
import { getAuthenticatedUser } from "./auths";

// crée un nouveau panier
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

// sauvegarde le panier passé en parametre (pour l'utilisateur acutel)
function saveCart(cart) {
    const user = getAuthenticatedUser();
    let string = "shoppingCart";
    string+=user.email;
    localStorage.setItem(string, JSON.stringify(cart));
  }

// charge le panier de l'utilisateur
function loadCart(emailUser) {
    console.log("Lemial du user load cart est ", emailUser);
    let string = "shoppingCart";
    string+=emailUser
  const cart = JSON.parse(localStorage.getItem(string));
  
  if(cart.email === emailUser){
  return cart;
}
return  null;
}

// supprime le panier de la localStorage (utilisateur acutel)
function deleteCart() {
  const user = getAuthenticatedUser();
  localStorage.removeItem(`shoppingCart${user.email}`);
}

// ajoute l'article dans le panier
function addItemToCart(id, name, price, count) {
    const user = getAuthenticatedUser();
    if(user!==undefined){
     const cart = loadCart(user.email);
    // eslint-disable-next-line no-restricted-syntax
        for (const item in cart.objects) {
            if (cart.objects[item].name === name) {
            cart.objects[item].count += count;
            saveCart(cart);
        return;
      }
    }
    const itemToadd = new Item(id, name, price, count);
    cart.objects.push(itemToadd);
    saveCart(cart);
    }else{
        Navigate("login");
    }
  };

  // retire une unité de l'objet passé en parametre du panier (si pares suppression count = 0, retire l'objet du panier)
  function removeItemFromCart(name){
    const user = getAuthenticatedUser();
    const cart = loadCart(user.email);
    // eslint-disable-next-line no-restricted-syntax
    for(const item in cart.objects) {
      if(cart.objects[item].name === name) {
        cart.objects[item].count -= 1;
        if(cart.objects[item].count === 0) {
          cart.objects.splice(item,1);
        }
        break;
      }
  }
  saveCart(cart);
}

// recupère le prix total du panier
function getCartTotal(){
  const user = getAuthenticatedUser();
    const cart = loadCart(user.email);
    let sum =0;
    const {length} = cart.objects;
  for(let i=0; i<length; i+=1){
    sum += cart.objects[i].price * cart.objects[i].count; 
}
return sum;
}

// récupère le nombre d'aricles dans le panier
function countProductCart(){
  const user = getAuthenticatedUser();
  const cart = loadCart(user.email);
  const {length} = cart.objects;
  let count = 0;
  for (let i = 0; i < length; i += 1) {
     count += cart.objects[i].count;
  }
  return count;

}

// constructeur d'objet pour panier
function Item(id, name, price, count) {
  this.id =id;
  this.name = name;
  this.price = price;
  this.count = count;
}


export { shoppingCart, loadCart, deleteCart,saveCart ,addItemToCart,removeItemFromCart,getCartTotal,countProductCart, Item };
