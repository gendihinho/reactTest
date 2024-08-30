import React from 'react'
import useQueryWishlist from '../Hooks/useQueryWishlist'
import { deletewishlistApi, getwishlistApi } from '../APIS/wishListAPIs'
import Loading from './Loading'
import useMutationWishlist from '../Hooks/useMutationWishlist'
import useMutationCart from '../Hooks/useMutationCart'
import { addToCartApi } from '../APIS/catrAPIs'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet'


export default function WishList() {
  let { data, error, isError, isLoading } = useQueryWishlist('getwishlist', getwishlistApi)
  let { mutate: delMutate, status: delStatus, isPending: delPending } = useMutationWishlist(deletewishlistApi)
  let { mutate: addMutate, status, data:cartData  } = useMutationCart(addToCartApi)
  if (status === 'success') {
    toast.success(cartData?.data?.message)
  }
  if (isLoading || delPending)
    return <Loading></Loading>

  if (isError)
    return <h2>{error.message}</h2>

  


  return (
    <>


      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-7">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>

              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
               add to cart
              </th>
              <th scope="col" className="px-6 py-3 ">
                Action  <i className='fas fa-trash text-red-600'></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.data.map((ele) => <tr key={ele?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <img src={ele?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {ele?.title}
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {ele?.price} EGP
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              <button onClick={() => { addMutate(ele?._id) }} className="font-medium text-white  bg-green-600">add to cart</button>
              </td>
              <td className="px-6 py-4">
                <button onClick={() => { delMutate(ele?._id) }} className="font-medium text-white  bg-black">Remove</button>
              </td>
            </tr>)}


          </tbody>
        </table>
        <Helmet>
        <title>Wishlist</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
      </div>

    </>
  )
}
