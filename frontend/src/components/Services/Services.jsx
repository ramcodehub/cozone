import React from 'react'
import Service from '../../assets/img/services.jpg'
import Button from '../Button/Button'
import './Services.css'

const Services = () => {

  const servicesData = [
    {
      title: "Private Cabins for Focused Work",
      desc: "Enjoy complete privacy and peace in fully furnished cabins designed for productivity and comfort. Ideal for individuals or small teams."
    },
    {
      title: "Dedicated Desk / Hot Desk",
      desc: "Choose your perfect spot — a fixed desk for consistency or a flexible hot desk for on-the-go professionals. Work your way, every day."
    },
    {
      title: "Day Pass",
      desc: "Access coworking space for day with all amenities included. Perfect for freelancers, travelers, or anyone for productive workspace."
    },
    {
      title: "Conference Room",
      desc: "Host meetings, presentations, or interviews in a professional setting equipped with AV tools and high-speed internet. Book by the hour or day."
    },
    {
      title: "Communication / Virtual Zone",
      desc: "Get a professional business address, mail handling, and call services. Stay connected and maintain your corporate presence remotely."
    },
    {
      title: "Custom-Built Office Spaces (20–100 Seaters)",
      desc: "Design your ideal workspace tailored to your team’s size and needs. Scalable, private, and built to reflect your brand’s identity."
    }
  ];

  return (
    <div className=' py-5'>
      <h1 className='text-center fw-bold mb-4'>Services Built to Support Your&nbsp; <span className='cursive-heading' >Big Ideas</span></h1>

      <div className='row justify-content-center align-items-stretch g-3'>

        {servicesData.map((service, index) => (
          <div className='col-md-4 col-lg-4 card-two m-2 p-0' key={index}>
            <div className='image-wrapper'>
            <img src={Service} alt={service.title} />
            </div>
            <div className='w-100 card-two-content pt-2 pb-4 px-2'>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <Button variant="primary" icon={<i className="bi bi-arrow-right"></i>}>
                Learn More
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Services
