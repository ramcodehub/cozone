import React from 'react'
import Hero from '../../components/Hero/Hero'
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs'
import Amenities from '../../assets/img/AmenitiesHero3.png'
import img from '../../assets/img/hero.jpg'
import GallerySection from '../../assets/img/gallerysection.jpg'
import HomeHero from '../../components/HomeHero/HomeHero'
import Services from '../../components/Services/Services'
import ImageTextSection from '../../components/ImageTextSection/ImageTextSection'
import ServiceSearch from '../../components/ServiceSearch/ServiceSearch'
import ContactForm from '../../components/ContactForm/ContactForm'
import Map from '../../components/Map/Map'
import './Home.css'

const Home = () => {
  return (
    <div className='home d-flex flex-column gap-2'>
      <div className='pb-5'>
        <div className='position-relative '>
          <HomeHero />
          <div className='search-positioning position-absolute p-5 rounded-4  margin-auto' style={{ bottom: '-25%', left: '50%', width: '63%', backgroundColor: 'white', transform: 'translate(-50%, -50%)' }}>
            <ServiceSearch className="w-100" />
          </div>
        </div>


      </div>
      <WhyChooseUs />
      <div>
        <ImageTextSection
          image="https://placehold.co/1500x800"
          title="Discover Who We Are"
          text="Learn about our mission, values, and the story behind our creative workspace. See how we designed CoZone to help individuals and teams work better, collaborate smarter, and grow faster."
          to='/about'
        />
        <ImageTextSection
          image={Amenities}
          title="Everything You Need to Work Better"
          text="Explore all the amenities that make your workday seamless—high-speed WiFi, meeting rooms, 24/7 power backup, ergonomic seating, refreshments, and much more. Designed for comfort, productivity, and creativity."
          reverse={true}
          to='/amenities'
        />
        <ImageTextSection
          image={GallerySection}
          title="Take a Look Inside"
          text="Browse our workspace gallery to see every corner of CoZone-private cabins, open desks, lounge areas, meeting spaces, and more. Get a visual feel of the environment before you visit."
          to='/gallery'
        />
      </div>
      <Services />
      <ContactForm />
      <Map />
    </div>
  )
}

export default Home
