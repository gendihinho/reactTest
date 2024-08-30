import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useMutationCart from '../Hooks/useMutationCart'
import { addToCartApi } from '../APIS/catrAPIs'
import { toast } from 'react-toastify'
import { date } from 'yup'
import useMutationWishlist from '../Hooks/useMutationWishlist'
import { addTowishlistApi, deletewishlistApi } from '../APIS/wishListAPIs'

export default function Item({ ele }) {
  
  let { mutate: addMutate, status, data } = useMutationCart(addToCartApi)
  let { mutate: addwishlistMutate, data: wishlistData, status: wishlistStatus } = useMutationWishlist(addTowishlistApi)
  let { mutate: delMutate, status: delStatus, isPending: delPending, data:delData } = useMutationWishlist(deletewishlistApi)

  useEffect(() => {
    if (status === 'success') {
      toast.success(data?.data?.message);
    }
  }, [status, data]);

  useEffect(() => {
    if (wishlistStatus === 'success') {
      toast.success(wishlistData?.data?.message);
    }
  }, [wishlistStatus, wishlistData]);

  useEffect(() => {
    if (delStatus === 'success') {
      toast.info(`${delData?.data?.message}  `);
    }
  }, [delStatus, delData]);


  const [flag, setFlag] = useState(() => {
    const savedFlag = localStorage.getItem(`flag-${ele._id}`);
    return savedFlag === 'true'; 
  });

  useEffect(() => {
    localStorage.setItem(`flag-${ele._id}`, flag);
  }, [flag, ele._id]);




  return (
    <div className='md:w-1/4 sm:w-1/2 '>
      <div className="product p-2 cursor-pointer   hover:border-green-600 hover:border-2 hover:transition-all hover:duration-100" >
        <Link to={`/productdetails/${ele?._id}/${ele?.category?._id}`}>
          <img src={ele?.imageCover} className='w-full' alt="" />
          <p className='text-green-600'>{ele?.category.name}</p>
          <p className='line-clamp-1'>{ele.title}</p>
          <div className='flex justify-between my-3'>
            <p>{ele.price} EGP</p>
            <p> {ele?.ratingsAverage} <i className='fas fa-star text-yellow-400'> </i></p>
             
          </div>
        </Link>
        <div className='flex justify-between'>
          <button onClick={() => addMutate(ele?._id)} className='bg-green-600 text-white p-2 btn'>Add To Cart </button>
          <i onClick={() => { {flag?delMutate(ele?._id) : addwishlistMutate(ele?._id)} setFlag(!flag) }} className={`fas  bg-white text-green-600  mr-2 mt-3 text-2xl ${flag ? 'fa-heart' : ' fa-heart-broken'} `}></i>
        </div>
      </div>

    </div>
  )
}
