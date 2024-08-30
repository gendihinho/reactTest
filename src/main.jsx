import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify'


const queryClient = new QueryClient({defaultOptions:{queries:{gcTime:40000}}})
ReactDOM.createRoot(document.getElementById('root')).render(
  
  
<QueryClientProvider client={queryClient}>
  <ToastContainer autoClose={3000}></ToastContainer>
    <App />
</QueryClientProvider>
  
)
