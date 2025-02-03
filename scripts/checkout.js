import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch} from "../data/products.js";
import { loadCart } from "../data/cart.js";


async function loadPage(){; 
    try{
    let [firstAwait , secondAwait] = await Promise.all([
        loadProductsFetch(),
        new Promise((resolve)=>{
            loadCart(()=>{resolve('cart Loaded');});
       })
    ]);
    console.log(firstAwait);
    console.log(secondAwait);
}
catch(error){
console.log(error);
}
   renderOrderSummary();
    renderPaymentSummary();
   return 'nextstep';
 }
 loadPage().then(message=>{
   console.log(message);
 });
// Promise.all([
   
//     loadProductsFetch(),
//      new Promise((resolve)=>{
//         loadCart(()=>{resolve('cart Loaded');});
//     })
    
// ]).then((message)=>{
//     console.log(message);
//     renderOrderSummary();
//     renderPaymentSummary();
// });
