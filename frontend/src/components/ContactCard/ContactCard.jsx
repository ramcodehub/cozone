import React from 'react'
import Button from '../Button/Button';
import './ContactCard.css'

const ContactCard =({heading, content, image }) => {
  return (
    <div className="d-flex align-items-center my-5 contact-card gap-5">
      <div className="d-flex flex-column align-items-start gap-3">
        <h1 className="fw-bold">{heading}</h1>
        <p className="text-start">{content}</p>
        <Button variant="primary" icon={<i className="bi bi-arrow-right"></i>}>
            Get Started
        </Button>
      </div>
      <img src={image} className="rounded-4" />
    </div>
  );
};

export default ContactCard
