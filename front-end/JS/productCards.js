import { productsContainer } from "./index.js";
function addRating (filledStarNumber) {
  let starsContainer = "";
  for(let i = 0; i<5; i++){
    if(filledStarNumber > i){
      starsContainer += '<i class="fas fa-star" style="color: orange;"></i>';
    } else{
      starsContainer += '<i class="far fa-star" style="color: gray;"></i>';
    }
  }
  return starsContainer;
}

export function renderProducts(allProducts){
  productsContainer.innerHTML = "";
  allProducts.forEach(({name, imgSrc, rating, id, cents}) =>{
    productsContainer.insertAdjacentHTML("beforeend", ` <div class="col">
        <div class="card h-100 shadow">
          <img src="${imgSrc.imageFront}" class="card-img-top" alt="${name}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${name}</h5>
            <span class="card-text">${addRating(rating.stars)} ${rating.count}</span>
            <p class="card-text">$${(cents/ 100).toFixed(2)}</p>
            <div class="quantity-controls d-flex justify-content-center align-items-center mb-2" id="quantity-controls-${id}">
              <button class="btn btn-sm btn-primary decrement-btn" data-id="${id}" id="minus-btn-${id}">-</button>
              <span class="quantity mx-2" id="quantity-${id}">1</span>
              <button class="btn btn-sm btn-primary increment-btn" data-id="${id}">+</button>
            </div>
            <p class="added-text text-success text-center mb-1 d-none" id="added-text-${id}">Added to cart</p>
            <button class="btn btn-warning add-to-cart-btn mb-0" id="add-to-cart-${id}" data-id="${id}">Add to Cart</button>
          </div>
        </div>
      </div>`);
  })
}