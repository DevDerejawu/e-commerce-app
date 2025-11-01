import {products} from '../data/products.js';
import {Cart, cartInstance} from './cart.js';
import { decrementFun, incrementFun} from './quantity.js';
import { deliveryOption, updateDeliveryDate } from './deliveryOption.js';
const option = deliveryOption();
const headingCartItems = document.getElementById('head-numbers-of-cart-items');
const totalCartContainer = document.getElementById('total-cart-container');
const orderSummary = document.getElementById("order-summary");
export const cartItems = document.getElementById('numbers-of-cart-items');
const goToCheckoutBtn = document.getElementById('go-to-checkout');

function renderCart(){
cartInstance.cart.forEach(({name, imgSrc, cents,quantity, id}) => {
   
  totalCartContainer.insertAdjacentHTML('beforeend', `
     <div class="row g-4">
          <div class="col-12 border rounded shadow-sm mb-5 a-single-cart-container">
          <p class="fs-5 delivery-date-${id}">Delivery Date: <span></span></p>
            <div class="d-flex gap-3 p-3">
              
              <img src="${imgSrc.imageFront}" alt="Product Image" class="cart-img">
              <div class="name-price-container-cart flex-grow-1">
                <p class="mb-1 product-name">${name}</p>
                <p class="mb-2 product-price">$${(cents / 100).toFixed(2)}</p>

                <div class="d-flex align-items-center gap-2" id="setting-info-${id}">
                  <span><span>Quantity:</span> <span id="before-updated-quantity-${id}">${quantity}</span></span>
                  <button class="btn btn-outline-success btn-sm update-btn" id="update-${id}" data-id="${id}">Update</button>
                  <button class="btn btn-danger btn-sm trash-btn"><i class="fa fa-trash" id="trash-${id}" data-id="${id}"></i></button>
                </div>  
                 
                <div class="d-flex align-items-center gap-2 d-none" id="quantity-setting-${id}">
                  <button class="btn btn-sm btn-primary decrement-btn" data-id="${id}" id="update-minus-btn-${id}">-</button>
                  <span class="quantity mx-2" id="updated-quantity-${id}"></span>
                  <button class="btn btn-sm btn-primary increment-btn" data-id="${id}">+</button>
                  <button class="btn btn-success save-updated-cart" data-id="${id}" >Save to cart</button>
                </div>
              </div>
            </div>

            <!--it is about shipping-->
              <div>
                 <h4>Choose delivery option:</h4>
                 <div class="form-check one-radio-container-${id}">
                  <input type="radio" class="form-check-input" id="after-ten-days" name="delivery-${id}" data-id="${id}">
                  <label for="after-ten-days" class="form-check-label">${option.deliveryOptionAfterTenDays}</label>
                  <p class="text-secondary"><span class="price">0</span>(Free) shipping</p>
                  
                </div>

                <div class="form-check one-radio-container-${id}">
                  <input type="radio" class="form-check-input" id="after-seven-days-${id}" name="delivery-${id}" data-id="${id}" checked>
                  <label for="after-seven-days-${id}" class="form-check-label">${option.deliveryOptionAfterSevenDays}</label>
                  <p>$<span class="price">5</span>-shipping</p>
                </div>

                <div class="form-check one-radio-container-${id}">
                  <input type="radio" class="form-check-input" id="after-four-days-${id}" name="delivery-${id}" data-id="${id}">
                  <label for="after-four-days-${id}" class="form-check-label">${option.deliveryOptionAfterFourDays}</label>
                  <p>$<span class="price">10</span>-shipping</p>
                </div>

                <div class="form-check one-radio-container-${id}">
                  <input type="radio" class="form-check-input" id="after-two-days-${id}" name="delivery-${id}" data-id="${id}">
                  <label for="after-two-days-${id}" class="form-check-label">${option.deliveryOptionAfterTwoDays}</label>
                  <p>$<span class="price">15</span>-shipping</p>
                </div>

              </div>


          </div>
        </div>
    `);
})}

