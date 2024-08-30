import axios from "axios";


export function getBrandsApi(){
 return   axios.get('https://ecommerce.routemisr.com/api/v1/brands')
}