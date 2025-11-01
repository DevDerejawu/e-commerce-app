export class Cart {
  constructor() {
    this.taxRate = 0.15;
    this.cart = this.getItemsOutOfTheLocalStorage() || [];
  }

  saveCartToLocalStorage(){
    localStorage.setItem("cartItems", JSON.stringify(this.cart));
  }

  getItemsOutOfTheLocalStorage(){
    const savedCart = localStorage.getItem("cartItems");
    return savedCart? JSON.parse(savedCart): null;
  }

  addToCart(products, id, quantity) {
    const targetedProduct = products.find(
      (aSingleProduct) => aSingleProduct.id === id
    );
    console.log(targetedProduct);
    const isAlreadyAdded = this.cart.find(
      (item) => item.id === targetedProduct.id
    );
    if (isAlreadyAdded) {
      isAlreadyAdded.quantity += quantity;
    } else {
      this.cart.push({ ...targetedProduct, quantity, deliveryDate: "", shippingFee: 0  });
    }
    this.saveCartToLocalStorage();
  }
  getCartCount(){
    return this.cart.reduce((toQua, obj) => obj.quantity + toQua, 0)
  };

  calculateTotalItemsInTheCart(){
    return this.cart.reduce((totQua, obj) =>totQua + obj.quantity, 0);
  }

  calculateSubtotal() {
    return this.cart.reduce(
      (subtotal, item) => subtotal + (item.cents / 100) * item.quantity,
      0
    );
  }

  calculateShipping() {
    const price = this.cart.reduce((acummulator, obj) => acummulator + Number(obj.shippingFee), 0 );
    return price;
    
  }

  calculateTotalBeforeTax() {
    const subtotal = this.calculateSubtotal();
    const shipping = this.calculateShipping();
    return subtotal + shipping;
  }

  calculateTax() {
    const subtotal = this.calculateSubtotal();
    return subtotal * this.taxRate;
  }

  calculateTotal() {
    const subtotal = this.calculateSubtotal();
    const shipping = this.calculateShipping();
    const totalBeforeTax = this.calculateTotalBeforeTax();
    const tax = this.calculateTax();
    const total = totalBeforeTax + tax;
     
    return {subtotal, shipping, totalBeforeTax, tax, total};
    
  }

  filterItemForQuantityZeroUpdate(id){
    const itemForUpdate = this.cart.find((item) => item.id === id);
    if(itemForUpdate){
    itemForUpdate.quantity = 0;
    this.saveCartToLocalStorage();
    }
  }

  trashFun(id){
    const cartItemIndex = this.cart.findIndex(CartItem => CartItem.id === id);
    if(cartItemIndex >= 0){
      this.cart.splice(cartItemIndex, 1);
      this.saveCartToLocalStorage();
    }
  }
  
}

export const cartInstance = new Cart();