renderCart();
    
    function updateCartFun(id) {
      const settingInfo = document.getElementById(`setting-info-${id}`);
      const beforeUpdatedQuantity = document.getElementById(`before-updated-quantity-${id}`).textContent;
      settingInfo.classList.add("d-none");
      const settingQuantity = document.getElementById(`quantity-setting-${id}`);
      settingQuantity.classList.remove("d-none");
      document.getElementById(`updated-quantity-${id}`).textContent =  beforeUpdatedQuantity;
        
        }

      const updateBtns = document.querySelectorAll(".update-btn");
      updateBtns.forEach((btn) => {
        btn.addEventListener("click", ((e) => {
          const id = Number(e.target.dataset.id);
          updateCartFun(id);
        }))
      }) 

      const plusBtns = document.querySelectorAll(".increment-btn");
        plusBtns.forEach((btn) =>{
          btn.addEventListener("click", ((e) =>{
             const id = Number(e.target.dataset.id);
          const spanId = `updated-quantity-${id}`;
          const min = document.getElementById(`update-minus-btn-${id}`);
          incrementFun(min, spanId);
          }))
        })

          const minusBtns = document.querySelectorAll(".decrement-btn");
          minusBtns.forEach((btn) =>{
          btn.addEventListener("click", ((e) =>{
             const id = Number(e.target.dataset.id);
          const spanId = `updated-quantity-${id}`;
          const min = document.getElementById(`update-minus-btn-${id}`);
          decrementFun(min, spanId);
          }))
        })

      const saveUpdatedCart = document.querySelectorAll(".save-updated-cart");
        saveUpdatedCart.forEach((saveBtn) =>{
          saveBtn.addEventListener("click", ((e) =>{
            const id = Number(e.target.dataset.id);
            cartInstance.filterItemForQuantityZeroUpdate(id);
              const updatedQuantity = Number(document.getElementById(`updated-quantity-${id}`).textContent);
            
            
           setTimeout(()=>{ document.getElementById(`setting-info-${id}`).classList.remove("d-none");}, 1000);
            e.target.textContent = "Saved to your cart";
           setTimeout(()=>{document.getElementById(`quantity-setting-${id}`).classList.add("d-none");}, 1000);
           setTimeout(()=>{e.target.textContent = "Save to cart";}, 1000);
          document.getElementById(`before-updated-quantity-${id}`).textContent = updatedQuantity;
           cartInstance.addToCart([...products], id, updatedQuantity); 
           refreshCartUI();
          }))
        })
    
    export function updateThedomOfCartSummery(x){
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
    
    //enable trash btn
    const trashIcons = document.querySelectorAll(".trash-btn");
    trashIcons.forEach((trash) =>{
      trash.addEventListener("click", ((event) =>{
        const id = Number(trash.querySelector("i").dataset.id);
        if(cartInstance.cart.length > 1){
          const youSure = confirm("Are you sure to delete this product from the cart completely? If yes click ok, but not click cancel.");
        if(youSure){
          cartInstance.trashFun(id);
          event.target.closest(".a-single-cart-container").remove();
          localStorage.removeItem(`selectedDeliveryOptionBtnId-${id}`)
          refreshCartUI();
        }
         return;
        } else{
          const lastSure = confirm("This is the only item in your cart! Are you sure to delete it?");
          if(lastSure){
            cartInstance.trashFun(id);
          event.target.closest(".a-single-cart-container").remove();
          localStorage.removeItem(`selectedDeliveryOptionBtnId-${id}`)
          refreshCartUI();
          empty();
          }
        }
        
      }))
    })

   function refreshCartUI() {
  updateThedomOfCartSummery(cartInstance.calculateTotal());
  cartItems.textContent = cartInstance.calculateTotalItemsInTheCart();
  headingCartItems.textContent = cartInstance.calculateTotalItemsInTheCart();
}


  
  function empty (){
  orderSummary.innerHTML = "";
  const text = document.createElement("p");
  text.textContent = "Your cart is empty now";
  text.classList.add("fs-3");
  const btn = document.createElement("button");
  btn.textContent = "Go To Home";
  btn.classList.add("btn", "btn-outline-primary");
  totalCartContainer.appendChild(text);
  totalCartContainer.appendChild(btn);
  btn.addEventListener("click", ()=>{
    window.location.href = "index.html";
  } )
}
if(cartInstance.cart.length === 0){
  empty();
}
document.addEventListener("DOMContentLoaded", () => {
  const radioBtns = document.querySelectorAll(".form-check-input");

  // Add change listeners
  radioBtns.forEach(radioBtn => {
    radioBtn.addEventListener("change", (e) => {
      const id = Number(e.target.dataset.id);
      const parent = e.target.closest(`.one-radio-container-${id}`);
      const price = Number(parent.querySelector(".price").textContent);
      const deliveryDateForAsingleProduct = parent.querySelector('label').textContent;
      //filter the changed radio btn element using the clicked dataset id
      const filterTheProductInfo = cartInstance.cart.find(opt => opt.id === id);
      filterTheProductInfo.shippingFee = price;
      filterTheProductInfo.deliveryDate = deliveryDateForAsingleProduct;
      updateDeliveryDate(id, parent);
      refreshCartUI();
      localStorage.setItem(`selectedDeliveryOptionBtnId-${id}`, e.target.id);
      cartInstance.saveCartToLocalStorage();
    });
  });

  // Restore saved selections in localStorage
  const uniqueIds = new Set([...radioBtns].map(btn => btn.dataset.id));
  uniqueIds.forEach(id => {
    const savedRadioId = localStorage.getItem(`selectedDeliveryOptionBtnId-${id}`);
    let selectedOptionBtn;

    if(savedRadioId) {
      selectedOptionBtn = document.getElementById(savedRadioId);
      selectedOptionBtn.checked = true;
    } else {
      selectedOptionBtn = document.querySelector(`input[name="delivery-${id}"]:checked`);
    }
      if(selectedOptionBtn){
        const parent = selectedOptionBtn.closest(`.one-radio-container-${id}`);
        const price = Number(parent.querySelector(".price").textContent);
        const filterTheProductInfo = cartInstance.cart.find(opt => opt.id === Number(id));
        filterTheProductInfo.shippingFee = price;
        const deliveryDateForAsingleProduct = parent.querySelector('label').textContent;
        filterTheProductInfo.deliveryDate = deliveryDateForAsingleProduct;
        cartInstance.saveCartToLocalStorage();
        updateDeliveryDate(id, parent);
      }
  });
  refreshCartUI();
});


goToCheckoutBtn.addEventListener("click", () =>{
  goToCheckoutBtn.textContent = "Wait...";
  setTimeout(()=>{
    window.location.href = "checkout.html";
    goToCheckoutBtn.textContent = "Go to Checkout"
  }, 2000);
})
refreshCartUI();

console.log(cartInstance.cart);