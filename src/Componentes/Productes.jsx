import React, { useEffect, useState } from 'react'
import FeaturedProducts from './FeaturedProducts'
import { getCategories } from '../APIS/getCategories'
import { getProductsWithCategory } from '../APIS/getProducts'
import { Helmet } from 'react-helmet'

export default function Productes() {

  let [categoryByUl, setCategoryByUl] = useState([])
  let [Categories, setCategories] = useState([])
  let [loading, setLoading] = useState(false)
  let [msg, setMsg] = useState('')
  async function getCategoriesAPI() {
    let data = await getCategories()

    setLoading(true)
    if (data.data) {
      setCategories(data.data)
      setMsg('')
      setLoading(false)
    }
    else {
      setMsg(data)
      setLoading(false)
    }
  }

  useEffect(() => {
    getCategoriesAPI()
  }, [])

  async function getData(id) {
    let data = await getProductsWithCategory(id)
    setCategoryByUl(data.data)   

  }


  return (
    <div className='flex'>
      <ul className=' my-14 w-1/5 hidden md:block'>{Categories.map((ele) => <li className='hover:underline cursor-pointer px-6 py-1 ' onClick={() => getData(ele?._id)}>{ele?.name}</li>)}</ul>
      <div className='md:w-4/5 w-full'> <FeaturedProducts categoryProducts={categoryByUl} ></FeaturedProducts></div>
      <Helmet>
        <title>Products</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
    </div>
  )
}
