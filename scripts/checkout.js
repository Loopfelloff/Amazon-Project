import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch} from "../data/products.js";
import { loadCart } from "../data/cart.js";
 
Promise.all([
   
    loadProductsFetch(),
     new Promise((resolve)=>{
        loadCart(()=>{resolve('cart Loaded');});
    })
    
]).then((message)=>{
    console.log(message);
    renderOrderSummary();
    renderPaymentSummary();
});
