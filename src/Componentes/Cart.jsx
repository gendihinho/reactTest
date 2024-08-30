import React from 'react'
import useQueryCart from '../Hooks/useQueryCart'
import { clearCartApi, deleteCartApi, getCartApi, updateCartApi } from '../APIS/catrAPIs'
import Loading from './Loading'
import useMutationCart from '../Hooks/useMutationCart'
import cartImage from '../assets/finalProject assets/images/empty-cart.png'
import BasicModal from './BasicModal'
import { Helmet } from 'react-helmet'

export default function Cart() {
  let { isError, error, isLoading, data } = useQueryCart('getCart', getCartApi)
  let { mutate: delMutate, status: delStatus, isPending: delPending } = useMutationCart(deleteCartApi)
  let { mutate: updateMutate, status: updateStatus, isPending: updatePending } = useMutationCart(updateCartApi)
  let { mutate: clearMutate, status: clearStatus, isPending: clearPending } = useMutationCart(clearCartApi)


  if (isLoading || updatePending || delPending || clearPending)
    return <Loading></Loading>

  if (isError)
    return <h2>{error.message}</h2>

  if (!data?.numOfCartItems)
    return <div className='my-10 flex flex-col items-center'>
      <h1 className='my-6'>Your Cart is Empty </h1>
      <img className='w-1/4 object-cover' src={cartImage} alt="" />
    </div>

  return (
    <>

      <div className='md:flex justify-between'>
        <div>
          <h1 className='text-xl my-5'>Total Cart Items : <span className='text-xl text-green-600'>{data?.numOfCartItems}</span></h1>
          <h1 className='text-xl my-5'>Total Cart Price : <span className='text-xl text-green-600'>{data?.data?.totalCartPrice} EGP</span></h1>
        </div>
        <div>
          <button onClick={() => { clearMutate() }} className="font-medium text-white  bg-red-600 text-right my-5 px-10">Clear Cart</button>
        </div>
      </div>

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
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3 ">
                Action  <i className='fas fa-trash text-red-600'></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.products?.map((ele) => <tr key={ele?.product?._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <img src={ele?.product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {ele?.product?.title}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <button onClick={() => { updateMutate({ id: ele?.product?._id, count: ele?.count - 1 }) }} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                    </svg>
                  </button>
                  <div>
                    <span>{ele?.count}</span>
                  </div>
                  <button onClick={() => { updateMutate({ id: ele?.product?._id, count: ele?.count + 1 }) }} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                    <span className="sr-only">Quantity button</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {ele?.price} EGP
              </td>
              <td className="px-6 py-4">
                <button onClick={() => { delMutate(ele?.product?._id) }} className="font-medium text-white  bg-black">Remove</button>
              </td>
            </tr>)}


          </tbody>
        </table>
      </div>
      <BasicModal cartId={data?.data?._id}></BasicModal>
      <Helmet>
        <title>Cart</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
    </>
  )
}
