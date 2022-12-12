import { loadScript } from "@paypal/paypal-js";
import { clearPage } from "../../utils/render";
import { getCartTotal } from "../../utils/utilsCart";

const html = `
<div class ="container" style="text-align: center; margin-top : 100px"><strong> Amount to Pay : <div id="priceToPay"></div> </strong></div>
<div id="smart-button-container">
    <div style="text-align: center; margin-top: 5%;" id="paypal-button-container"></div>
</div>
   `

const PaypalPage = () =>{
    clearPage();
    
    const main = document.querySelector('main');
    main.innerHTML = html;

    const idToPay = document.getElementById('priceToPay');
    const script = document.createElement('script');

    // paypal button script
    script.src = 'https://www.paypal.com/sdk/js?client-id=sd&currency=EUR&buyer-country=DE&commit=false';

    // append to main because innerHTML does not read scripts
    main.appendChild(script);

    // Display price on top of button
    let total = getCartTotal();
    total += ' $';
    idToPay.innerHTML = total;

    // paypal api script for the button
    loadScript({
      'client-id':
        'Acqu4pLqA9Y34KLeXYL8XWHiIqR6_Mrfb14WKkjgAMu6pbCYo-SFUSLCvKGKNaDCBB5XFmJYyN-NhGzL',
    })
      .then((paypal) => {
        function initPayPalButton() {
          paypal
            .Buttons({
              style: {
                shape: 'pill',
                color: 'white',
                layout: 'horizontal',
                label: 'paypal',
              },

              createOrder(data, actions) {
                return actions.order.create({
                  purchase_units: [{ amount: { currency_code: 'USD', value: getCartTotal() } }],
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
// initiate paypal button
initPayPalButton();})

  .catch((err) => {
      console.error("failed to load the PayPal JS SDK script", err);
  });
}




export default PaypalPage;
