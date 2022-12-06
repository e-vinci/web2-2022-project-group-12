const shoppingCart = () => {
    const cart = [];
    saveCart();
    function saveCart() {
        sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
}

   function loadCart() {
        const cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
        return cart;
    } 

    function deleteCart() {
        sessionStorage.removeItem('shoppingCart');
    }

export { shoppingCart, loadCart, deleteCart }