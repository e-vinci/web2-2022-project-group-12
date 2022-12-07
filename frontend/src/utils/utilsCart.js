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



function Item(name, price, count) {
  this.name = name;
  this.price = price;
  this.count = count;
}

export { shoppingCart, loadCart, deleteCart,saveCart , Item };
