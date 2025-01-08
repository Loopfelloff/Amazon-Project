export const cart = [];
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
       productId, // changes made here 
       quantity // changes made here 
   });
  }
}