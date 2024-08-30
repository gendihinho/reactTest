import axios from "axios";


let token = localStorage.getItem('userToken')
// add to wishList function
export function addTowishlistApi(productId){
 return   axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{productId},{headers:{token}})
}


// get wishList function 


export function getwishlistApi(){
 return   axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{headers:{token}})
}

//  delete item from wishList

export function deletewishlistApi(id){
    return   axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers:{token}})
   }