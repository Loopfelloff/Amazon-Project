import {formatCurrency} from '../scripts/utils/money.js';
export function getProduct(productId)
{
  let matchingProduct;
  products.forEach((product)=>{
      if(product.id === productId)
      {
          matchingProduct = product;
      }
  });
  return matchingProduct;
}
class Product{
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;
  constructor(productDetails){

    this.id = productDetails.id;
    this.name = productDetails.name;
    this.image = productDetails.image;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }
  getStarUrl(){
    return `images/ratings/rating-${this.rating.stars*10}.png`;
  }
  getPrice(){
    return `$${formatCurrency(this.priceCents)}`;
  }
  extraInfoHTML(){
    return '';
  }
}


class Clothing extends Product{
 constructor(productDetails)
 {
 super(productDetails);
 this.sizeChartLink = productDetails.sizeChartLink;
 }
 extraInfoHTML(){
  return `
  <a href="${this.sizeChartLink}" target="_blank">Size Chart</a>
  `
 }
}

export let products = [];
export function loadProducts(fun){
const xhr = new XMLHttpRequest();
xhr.open('GET' , 'https://supersimplebackend.dev/products' , true);
xhr.send();
xhr.addEventListener('load' , ()=>{
products = JSON.parse(xhr.response).map((productDetails)=>{
  if(productDetails.type === 'clothing')
  {
    return new Clothing(productDetails);
  }
return new Product(productDetails);
});
console.log('product load');
fun();
});

}
