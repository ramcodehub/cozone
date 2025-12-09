import React from "react";
import Button from "../Button/Button";
import Img1 from '../../assets/img/img1.jpg'
import Img2 from '../../assets/img/img22.webp'
import Img3 from '../../assets/img/img3.jpg'


import "./AboutHero.css";

const AboutHero = () => {
  return (
    <section className="about-hero">
      <div className="hero-left">
        <h2 className="hero-title" data-aos="fade-up">
          Crafting Inspiring <span className="cursive-heading" style={{fontSize:'5rem'}}>Environments</span>
        </h2>

        <p className="hero-desc" data-aos="fade-up" data-aos-delay='200'>
          A space where you can focus, create, and grow. With flexible desks,
          private cabins, meeting rooms, and a supportive community, we make
          work feel effortless.
        </p>

        <Button variant="primary" icon={<i className="bi bi-arrow-right"></i>} scrollToForm  data-aos="fade-up" data-aos-delay='400'>
            Get Started
        </Button>
      </div>

      <div className="hero-right" >
        <div className="img-box img-2 shadow" data-aos="fade-right">
          <img src={Img3} alt="Workspace" />
        </div>
        <div className="img-box img-1 shadow" data-aos="fade-left" data-aos-delay='600'>
          <img src={Img2} alt="Workspace" />
        </div>
        <div className="img-box img-3 shadow" data-aos="fade-down" data-aos-delay='300'>
          <img src={Img1} alt="Workspace" />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
