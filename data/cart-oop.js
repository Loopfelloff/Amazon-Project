import { renderPaymentSummary } from "../scripts/checkout/paymentSummary.js";
function Cart(localkey){

 const cart = {
   cartItems : undefined,


   loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(localkey));
    
    if(!this.cartItems){
      this.cartItems = [
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
    },
     saveToStorage(){
        localStorage.setItem(localkey , JSON.stringify(this.cartItems));
      },
        addToCart(button){
        const {productId} = button.dataset;
        let quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
        let tempItem;
        this.cartItems.forEach((item)=>{
         if(productId === item.productId){
             tempItem = item;
         }
        }) ;
        if(tempItem)
        {
         tempItem.quantity +=quantity;
        }
        else{
         this.cartItems.push({
             productId, 
             quantity,
             deliveryOptionId: '1' 
         });
        }
        console.log(this.cartItems);
        this.saveToStorage();
      },
       removeFromCart(buttonarr){
        buttonarr.forEach((button)=>{
      
          let newArr = [];
      button.addEventListener('click' , ()=>{
         const prodcutIdBtn = button.dataset.productId;
        this.cartItems.forEach((cartItem)=>{
          if(cartItem.productId !==prodcutIdBtn)
          {
            newArr.push(cartItem);
          }
        });
        this.cartItems= newArr;
        const toremove = document.querySelector(`.cart-item-container-${prodcutIdBtn}`);
        toremove.remove();
        renderPaymentSummary();
        this.saveToStorage();
      });
        });
       
        },
         removeFromCart(buttonarr){
          buttonarr.forEach((button)=>{
        
            let newArr = [];
        button.addEventListener('click' , ()=>{
           const prodcutIdBtn = button.dataset.productId;
          this.cartItems.forEach((cartItem)=>{
            if(cartItem.productId !==prodcutIdBtn)
            {
              newArr.push(cartItem);
            }
          });
          this.cartItems= newArr;
          const toremove = document.querySelector(`.cart-item-container-${prodcutIdBtn}`);
          toremove.remove();
          renderPaymentSummary();
          this.saveToStorage();
        });
          });
         
          },
           updateDeliveryOption(productId , deliveryOptionId)
  {
    let tempItem;
  this.cartItems.forEach((item)=>{
   if(productId === item.productId){
       tempItem = item;
   }
  });
  
  if (tempItem) {
    tempItem.deliveryOptionId = deliveryOptionId; // Update the delivery option for the matching item
    this.saveToStorage();
  } else {
    console.error(`Item with productId ${productId} not found in the cart.`);
  }
  }
  
      
};
return cart;
}
const cart = new Cart('cart-oop');
cart.loadFromStorage();
console.log(cart);


  
  