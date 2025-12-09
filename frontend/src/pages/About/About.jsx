import React from 'react'
import AboutHero from '../../components/AboutHero/AboutHero'
import Facilities from '../../components/Facilities/Facilities'
import ContactCard from '../../components/ContactCard/ContactCard'
import Img from '../../assets/img/contactcard.jpg'
import Service from '../../assets/img/wwa.png'
import './About.css'

const About = () => {
  return (
    <div className='d-flex flex-column gap-2'>
        <AboutHero/>
        <div className='about aboutt'>
          <div className='my-5' data-aos="fade-up">
             <h1 className='fw-bold my-2 cursive-heading text-black aft'>Who we are</h1>
            <div className="row gx-0 who-we-are pt-3 ps-3">
                <div className="col-lg-6 d-flex flex-column justify-content-center" >
                    <div className="content" >
                        <h2>Built for the Way You Work</h2>
                        <p className='fs-5'>
                            CoZone began with a simple belief — that the right environment can transform the way people work. What started as a compact creative space has now grown into a full-fledged coworking ecosystem supporting individuals, startups, and emerging businesses.
                            <br />Our journey is rooted in innovation, accessibility, and community. Every space we create reflects our commitment to comfort, productivity, and the evolving needs of modern professionals.
                        </p>
                    </div>
                </div>
            <div className="col-lg-6 d-flex align-items-center image-col">
                <img src={Service} className="img-fluid about-imgg" alt=""/>
            </div>
          </div>
          </div>

          <div className="mt-4" data-aos="fade-up">
          <h2 className="fw-bold aft">Our <span className='cursive-heading fs-1'>Mission</span></h2>
          <div className='ps-3'>
            <p className="fs-5" style={{ color: '#555' }}>
            To empower professionals with a productive, affordable, and inspiring workspace that encourages innovation, collaboration, and growth.
          </p>
          <p className="fs-5" style={{ color: '#555' }}>
            We strive to create an environment where individuals and teams can focus deeply, connect meaningfully, and access the tools they need to turn ideas into reality. By offering flexible solutions, modern amenities, and a supportive community, our mission is to make every workday more efficient, enjoyable, and purpose-driven.
          </p>
          </div>
        </div>
        <div className="mt-4" data-aos="fade-up">
          <h2 className="fw-bold aft">Our <span className='cursive-heading fs-1'>Vision</span></h2>
          <div className='ps-3'>
            <p className="fs-5" style={{ color: '#555' }}>
            To build a vibrant community-led coworking environment that supports evolving workstyles and becomes the preferred hub for entrepreneurs, creators, and professionals.
          </p>
          <p className="fs-5" style={{ color: '#555' }}>
            We envision a future where people from diverse backgrounds come together to share knowledge, spark creativity, and grow their ventures. Our goal is to continuously adapt to changing work trends, cultivate a culture of openness and support, and establish a space that inspires long-term success, collaboration, and innovation for all.
          </p>
          </div>
          <section class="py-4 values w-100">
          <div class="">
            <div class="row mb-2">
              <div class="col-lg-8" data-aos="fade-up">
                <h2 className="fw-bold aft">Our <span className='cursive-heading fs-1'>Values</span></h2>
                <p class="text-muted fs-5 ps-3">The principles that guide our community and workspace culture.</p>
              </div>
            </div>

            <div class="container row g-4 d-flex  align-items-center justify-content-center" >

              <div class="col-lg-4 col-md-6" data-aos="fade-up">
                <div class="p-4 h-100 border value-card rounded shadow-sm">
                  <i class="bi bi-shield-check fs-1 mb-3"></i>
                  <h3 class="fw-bold mb-2">Integrity</h3>
                  <p class="text-muted fs-6">
                    We believe in honesty, transparency, and accountability. Every interaction is rooted in trust.
                  </p>
                </div>
              </div>

              <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay='200'>
                <div class="p-4 h-100 border value-card rounded shadow-sm">
                  <i class="bi bi-people fs-1 mb-3"></i>
                  <h3 class="fw-bold mb-2">Collaboration</h3>
                  <p class="text-muted fs-6">
                    We value teamwork and open communication to create meaningful connections and shared success.
                  </p>
                </div>
              </div>

              <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay='400'>
                <div class="p-4 h-100 border value-card rounded shadow-sm">
                  <i class="bi bi-lightbulb fs-1 mb-3"></i>
                  <h3 class="fw-bold mb-2">Innovation</h3>
                  <p class="text-muted fs-6">
                    We embrace creativity and continuously explore better ways to enhance productivity and progress.
                  </p>
                </div>
              </div>

              <div class="col-lg-4 col-md-6" data-aos="fade-up" >
                <div class="p-4 h-100 border value-card rounded shadow-sm">
                  <i class="bi bi-heart fs-1 mb-3"></i>
                  <h3 class="fw-bold mb-2">Inclusivity</h3>
                  <p class="text-muted fs-6">
                    We foster a welcoming community where every individual feels respected and valued.
                  </p>
                </div>
              </div>

              <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay='200'>
                <div class="p-4 h-100 border value-card rounded shadow-sm">
                  <i class="bi bi-star fs-1 mb-3"></i>
                  <h3 class="fw-bold mb-2">Excellence</h3>
                  <p class="text-muted fs-6">
                    We strive for the highest quality in all our services and experiences to help everyone do their best work.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        </div>
        <Facilities/>
        </div>
        <ContactCard content="Whether you need a private cabin, a hot desk, or a meeting room, Co-Zone gives you the flexibility to work your way. Grow your business, build your network, and achieve more — all in a space designed for success."
                     image={Img}
                     action="scroll"/>
    </div>
  )
}

export default About 
