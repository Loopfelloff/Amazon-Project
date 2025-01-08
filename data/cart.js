export const cart = [
  {
    productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity : 2
  },{
productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
quantity:1
  }
];
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
  console.log(cart);
}