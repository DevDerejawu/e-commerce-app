export function incrementFun(min, spanId){
      const spanEl = document.getElementById(spanId);
      let currentQuantity = Number(spanEl.textContent);
      currentQuantity++;
      spanEl.textContent = currentQuantity;
      if(currentQuantity >= 1){
        min.classList.remove("not-allowed");
      min.textContent = "-";
      }
    }

    export function decrementFun(min, spanId){
     const spanEl = document.getElementById(spanId);
     let currentQuantity = Number(spanEl.textContent);
     if(currentQuantity > 1){
      currentQuantity--;
      spanEl.textContent = currentQuantity;
     } else if(currentQuantity === 1){
      min.classList.add("not-allowed");
      min.textContent = "🚫";
     } 
    } 
