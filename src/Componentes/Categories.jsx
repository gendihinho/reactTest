import React, { useEffect, useState } from 'react'
import { getCategories } from '../APIS/getCategories'
import Slider from "react-slick";

export default function Categories() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1200, 
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 992, 
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 576, 
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            }
        ]
    };
    let [Categories, setCategories] = useState([])
    let [loading, setLoading] = useState(false)
    let [msg, setMsg] = useState('')
    async function getCategoriesAPI() {
        let data = await getCategories()

        setLoading(true)
        if (data.data) {
            setCategories(data.data)
            setMsg('')
            setLoading(false)
        }
        else {
            setMsg(data)
            setLoading(false)
        }
    }

    useEffect(()=>{
        getCategoriesAPI()
    },[])

  return (
  <div style={{overflow:'hidden'}}>
     <Slider {...settings} className='my-7' >
    {Categories.map(prod=><img key={prod?._id} className='h-[160px]' style={{objectFit:'cover'}} src={prod?.image}></img>)}
   </Slider>
  </div>
  )
}
