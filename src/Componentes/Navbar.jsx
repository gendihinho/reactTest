import React, { useContext, useState } from 'react'
import logo from '../assets/finalProject assets/freshcart-logo.svg'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export default function Navbar() {
  let [open, setOpen] = useState(false)
  let {login,setLogin}=useContext(AuthContext)
  let navigate=useNavigate()
function toggle(){
  setOpen(!open)
}
function logout(){
  localStorage.removeItem('userToken')
  setLogin('')
  navigate('/login')
}

  return (
   <div className='bg-main-light'>
     <nav className=' bg-main-light w-full container'>
      <div className="py-2 md:flex justify-between items-center relative ">

        <div> <img src={logo} width={120} alt="" /></div>
        <div className='md:flex gap-2 '>
         
         {login?  <ul className={`md:flex gap-4 ${open?'hidden':'block'}`}>
            <li><NavLink to={'/'}>home</NavLink></li>
            <li><NavLink to={'/cart'}>cart</NavLink></li>
            <li><NavLink to={'/productes'}>products</NavLink></li>
            <li><NavLink to={'/brands'}>brands</NavLink></li>
            <li><NavLink to={'/wishlist'}>wishlist</NavLink></li>
          </ul>:''}
          <div className='md:hidden block'><i onClick={toggle} className={`fas  fa-2x   absolute top-0 right-2 cursor-pointer ${open?'fa-bars':'fa-close'}`}></i></div>
        </div>
        <div className=''>
          <ul className={ `md:flex gap-4 ${open?'hidden':'block'} `}>
            
           {login? <>
            <li className='cursor-pointer' onClick={logout}>Logout  </li>
            <li className='flex gap-3 '>
              <a href="" ><i className='fab fa-facebook-f'></i></a>
              <a href="" ><i className='fab fa-google'></i></a>
              <a href="" ><i className='fab fa-twitter'></i></a>
              <a href="" ><i className='fab fa-instagram'></i></a>
            </li>
           </>:<>
            <li><NavLink to={'/login'}>login</NavLink></li>
            <li><NavLink to={'/register'}>register</NavLink></li>
        
           </>}
          </ul>
        </div>
      </div>
    </nav>
   </div>
  )
}
