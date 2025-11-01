const productsContainer = document.getElementById('products-track-container');
const customerName = document.getElementById('customer-name');
const orderDate = document.querySelector("#order-date");
const total = document.getElementById('total');
const orderId = document.getElementById('order-id');
const container = document.querySelector(".container")
const backTohomeBtn = document.getElementById('back-to-home');
const savedOrder = JSON.parse(localStorage.getItem("latestOrder"));

function renderproducts(cart){
  cart.forEach(({imgSrc, deliveryDate, name, quantity}) =>{
     productsContainer.innerHTML += `
   <div class="single-product-track-container">
          <div class="product-text-info">
            <img src="${imgSrc.imageFront}" alt="${name}">
            <div class="text-info">
              <p>${name}</p>
              <p>Arriving on: <strong>${deliveryDate}</strong></p>
              <p>quantity: <strong>${quantity}</strong></p>
            </div>
          </div>
          <button class="track-order-btn">Track order</button>
      </div>
  `
  })
}

if(savedOrder){
  //displaying the textContent of elements
customerName.textContent = savedOrder.customer.fullName;
orderDate.textContent = savedOrder.orderDate;
total.textContent = savedOrder.fees.total.toFixed(2);
orderId.textContent = savedOrder.orderId;
renderproducts(savedOrder.cart);
} else{
  container.innerHTML = `<h1 style="text-align:center">Sorry, please make sure that you placed an order.</h1>
  <button class="back-to-home" id="empty-back">Back To Home</button>`
  const back = document.querySelector("#empty-back");
  back.addEventListener("click", ()=>{
    window.location.href = "index.html";
  })
}
backTohomeBtn.addEventListener("click", () =>{
  window.location.href = "index.html";
} )


