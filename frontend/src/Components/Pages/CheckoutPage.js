import { getAuthenticatedUser } from "../../utils/auths";
import { clearPage } from "../../utils/render";
import { getCartTotal, loadCart } from "../../utils/utilsCart";
import Navigate from "../Router/Navigate";

const html = `

<div class="container">
<div class="row">
    <div class="col-md-8 order-md-1">
      <h4 class="mb-3" style="margin-top : 30px">Billing address</h4>
      <form class="needs-validation" novalidate="" >
        <div class="row">
          <div class="col-md-6 mb-3">
            <label for="firstName">First name</label>
            <input type="text" class="form-control" id="firstName" placeholder="" value="" required="">
            <div class="invalid-feedback">
              Valid first name is required.
            </div>
          </div>
          <div class="col-md-6 mb-3">
            <label for="lastName">Last name</label>
            <input type="text" class="form-control" id="lastName" placeholder="" value="" required="">
            <div class="invalid-feedback">
              Valid last name is required.
            </div>
          </div>
        </div>


        <div class="mb-3">
          <label for="email">Email <span class="text-muted">(Optional)</span></label>
          <input type="email" class="form-control" id="email" placeholder="you@example.com">
          <div class="invalid-feedback">
            Please enter a valid email address for shipping updates.
          </div>
        </div>

        <div class="mb-3">
          <label for="address">Address</label>
          <input type="text" class="form-control" id="address" placeholder="1234 Main St" required="">
          <div class="invalid-feedback">
            Please enter your shipping address.
          </div>
        </div>

        <div class="row">
          <div class="col-md-5 mb-3">
            <label for="country">Country</label>
            <select class="custom-select d-block w-100" id="country" required="">
              <option value="">Choose...</option>
              <option>Belgium</i></option>
              <option>France</i></option> 
              <option>Ukraine</i></option>
              <option>Poland</i></option>
            </select>
            <div class="invalid-feedback">
              Please select a valid country.
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <label for="zip">Code Postal</label>
            <input type="text" class="form-control" id="zip" placeholder="" required="">
            <div class="invalid-feedback">
              Zip code required.
            </div>
          </div>
        </div>
        
        <h4 class="mb-3">Payment</h4>
        
        <button class="btn btn-primary btn-lg btn-block" type="button" id="paypalID" style="margin-bottom : 120px">Pay with Paypal</button>
      </form>
      
    </div>
    <div id="firstDiv" class ="col-md-4 order-md-2 mb-4"></div>
  </div>
  </div>`;

const CheckoutPage = () => {
    clearPage();
    console.log("TEST");
    const userEmail = getAuthenticatedUser().email;
    const cart = loadCart(userEmail);
    const total = getCartTotal();
    console.log("Le total est ", total);
    console.log("JE SUIS SUR LA CHECKOUT PAGE")

    let html2 = `
    
    <div col-md-8 order-md-2 mb-4" style="margin-left : 50px; margin-top : 30px">
    <h4 class="d-flex justify-content-between align-items-center mb-3">
      <span class="mb-3">Your cart</span>
      <span class="badge badge-secondary badge-pill">3</span>
    </h4>
    <ul class="list-group mb-3" id="listItem">
    
    `;
  
    console.log("TEST2");
    console.log("le panier est", cart.objects);
  
    
  // eslint-disable-next-line prefer-destructuring
  const length = cart.objects.length;
  
  console.log("lenght : ", length)
  for(let i = 0 ; i<length;i+=1){
    let totalPriceForThisArticle = 0;
    totalPriceForThisArticle = cart.objects[i].price * cart.objects[i].count
    html2 += `
    <li class="list-group-item d-flex justify-content-between lh-condensed">
    <div>
      <h6 class="my-0">${cart.objects[i].name}</h6>
    </div>
    <span class="text-muted">${cart.objects[i].price}</span>
    <small class="text-muted">Nombre : ${cart.objects[i].count}</small>
    <small class="text-muted">Total price : ${totalPriceForThisArticle}</small>
    </li>
  `
  };


  console.log("TEST3");
  const totalPrice = getCartTotal();
  html2 += `
  <li class="list-group-item d-flex justify-content-between">
  <span>Total Price</span>
  <strong>${totalPrice} €</strong>
  </li>
  </ul>`;
  
  console.log("TEST4");
  

  const main = document.querySelector('main');
  main.innerHTML = html; 
  const id = document.getElementById('firstDiv');
  id.innerHTML = html2;

  const paypalBtn = document.getElementById('paypalID');
    paypalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      console.log('paypal listener');
      Navigate("/paypal");
    }
    );
}

export default CheckoutPage;