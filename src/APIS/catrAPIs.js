



 

import axios from "axios";


let token = localStorage.getItem('userToken')
// add to cart function
export function addToCartApi(productId){
 return   axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId},{headers:{token}})
}


// get cart function 


export function getCartApi(){
 return   axios.get('https://ecommerce.routemisr.com/api/v1/cart',{headers:{token}})
}

//  delete item from cart

export function deleteCartApi(id){
    return   axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers:{token}})
   }


//  update items in cart 


export function updateCartApi({id,count}){
    return   axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{headers:{token}})
   }

// clear cart

export function clearCartApi(){
    return   axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers:{token}})
   }
