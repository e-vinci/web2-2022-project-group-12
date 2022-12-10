import { loadScript } from "@paypal/paypal-js";
import { clearPage } from "../../utils/render";

const html = `
<div id="smart-button-container">
    <div style="text-align: center"><label for="description"> </label><input type="text" name="descriptionInput" id="description" maxlength="127" value=""></div>
      <p id="descriptionError" style="visibility: hidden; color:red; text-align: center;">Please enter a description</p>
    <div style="text-align: center"><label for="amount"> </label><input name="amountInput" type="number" id="amount" value="" ><span>EUR</span></div>
      <p id="priceLabelError" style="visibility: hidden; color:red; text-align: center;">Please enter a price</p>
    <div id="invoiceidDiv" style="text-align: center; display: none;"><label for="invoiceid"> </label><input name="invoiceid" maxlength="127" type="text" id="invoiceid" value="" ></div>
      <p id="invoiceidError" style="visibility: hidden; color:red; text-align: center;">Please enter an Invoice ID</p>
    <div style="text-align: center; margin-top: 0.625rem;" id="paypal-button-container"></div>
  </div>
  <script></script>
  
  
 
   `

  
   
  
const PaypalPage = () =>{
    clearPage();
    
    console.log("paypal page loaded");
    const main = document.querySelector('main');
    main.innerHTML = html;
    const script = document.createElement('script');
    script.src = 'https://www.paypal.com/sdk/js?client-id=Acqu4pLqA9Y34KLeXYL8XWHiIqR6_Mrfb14WKkjgAMu6pbCYo-SFUSLCvKGKNaDCBB5XFmJYyN-NhGzL&currency=EUR&buyer-country=DE&commit=false';
    script.id = "paypalButton";
    console.log('Script loaded successfuly');

    // eslint-disable-next-line no-undef
    main.appendChild(script);

    loadScript({ "client-id": "Acqu4pLqA9Y34KLeXYL8XWHiIqR6_Mrfb14WKkjgAMu6pbCYo-SFUSLCvKGKNaDCBB5XFmJYyN-NhGzL" })
    .then((paypal) => {
  
function initPayPalButton() {
  paypal.Buttons({
    style: {
      shape: 'pill',
      color: 'white',
      layout: 'horizontal',
      label: 'paypal',
      
    },

    createOrder(data, actions) {
      return actions.order.create({
        purchase_units: [{"amount":{"currency_code":"USD","value":1}}]
      });
    },

    onApprove(data, actions) {
      return actions.order.capture().then((orderData) => {
        
        // Full available details
        console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

        // Show a success message within this page, e.g.
        const element = document.getElementById('paypal-button-container');
        element.innerHTML = '';
        element.innerHTML = '<h3>Thank you for your payment!</h3>';

        // Or go to another URL:  actions.redirect('thank_you.html');
        
      });
    },

    onError(err) {
      console.log(err);
    }
  }).render('#paypal-button-container');
}
initPayPalButton();})

  .catch((err) => {
      console.error("failed to load the PayPal JS SDK script", err);
  });
}




export default PaypalPage;