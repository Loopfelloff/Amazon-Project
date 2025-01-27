import {addToCart,cart} from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
describe('test suit: addToCart' ,()=>{
  it('adds an existing product to the crat', ()=>{
    spyOn(localStorage , 'getItem').and.callFake(()=>{
        return JSON.stringify([
            {
                productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                deliveryOptionId: '1',
                
            }
        ])
    });
  });
});
