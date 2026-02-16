import React from 'react'
import Button from '../Button/Button'
import PrivateCabin from '../../assets/img/service-images/privatecabin4.jpg'
import DedicatedDesk from '../../assets/img/service-images/dedicateddesk1.jpeg'
import ConferenceRoom from '../../assets/img/service-images/conferencerooms4.jpg'
import VirtualZone from '../../assets/img/service-images/virtualzone1.jpg'
import CustomBuiltSpaces from '../../assets/img/service-images/custombuiltofficespace4.jpg'
import DayPass from '../../assets/img/service-images/daypass2.jpg'
import './Services.css'

const Services = () => {

  const servicesData = [
    {
      title: "Private Cabins for Focused Work",
      desc: "Enjoy complete privacy and peace in fully furnished cabins designed for productivity and comfort. Ideal for individuals or small teams.",
      to : '/private-cabins',
      image : PrivateCabin ,
      AOSDelay : 0
    },
    {
      title: "Dedicated Desk / Hot Desk",
      desc: "Choose your perfect spot — a fixed desk for consistency or a flexible hot desk for on-the-go professionals. Work your way, every day.",
      to: '/dedicated-desk',
      image : DedicatedDesk ,
      AOSDelay : 200
    },
    {
      title: "Day Pass",
      desc: "Access coworking space for day with all amenities included. Perfect for freelancers, travelers, or anyone for productive workspace.",
      to: '/day-pass',
      image : DayPass ,
      AOSDelay : 400
    },
    {
      title: "Conference Room",
      desc: "Host meetings, presentations, or interviews in a professional setting equipped with AV tools and high-speed internet. Book by the hour or day.",
      to: '/conference-rooms',
      image : ConferenceRoom ,
      AOSDelay : 0
    },
    {
      title: "Communication / Virtual Zone",
      desc: "Get a professional business address, mail handling, and call services. Stay connected and maintain your corporate presence remotely.",
      to: '/virtual-zone',
      image : VirtualZone ,
      AOSDelay : 200
    },
    {
      title: "Custom-Built Office Spaces (20–100 Seaters)",
      desc: "Design your ideal workspace tailored to your team’s size and needs. Scalable, private, and built to reflect your brand’s identity.",
      to: '/custom-built-office',
      image : CustomBuiltSpaces ,
      AOSDelay : 400
    }
  ];

  return (
    <div className='container py-5'>
      <h1 className='text-center fw-bold mb-4' data-aos="fade-up">Services Built to Support Your&nbsp; <span className='cursive-heading' >Big Ideas</span></h1>

      <div className='row justify-content-center align-items-stretch '>

        {servicesData.map((service, index) => (
          <div className='col-md-4 col-lg-4 card-two m-2 p-0' key={index} data-aos="fade-up" data-aos-delay={service.AOSDelay}>
            <div className='image-wrapper'>
            <img src={service.image} alt={service.title} />
            </div>
            <div className='w-100 card-two-content p-2'>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <Button variant="primary" icon={<i className="bi bi-arrow-right"></i>} to={service.to}>
                Explore More
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services
