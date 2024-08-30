import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import Loading from './Loading'
import { getBrandsApi } from '../APIS/brandsAPIs'
import useQueryCart from '../Hooks/useQueryCart'
import { Helmet } from 'react-helmet'


export default function Brands() {


  let { isError, error, isLoading, data} = useQueryCart('getbrands',getBrandsApi)

  console.log(data);
  if(isLoading)
    return <Loading></Loading>
  if (isError)
    return <h2>{error.message}</h2>
  return (
<>
<div>
      <h1 className='text-2xl text-center my-5 text-green-600'>All Brands</h1>
      <div className='row justify-center'>
        {data?.data?.map(ele=><div className='py-4 sm:w-1/2 md:w-1/4 text-center'>
        <div className='py-3'>
        <img src={ele.image} className='w-full text-center' alt="" />
        
        </div>
        </div>)}
      </div>
      <Helmet>
        <title>Brands</title>
        <meta name="description" content="Helmet application" />
    </Helmet>

    </div>
   
</>
    
    
  )
}
