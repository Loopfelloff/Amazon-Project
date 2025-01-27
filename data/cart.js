import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";
export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [
    {
      productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity : 2,
      deliveryOptionId: '1'
    }, {
  productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity:1,
  deliveryOptionId: '2'
    }
  ];
}

function saveToStorage(){
  localStorage.setItem('cart' , JSON.stringify(cart))
}
export function addToCart(button){
  const {productId} = button.dataset;
  let quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
  let tempItem;
  cart.forEach((item)=>{
   if(productId === item.productId){
       tempItem = item;
   }
  }) ;
  if(tempItem)
  {
   tempItem.quantity +=quantity;
  }
  else{
   cart.push({
       productId, 
       quantity,
       deliveryOptionId: '1' 
   });
  }
  console.log(cart);
  saveToStorage();
}

  export function removeFromCart(buttonarr){
  buttonarr.forEach((button)=>{

    let newArr = [];
button.addEventListener('click' , ()=>{
   const prodcutIdBtn = button.dataset.productId;
  cart.forEach((cartItem)=>{
    if(cartItem.productId !==prodcutIdBtn)
    {
      newArr.push(cartItem);
    }
  });
  cart= newArr;
  const toremove = document.querySelector(`.cart-item-container-${prodcutIdBtn}`);
  toremove.remove();
  renderPaymentSummary();
  saveToStorage();
});
  });
 
  }
  export function updateDeliveryOption(productId , deliveryOptionId)
  {
    let tempItem;
  cart.forEach((item)=>{
   if(productId === item.productId){
       tempItem = item;
   }
  });
  
  if (tempItem) {
    tempItem.deliveryOptionId = deliveryOptionId; // Update the delivery option for the matching item
    saveToStorage();
  } else {
    console.error(`Item with productId ${productId} not found in the cart.`);
  }
  }
  