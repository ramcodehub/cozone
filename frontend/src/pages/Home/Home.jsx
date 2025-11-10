import React from 'react'
import Hero from '../../components/Hero/Hero'
import './Home.css'
import Button from '../../components/Button/Button'

const Home = () => {
  return (
    <div className='home d-flex flex-column gap-2'>
      <Hero/>
      <Hero/>
    </div>
  )
}

export default Home
