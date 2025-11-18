import React from 'react'
import Hero from '../../components/Hero/Hero'
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs'
import Button from '../../components/Button/Button'
import Services from '../../components/Services/Services'
import ImageTextSection from '../../components/ImageTextSection/ImageTextSection'
import ContactForm from '../../components/ContactForm/ContactForm'
import './Home.css'
import GalleryImages from '../../components/GalleryImages/GalleryImages'

const Home = () => {
  return (
    <div className='home d-flex flex-column gap-2'>
      <Hero/>
      <WhyChooseUs/>
      <div>
        <ImageTextSection
        image="https://placehold.co/1500x800"
        title="Image on Left"
        text="This section displays the image on the left and text on the right."
        to='/about'
      />
      <ImageTextSection
        image="https://placehold.co/1500x800"
        title="Image on Right"
        text="This section displays the image on the left and text on the right."
        reverse={true}
      />
      </div>
      <Services/>
      <ContactForm/>
      {/* <GalleryImages/> */}
    </div>
  )
}

export default Home
