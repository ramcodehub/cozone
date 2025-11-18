import React, { useState } from "react";
import Button from "../Button/Button";
import ServiceEnquiryModal from "../ServiceEnquiryModal/ServiceEnquiryModal";
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
      <div className="d-flex align-items-center my-5 contact-card gap-5">
        <div className="d-flex flex-column align-items-start gap-3">
          <h1 className="fw-bold">{heading}</h1>
          <p className="text-start">{content}</p>

          <Button
            variant="primary"
            icon={<i className="bi bi-arrow-right"></i>}
            onClick={handleClick}
          >
            Get Started
          </Button>
        </div>

        <img src={image} className="rounded-4" />
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
