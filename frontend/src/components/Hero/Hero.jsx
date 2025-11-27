import React from 'react'
import Button from '../Button/Button'
import './Hero.css'

const Hero = ({heading,content,image}) => {
  return (
      <div className='px-3'>
        <section class="hero rounded-4">
        <img src={image} alt="Hero Image" class="hero-img" />
        <div className="overlay"></div>
        <div class="hero-text d-flex flex-column align-items-center">
            <h1>{heading}</h1>
            <p>{content}</p>
            
        </div>
       </section>
      </div> 
  )
}

export default Hero
