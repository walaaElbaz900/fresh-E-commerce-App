import React from 'react'
import Slider from '../components/Slider/Slider'
import Products from '../components/Products/Products'
import Navbar from '../components/Navbar/Navbar'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Slider />
    <Products />
    </div>
  )
}

export default Home
