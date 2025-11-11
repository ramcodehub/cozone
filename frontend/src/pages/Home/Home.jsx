import React from 'react'
import Hero from '../../components/Hero/Hero'
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs'
import Button from '../../components/Button/Button'
import Services from '../../components/Services/Services'
import ImageTextSection from '../../components/ImageTextSection/ImageTextSection'
import './Home.css'

const Home = () => {
  return (
    <div className='home d-flex flex-column gap-2'>
      <Hero/>
      <WhyChooseUs/>
      <ImageTextSection
        image="https://placehold.co/1500x800"
        title="Image on Left"
        text="This section displays the image on the left and text on the right."
      />
      <ImageTextSection
        image="https://placehold.co/1500x800"
        title="Image on Right"
        text="Passing reverse={true} flips the layout to show the image on the right."
        reverse={true}
      />
      <Services/>
    </div>
  )
}

export default Home
