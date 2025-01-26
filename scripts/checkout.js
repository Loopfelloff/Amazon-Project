import {cart , removeFromCart, updateDeliveryOption} from '../data/cart.js';
import {products} from '../data/products.js';
import  formatCurrency  from './utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../data/deliveryOptions.js';
const today = dayjs();
const deliveryDate = today.add(7 , 'day')
deliveryDate.format('dddd , MMMM D');
let cartSummaryHTML = '';
export function displayItems()
{
console.log(cart);
cart.forEach((cartItem)=>{
  const {productId} = cartItem;
  const {quantity} = cartItem;
  let matchingProduct;
  products.forEach((product)=>{
      if(product.id === productId)
      {
          matchingProduct = product;
      }
  });
  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;
  deliveryOptions.forEach((option)=>{
  if(option.id === deliveryOptionId)
  {
  deliveryOption = option;
  }
  });
  const today = dayjs();
  const deliveryDate = today.add(
    deliveryOption.deliveryDays,
    'days'
  );
  const dateString = deliveryDate.format('dddd, MMMM D');

cartSummaryHTML +=    
`
<div class="cart-item-container-${productId}">
          <div class="delivery-date">
            Delivery date: ${dateString}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
                }
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-btn" data-product-id = "${productId}" >
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(matchingProduct , cartItem)}
            </div>
          </div>
        </div>
`;

});

function deliveryOptionsHTML(matchingProduct , cartItem){
let html = '';
deliveryOptions.forEach(deliveryOptions => {
const today = dayjs();
const deliveryDate = today.add(
  deliveryOptions.deliveryDays,
  'days'
);
const dateString = deliveryDate.format('dddd, MMMM D');
const priceString = deliveryOptions.priceCents === 0
? 'FREE'
: `$${formatCurrency(deliveryOptions.priceCents)} - `;
const isChecked = deliveryOptions.id === cartItem.deliveryOptionId;
html +=
`
  <div class="delivery-option js-delivery-option"
  data-product-id = "${matchingProduct.id}"
  data-delivery-option-id= "${deliveryOptions.id}">
                <input type="radio" ${isChecked ?  'checked' : ''}
                  class="delivery-option-input"
                  name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    ${dateString}
                  </div>
                  <div class="delivery-option-price">
                    ${priceString} Shipping
                  </div>
                </div>
              </div>
`;
});
return html;
}
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
}
displayItems();
let buttonarr = document.querySelectorAll('.js-delete-btn');
removeFromCart(buttonarr);
document.querySelectorAll('.js-delivery-option')
.forEach((element)=>{
element.addEventListener('click' , ()=>{
  console.log(
    'hi'
  );

  const { deliveryOptionId , productId} = element.dataset;
  updateDeliveryOption(productId , deliveryOptionId);
  
});
});