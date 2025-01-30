import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts} from "../data/products.js";
import { loadCart } from "../data/cart.js";
 
Promise.all([
    new Promise((resolve)=>{

        loadProducts(()=>{
         resolve('products loaded');
        });
     }),
     new Promise((resolve)=>{
        loadCart(()=>{resolve('cart Loaded');});
    })
    
]).then((message)=>{
    console.log(message);
    renderOrderSummary();
    renderPaymentSummary();
});

// new Promise((resolve)=>{

//    loadProducts(()=>{
//     resolve('products loaded');
//    });
// }).then(message => {
//     console.log(message);

//     return new Promise((resolve)=>{
//         loadCart(()=>{resolve('cart Loaded');});
       
//     });
//    })
//     .then(message =>{
//         console.log(message);
//         renderOrderSummary();
//         renderPaymentSummary();
//      });
   

