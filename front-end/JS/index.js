
import {products} from '../data/products.js';
import {Cart, cartInstance} from './cart.js';
import { decrementFun, incrementFun} from './quantity.js';
import {renderProducts} from './productCards.js';

const menuBtn = document.getElementById('menu-btn');
const dropdownNav = document.getElementById('dropdown-nav');
export const productsContainer = document.getElementById('products-container');
const firstNav = document.getElementById('first-nav');
const cartCount = document.getElementById('cart-count');
const topRated = document.getElementById('top-rated');
const topSelling = document.getElementById('top-selling');
const newArrival = document.getElementById('new-arrival');
 
menuBtn.addEventListener("click", () =>{
  dropdownNav.classList.toggle('d-none');
  const isExpanded = menuBtn.getAttribute("aria-expanded") === "true" || false;
  menuBtn.setAttribute("aria-expanded", !isExpanded); 
});

 //execute a task when top rated text clicked
topRated.addEventListener("click", () =>{
  topRated.classList.add("dere-underline");
  topSelling.classList.remove("dere-underline");
  newArrival.classList.remove("dere-underline");
  const filteredTopRated = [...products].sort((a, b) => b.rating.stars - a.rating.stars).slice(0, 20);
  renderProducts(filteredTopRated)});

 // execute a task when top selling text clicked
topSelling.addEventListener("click", () =>{ 
  topRated.classList.remove("dere-underline");
  topSelling.classList.add("dere-underline");
  newArrival.classList.remove("dere-underline");
  const filteredTopSelling = [...products].sort((a, b) =>  b.sales - a.sales ).slice(0, 20);
  renderProducts(filteredTopSelling)});

// execute a task when new arrival text clicked
newArrival.addEventListener("click", () =>{ 
  topRated.classList.remove("dere-underline");
  topSelling.classList.remove("dere-underline");
  newArrival.classList.add("dere-underline");
  const slicedNewArrival = [...products].slice(0, 20);
  renderProducts(slicedNewArrival)});

 //default rendering products as new arrival
document.addEventListener("DOMContentLoaded", () =>{
  topRated.classList.remove("dere-underline");
  topSelling.classList.remove("dere-underline");
  newArrival.classList.add("dere-underline");
  const slicedNewArrival = [...products].slice(0, 20);
  renderProducts(slicedNewArrival);
  })

  // Useing event delegation for buttons since they might not exist when the script first runs
  productsContainer.addEventListener("click", (e) => {

  if (e.target.classList.contains("increment-btn")) {
    const id = Number(e.target.dataset.id);
    const spanId = `quantity-${id}`;
    const min = document.getElementById(`minus-btn-${id}`);
    incrementFun(min, spanId);
  }

  if (e.target.classList.contains("decrement-btn")) {
    const min = e.target;
    const id = Number(e.target.dataset.id);
    const spanId = `quantity-${id}`;
    decrementFun(min, spanId);
  }

  if (e.target.classList.contains("add-to-cart-btn")) {
    const id = Number(e.target.dataset.id);
    const spanEl = document.getElementById(`quantity-${id}`);
    const addedText = document.getElementById(`added-text-${id}`);
    const currentQuantity = Number(spanEl.textContent);
    cartInstance.addToCart([...products], id, currentQuantity);
    addedText.classList.remove("d-none");
    setTimeout(() => addedText.classList.add("d-none"), 1600);
    cartCount.textContent = cartInstance.getCartCount();
  }

});



cartCount.textContent = cartInstance.calculateTotalItemsInTheCart();


