import React from 'react'
import Hero from '../../components/Hero/Hero'
import WhyChooseUs from '../../components/WhyChooseUs/WhyChooseUs'
import img from '../../assets/img/hero.jpg'
import Button from '../../components/Button/Button'
import Services from '../../components/Services/Services'
import ImageTextSection from '../../components/ImageTextSection/ImageTextSection'
import ContactForm from '../../components/ContactForm/ContactForm'
import './Home.css'
import GalleryImages from '../../components/GalleryImages/GalleryImages'

const Home = () => {
  return (
    <div className='home d-flex flex-column gap-2'>
      <Hero  heading='Collaborate in Your Perfect Zone'
            content='Transform the way you work together. Cozone brings teams closer with seamless collaboration tools and modern workspace solutions.'
            image={img}/>
      <WhyChooseUs/>
      <div>
        <ImageTextSection
        image="https://placehold.co/1500x800"
        title="Discover Who We Are"
        text="Learn about our mission, values, and the story behind our creative workspace. See how we designed CoZone to help individuals and teams work better, collaborate smarter, and grow faster."
        to='/about'
      />
      <ImageTextSection
        image="https://placehold.co/1500x800"
        title="Everything You Need to Work Better"
        text="Explore all the amenities that make your workday seamless—high-speed WiFi, meeting rooms, 24/7 power backup, ergonomic seating, refreshments, and much more. Designed for comfort, productivity, and creativity."
        reverse={true}
        to='/amenities'
      />
      <ImageTextSection
        image="https://placehold.co/1500x800"
        title="Take a Look Inside"
        text="Browse our workspace gallery to see every corner of CoZone—private cabins, open desks, lounge areas, meeting spaces, and more. Get a visual feel of the environment before you visit."
        to='/gallery'
      />
      </div>
      <Services/>
      <ContactForm/>
      {/* <GalleryImages/> */}
    </div>
  )
}

export default Home
