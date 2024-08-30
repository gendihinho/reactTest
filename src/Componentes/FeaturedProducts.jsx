import React, { useEffect, useState } from 'react'
import { getProducts } from '../APIS/getProducts'
import Loading from './Loading'
import Item from './Item'


export default function FeaturedProducts({categoryProducts}) {
   
   
    let [productsArr, setProductsArr] = useState([])
   
    let [loading, setLoading] = useState(false)
    let [msg, setMsg] = useState('')

    async function getProductsAPI() {
        setLoading(true)
        let data = await getProducts()
        if (data.data) {   
         setProductsArr(data.data)
         setMsg('')
         setLoading(false)
        }
        else {
         setMsg(data)
         setLoading(false)
        }
    }

    useEffect(() => {
        getProductsAPI()
    }, [])


    let [searchArr, setSearchArr] = useState([])
    function searchFun(e){
        let term=e.target.value;
         setSearchArr( productsArr.filter(ele=>ele.title.toLowerCase().includes(term.trim().toLowerCase())))
        console.log(searchArr);
  
    }
    if(loading){
        return <Loading></Loading>
    }
    if(msg){
        return <h2 className='my-3 font-bold text-red-600'>{msg}</h2>
    }
   

    return (
       <>
      <form class="max-w-md mx-auto my-10">   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" onChange={searchFun} id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search "  />
    </div>
</form>
       <div className='row'> 
       { searchArr?.length > 0? (searchArr.map(prod => <Item key={prod?._id} ele={prod} />)) : categoryProducts?.length> 0  ? ( categoryProducts.map(prod => <Item key={prod?._id} ele={prod} />)) : (productsArr.map(prod => <Item key={prod?._id} ele={prod} />))
}

       </div>
       </>
    )
}
