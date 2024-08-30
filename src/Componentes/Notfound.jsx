import React from 'react'
import error from '../assets/finalProject assets/error.svg'

export default function Notfound() {
  return (
    <>
   <div className='text-center'>
   <h1>Not found</h1> 
   <img className='mx-auto' src={error} alt="" />
   </div>
    </>
  )
}
