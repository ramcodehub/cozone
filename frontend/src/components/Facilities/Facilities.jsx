import React from "react";
import CardComponent from "../CardComponent/CardComponent";
import Img1 from '../../assets/img/cafe.webp'
import Img2 from '../../assets/img/transport.jpg'
import Img3 from '../../assets/img/mall.jpg'
import Img4 from '../../assets/img/support.webp'
import "./Facilities.css";

const Facilities = () => {
  const facilitiesData = [
    {
      image: Img1,
      title: "Food & Cafés",
      description: "Enjoy a wide range of restaurants and cafés just steps away."
    },
    {
      image: Img2,
      title: "Transport Connectivity",
      description: "Well-connected with public transport for a smooth commute."
    },
    {
      image: Img3,
      title: "Sarath City Mall",
      description: "Shop, dine, and unwind at one of the city's largest malls."
    },
    {
      image: Img4,
      title: "Professional Support",
      description: "Access essential services and support for your business."
    }
  ];

  return (
    <section className="facilities-section">
      <h1 className="fw-bold facilities-heading">What’s Around Co-Work Zone</h1>
      <p className="facilities-desc">
        Our coworking space is located in a convenient, connected area 
        surrounded by everything you need:
      </p>
      <div className="facilities-grid">
        {facilitiesData.map((item, index) => (
          <CardComponent
            key={index}
            image={item.image}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Facilities;
