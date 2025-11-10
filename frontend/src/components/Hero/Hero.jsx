import React from 'react'
import img from '../../assets/img/hero.jpg'
import Button from '../Button/Button'
import './Hero.css'

const Hero = () => {
  return (
      <div className='px-3'>
        <section class="hero rounded-4">
        <img src={img} alt="Hero Image" class="hero-img" />
        <div className="overlay"></div>
        <div class="hero-text d-flex flex-column align-items-center">
            <h1>Collaborate in Your Perfect Zone</h1>
            <p>Transform the way you work together. Cozone brings teams closer with seamless collaboration tools and modern workspace solutions.</p>
            
        </div>
       </section>
      </div> 
  )
}

export default Hero
