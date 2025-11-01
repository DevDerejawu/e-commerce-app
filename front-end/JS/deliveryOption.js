import dayjs from "https://cdn.skypack.dev/dayjs";
export function deliveryOption(){
  const today = dayjs();
  const deliveryOptionAfterTwoDays = today.add(2, "day").format("dddd, MMMM D, YYYY");
  const deliveryOptionAfterFourDays = today.add(4, "day").format("dddd, MMMM D, YYYY");
  const deliveryOptionAfterSevenDays = today.add(7, "day").format("dddd, MMMM D, YYYY");
  const deliveryOptionAfterTenDays = today.add(10, "day").format("dddd, MMMM D, YYYY");
  return {deliveryOptionAfterTwoDays, deliveryOptionAfterFourDays, deliveryOptionAfterSevenDays, deliveryOptionAfterTenDays};
} 

// a function when we select the delivery option, it changes the delivery date.
export function updateDeliveryDate(id, parent){
  const dateText = parent.querySelector("label").textContent;
  const deliveryDate = document.querySelector(`.delivery-date-${id} span`);
  deliveryDate.textContent = dateText;
}

export function rightNow(){
   const today = dayjs();
   return today.format("dddd, MMMM D, YYYY");
}