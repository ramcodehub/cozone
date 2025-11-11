import React from 'react'
import './WhyChooseUs.css'

const WhyChooseUs = () => {
    const features = [
  {
    icon: "bi-grid-1x2",
    title: "Flexible Workspaces for Every Need",
    text: "From hot desks to private offices, choose the space that fits your style — and scale as your business grows."
  },
  {
    icon: "bi-people",
    title: "Inspiring Community & Networking",
    text: "Work alongside creators, freelancers, and entrepreneurs who motivate and support your journey."
  },
  {
    icon: "bi-lightning",
    title: "Modern Amenities & High-Speed Connectivity",
    text: "Enjoy 24/7 access, blazing-fast Wi-Fi, meeting rooms, printing, and great coffee — all under one roof."
  },
  {
    icon: "bi-geo-alt",
    title: "Prime Location & Easy Accessibility",
    text: "Be at the center of it all — close to transport, dining, and city life, making your workday smoother, smarter, and easier."
  },
  {
    icon: "bi-emoji-smile",
    title: "Productivity Meets Comfort",
    text: "A thoughtfully designed space that balances focus, creativity, and relaxation — so you can do your best work."
  }
];

  return (
    <div className='d-flex flex-column align-items-center py-4 my-4' style={{background:'#25B7A3'}}>
      <h1 className='text-white underline cursive'>Why Choose Us</h1>
      <div className="container">
        <div className="d-flex align-tems-center justify-content-center row g-4">
        {features.map((item, index) => (
            <div className=" col-md-6 col-lg-6 col-xl-4" key={index}>
            <div className="feature-card">
                <div className="circle">
                <i className={item.icon}></i>
                </div>
                <h1>{item.title}</h1>
                <p>{item.text}</p>
            </div>
            </div>
        ))}
        </div>
        </div>

    </div>
  )
}

export default WhyChooseUs
