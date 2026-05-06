import React, { useState } from "react";
import Button from "../Button/Button";
import ServiceEnquiryModal from "../ServiceEnquiryModal/ServiceEnquiryModal";
import Img from '../../assets/img/contactcard.jpg'
import "./ContactCard.css";
import { useNavigate } from "react-router-dom";

const ContactCard = ({
  heading,
  content,
  image,
  action = "modal",
  serviceName
}) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (action === "modal") {
      setShowModal(true);
    }

    if (action === "scroll") {
      navigate("/#contact-form");

      setTimeout(() => {
        const el = document.getElementById("contact-form");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  };

  return (
    <>
      <div className="contact-card-bg">
        <div className="d-flex align-items-center shadow-lg contact-card gap-5 px-4 py-3">
        <div className="d-flex flex-column align-items-start gap-3">
          <h1 className="fw-bold">Join Us</h1>
          <p className="text-start text-white">{content}</p>

          <Button
            variant="primary"
            icon={<i className="bi bi-arrow-right"></i>}
            onClick={handleClick}
          >
            Get Started
          </Button>
        </div>

        <img src={image || Img} className="rounded-4" />
      </div>
      </div>

      
      <ServiceEnquiryModal
        show={showModal}
        onClose={() => setShowModal(false)}
        serviceName={serviceName || heading}
      />
    </>
  );
};

export default ContactCard;
