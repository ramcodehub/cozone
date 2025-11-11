import React from "react";
import "./CardComponent.css";

const CardComponent = ({ image, title, description }) => {
  return (
    <div className="custom-card">
      <img src={image} alt={title} className="card-img" />

      {/* Overlay container */}
      <div className="card-overlay">
        <div className="text-content">
          <h5 className="card-title">{title}</h5>
          <p className="card-description">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
