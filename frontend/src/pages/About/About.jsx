import React from 'react'
import AboutHero from '../../components/AboutHero/AboutHero'
import Facilities from '../../components/Facilities/Facilities'
import ContactCard from '../../components/ContactCard/ContactCard'
import Img from '../../assets/img/contactcard.jpg'
import './About.css'

const About = () => {
  return (
    <div className='d-flex flex-column gap-2'>
        <AboutHero/>
        <div className='about'>
          <div className="mt-4">
          <h2 className="fw-bold">Our <span className='cursive-heading fs-1'>Mission</span></h2>
          <p className="fs-5" style={{ color: '#555' }}>
            To empower professionals with a productive, affordable, and inspiring workspace that encourages innovation, collaboration, and growth.
          </p>
          <p className="fs-5" style={{ color: '#555' }}>
            We strive to create an environment where individuals and teams can focus deeply, connect meaningfully, and access the tools they need to turn ideas into reality. By offering flexible solutions, modern amenities, and a supportive community, our mission is to make every workday more efficient, enjoyable, and purpose-driven.
          </p>
        </div>
        <div className="mt-4">
          <h2 className="fw-bold">Our <span className='cursive-heading fs-1'>Vision</span></h2>
          <p className="fs-5" style={{ color: '#555' }}>
            To build a vibrant community-led coworking environment that supports evolving workstyles and becomes the preferred hub for entrepreneurs, creators, and professionals.
          </p>
          <p className="fs-5" style={{ color: '#555' }}>
            We envision a future where people from diverse backgrounds come together to share knowledge, spark creativity, and grow their ventures. Our goal is to continuously adapt to changing work trends, cultivate a culture of openness and support, and establish a space that inspires long-term success, collaboration, and innovation for all.
          </p>
        </div>

        <Facilities/>
        <ContactCard heading='Join Us'
                     content="Whether you need a private cabin, a hot desk, or a meeting room, Co-Work Zone gives you the flexibility to work your way. Grow your business, build your network, and achieve more — all in a space designed for success."
                     image={Img}/>
        </div>
    </div>
  )
}

export default About 
