import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  return (
   <div className='min-h-screen flex flex-col'>
   <Navbar ></Navbar>
   <div className="container  flex-1">
    <Outlet></Outlet>
   </div>
   <Footer></Footer>
   </div>
  )
}
