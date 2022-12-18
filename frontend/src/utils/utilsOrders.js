import { getAuthenticatedUser } from "./auths";
import { loadCart } from "./utilsCart";

// cree un liste de commandes en localStorage
const createOrder = (email) => {
    const items = [];
    const orders = {
     objects : items,
     email
  }
  let string = "orders";
    string+=email;
    localStorage.setItem(string,JSON.stringify(orders));
};

// ajoute le panier a la lise de commandes
async function addOrder(){
    const user = await getAuthenticatedUser();
    const orders = await loadOrders(user.email)
    const cart = await loadCart(user.email);
    await orders.objects.push(cart.objects)
    saveOrder(orders);
}

// charge la liste des commandes
function loadOrders(email) {
    console.log("Test ordres chager");
    let string = "orders";
    string+=email
    const orders = JSON.parse(localStorage.getItem(string));
    console.log("les ordres sont chargés",orders);
    return orders;
}

// ennregistre liste de la commande passee en parametre
function saveOrder(orders) {
  const user = getAuthenticatedUser();
  let string = "orders";
  string+=user.email;
  localStorage.setItem(string, JSON.stringify(orders));
}

// supprime la liste de commandes de la localstorage (suppression de compte)
function deleteOrders(){
  const user = getAuthenticatedUser();
  localStorage.removeItem(`orders${user.email}`)
}

export {loadOrders, addOrder, createOrder, deleteOrders}