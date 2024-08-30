import React from 'react'
import FeaturedProducts from './FeaturedProducts'
import Categories from './Categories'
import MainSlider from './MainSlider'
import { Helmet } from 'react-helmet'

export default function Home() {
  return (
    
    <div>
      <MainSlider></MainSlider>
      <Categories></Categories>
      <FeaturedProducts></FeaturedProducts>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Helmet application" />
    </Helmet>
    </div>
  )
}

