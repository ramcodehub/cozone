import React from "react";
import Button from "../Button/Button";
import Img1 from '../../assets/img/img1.jpg'
import Img2 from '../../assets/img/img2.jpg'
import Img3 from '../../assets/img/img3.jpg'


import "./AboutHero.css";

const AboutHero = () => {
  return (
    <section className="about-hero">
      <div className="hero-left">
        <h2 className="hero-title">
          Crafting Inspiring <span className="cursive-heading" style={{fontSize:'5rem'}}>Environments</span>
        </h2>

        <p className="hero-desc">
          A space where you can focus, create, and grow. With flexible desks,
          private cabins, meeting rooms, and a supportive community, we make
          work feel effortless.
        </p>

        <Button variant="primary" icon={<i className="bi bi-arrow-right"></i>}>
            Get Started
        </Button>
      </div>

      <div className="hero-right">
        <div className="img-box img-2 shadow">
          <img src={Img3} alt="Workspace" />
        </div>
        <div className="img-box img-1 shadow">
          <img src={Img2} alt="Workspace" />
        </div>
        <div className="img-box img-3 shadow">
          <img src={Img1} alt="Workspace" />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
