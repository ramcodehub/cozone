import React from "react";
import Button from "../Button/Button";

const ImageTextSection = ({
  image,
  title,
  text,
  reverse = false,
}) => {
  return (
    <div className="container my-4">
      <div
        className={`row align-items-center ${
          reverse ? "flex-md-row-reverse" : ""
        }`}
      >
        {/* Image Section (60%) */}
        <div className="col-12 col-md-7 mb-3 mb-md-0">
          <img
            src={image}
            alt={title}
            className="img-fluid w-100 rounded"
            style={{ objectFit: "cover", height: "100%" }}
          />
        </div>

        {/* Text Section (40%) */}
        <div className="col-12 col-md-5">
          <div className={`${reverse ? "pe-md-4" : "ps-md-4"}`}>
            <h1 className="fw-bold">{title}</h1>
            <p className="text-muted">{text}</p>
            <Button variant="primary" icon={<i className="bi bi-arrow-right"></i>}>
                Learn More
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageTextSection;
