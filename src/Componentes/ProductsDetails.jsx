import React, { useEffect, useState } from 'react'
import { getDetails } from '../APIS/getDetails'
import { useParams } from 'react-router-dom'
import { motion } from "framer-motion";
import { getProductsWithCategory } from '../APIS/getProducts';
import Item from './Item';
import Loading from './Loading';
import useMutationCart from '../Hooks/useMutationCart';
import { addToCartApi } from '../APIS/catrAPIs';
import { toast } from 'react-toastify';

export default function ProductsDetails() {

    let  {mutate:addMutate,status,data}=useMutationCart(addToCartApi)
    if(status==='success'){
      toast.success(data?.data?.message)
      
    }
  
    
    let { id, categoryid } = useParams()
    let [imgSrc, setImgSrc] = useState('')
    let [relatedProducts, setRelatedProducts] = useState([])
    let [product, setProduct] = useState([])
    let [loading, setLoading] = useState(false)
    let [msg, setMsg] = useState('')
    async function getDetailsAPI() {
        let data = await getDetails(id)

        setLoading(true)
        if (data.data) {
            setProduct(data.data)
            setMsg('')
            setLoading(false)
        }
        else {
            setMsg(data)
            setLoading(false)
        }
    }
    async function getProductsWithCategoryAPI() {
        let data = await getProductsWithCategory(categoryid)

        setLoading(true)
        if (data.data) {
            setRelatedProducts(data.data)
            setMsg('')
            setLoading(false)
        }
        else {
            setMsg(data)
            setLoading(false)
        }
    }


    useEffect(() => {
        getDetailsAPI()
        getProductsWithCategoryAPI()
    }, [])

    useEffect(()=>{
        getDetailsAPI()
    },[id])

    function changeImgSrc(e) {
        setImgSrc(e.target.src)
    }
    if(loading){
      return  <Loading></Loading>
    }
    

    return (
        <div className='row items-center container py-6 sm:gap-0 gap-10'>
            <div className='sm:w-1/3'>
                <img src={imgSrc ? imgSrc : product.imageCover} className='w-full' alt="" />
                <ul className='flex justify-center my-5 gap-4'>
                    {product?.images?.map(img => <li><motion.img className='cursor-pointer ' src={img} onClick={changeImgSrc} whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} width={80} alt="" /></li>)}
                </ul>
            </div>
            <div className='sm:w-2/3 pl-5'>
                <p className='text-green-600'>{product?.category?.name}</p>
                <p>{product?.title}</p>
                <p className='font-thin'>{product?.description}</p>
                <div className='flex justify-between my-3'>
                    <p>{product.price} EGP</p>
                    <p> {product?.ratingsAverage} <i className='fas fa-star text-yellow-400 mr-5'> </i></p>
                </div>
                <button onClick={()=>addMutate(product?._id)} className='bg-green-600 text-white p-2 btn'>Add To Cart </button>
            </div>
            {relatedProducts.map(prod=><Item ele={prod} key={prod._id}></Item>)}
        </div>
    )
}
