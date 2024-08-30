import { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './Componentes/Layout'
import Home from './Componentes/Home'
import Login from './Componentes/Login'
import Register from './Componentes/Register'
import Notfound from './Componentes/Notfound'
import Cart from './Componentes/Cart'
import Brands from './Componentes/Brands'
import ProtectedRoutee from './Componentes/ProtectedRoutee'
import AuthContextProvider, { AuthContext } from './contexts/AuthContext'
import Forget from './Componentes/Forget'
import ResetCode from './Componentes/ResetCode'
import NewpPassword from './Componentes/NewpPassword'
import ProductsDetails from './Componentes/ProductsDetails'
import Orders from './Componentes/Orders'
import WishList from './Componentes/WishList'

import { lazy } from 'react';
import Loading from './Componentes/Loading'

const  Productes = lazy(() => import('./Componentes/Productes'));

function App() {
 let routes= createHashRouter([{
    path:'/',element:<Layout></Layout>,children:[
      {index:true,element:<ProtectedRoutee><Home></Home></ProtectedRoutee>},
      {path:'/login',element:<Login></Login>},
      {path:'/register',element:<Register></Register>},
      {path:'/forget',element:<Forget></Forget>},
      {path:'/reset',element:<ResetCode></ResetCode>},
      {path:'/allorders',element:<Orders></Orders>},
      {path:'/newpassword',element:<NewpPassword></NewpPassword>},
      {path:'*',element:<Notfound></Notfound>},
      {path:'/productes',element:<ProtectedRoutee><Suspense fallback={<Loading></Loading>}><Productes></Productes></Suspense></ProtectedRoutee>},
      {path:'/productdetails/:id/:categoryid',element:<ProtectedRoutee><ProductsDetails></ProductsDetails></ProtectedRoutee>},
      {path:'/cart',element:<ProtectedRoutee><Cart></Cart></ProtectedRoutee>},
      {path:'/wishlist',element:<ProtectedRoutee><WishList></WishList></ProtectedRoutee>},
      {path:'/brands',element:<ProtectedRoutee><Brands></Brands></ProtectedRoutee>},
    ]
  }])

  return (

<AuthContextProvider>
     <RouterProvider router={routes} ></RouterProvider>
  </AuthContextProvider>

  )
}

export default App
