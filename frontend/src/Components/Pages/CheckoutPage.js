import { clearPage } from "../../utils/render";
import { getCartTotal } from "../../utils/utilsCart";


const CheckoutPage = () => {
    clearPage();
    const total = getCartTotal();
    console.log("Le total est ", total);
    console.log("JE SUIS SUR LA CHECKOUT PAGE")
    
}

export default CheckoutPage;