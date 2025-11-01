
import { cartInstance } from "./cart.js";
import {rightNow} from "./deliveryOption.js";
const cartItems = document.getElementById('numbers-of-cart-items');
const fullName = document.getElementById('full-name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const address = document.getElementById('address');
const city = document.getElementById('city');
const zipCode = document.getElementById('zip');
const placeOrderBtn = document.getElementById('place-order');
const modalContainer = document.getElementById('modal-container');
let paymentMethod;
function updateThedomOfCartSummery(x){
      //get elements from the dom
    const costOfSubtotal = document.getElementById('cost-of-subtotal');
    const costOfShipping = document.getElementById('cost-of-shipping');
    const costOfTotalBeforeTax = document.getElementById('cost-of-total-before-tax');
    const costOfTax = document.getElementById('cost-of-tax');
    const costOfTotal = document.getElementById('cost-of-total');

    //assign the textContent of price related elements
    costOfSubtotal.textContent = `$${x.subtotal.toFixed(2)}`;
    costOfShipping.textContent = `$${x.shipping.toFixed(2)}`;
    costOfTotalBeforeTax.textContent = `$${x.totalBeforeTax.toFixed(2)}`;
    costOfTax.textContent = `$${x.tax.toFixed(2)}`;
    costOfTotal.textContent = `$${x.total.toFixed(2)}`;
    }
    cartItems.textContent = cartInstance.calculateTotalItemsInTheCart();
    updateThedomOfCartSummery(cartInstance.calculateTotal());

    // function for modal to give the opportuniy for user if they want to edit the info and proceed the proccess.
    function modalCheckout(){
  const fullNameValue = fullName.value;
  const emailValue = email.value;
  const phoneValue = phone.value;
  const addressValue = address.value;
  const zipCodeValue = zipCode.value;
  const cityValue = city.value;
  const SelectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
  const parent = SelectedPaymentMethod.closest(".form-check");
  paymentMethod = parent.querySelector("label").textContent;
  modalContainer.innerHTML = `
  <div class="modal" id="modal-id">
    <div class="modal-content">
      <h4 class="heading-intro">Take a look your info and if you got some wrong info you can edit, otherwise you can proceed!</h4>
      <p>Full Name: <strong>${fullNameValue}</strong></p>
      <p>Email: <strong>${emailValue}</strong></p>
      <p>Phone Number: <strong>${phoneValue}</strong></p>
      <p>Shipping Address: <strong>${addressValue}</strong></p>
      <p>City: <strong>${cityValue}</strong></p>
      <p>Zip/Postal code: <strong>${zipCodeValue}</strong></p>
      <p>Payment type: <strong>${paymentMethod}</strong></p>
      <div class="btn-cont">
        <button id="edit-info">Edit info</button>
        <button id="correct">I'm correct!</button>
      </div>
    </div>
   <div> 
  `
  const editInfo = document.getElementById('edit-info');
  const correct = document.getElementById('correct');
  editInfo.addEventListener("click", ()=>{
  const modalId = document.getElementById('modal-id');
  modalId.classList.add("hidden");
  })
  correct.addEventListener("click", ()=>{
    const modalId = document.getElementById('modal-id');
    orderInfoFun(modalId);
  });
    }
placeOrderBtn.addEventListener("click", ()=>{
modalCheckout();
});

// a function to save some informations and make the cart empty once he orders when a user clicks I am crrect btn.
 function orderInfoFun(modalId){
  const orderedData = {
      orderId: "ORDER-" + Date.now(),
      orderDate: rightNow(),
      status: "pending",
      paymentType: paymentMethod,
      customer: {
        fullName: fullName.value,
        email: email.value,
        phone: phone.value,
        address: address.value,
        city: city.value,
        zipCode: zipCode.value,
      },
      cart: cartInstance.cart,
      fees: cartInstance.calculateTotal()
    }
    localStorage.setItem("latestOrder", JSON.stringify(orderedData));
    cartInstance.cart = [];
    cartInstance.saveCartToLocalStorage();
    window.location.href = "confirmation.html";
    modalId.classList.add("hidden");
 }

 