import React from 'react'
import Hero from '../../components/Hero/Hero'
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs'
import Button from '../../components/Button/Button'
import './Home.css'

const Home = () => {
  return (
    <div className='home d-flex flex-column gap-2'>
      <Hero/>
      <WhyChooseUs/>
    </div>
  )
}

export default Home
