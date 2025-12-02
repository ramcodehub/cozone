import React from "react";
import { Link } from "react-router-dom";   
import X from '../../assets/img/x.png'
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="text-white pt-5 " >
      <div className="">
        <div className="row gy-4 px-5 m-0">
          <div className="col-md-6 col-lg-3">
            <div
              className="p-4 text-white text-center rounded-4 shadow"
              style={{
                background: "var(--muted-navy)",
              }}
            >
              <h4 className="fw-bold mb-3">CoZone</h4>
              <p className="small mb-4">
                From concept to creation <br/> It all starts at CoZone.<br />
                Have any query? contact us we are here for you.
              </p>
              <div className="d-flex justify-content-center gap-3 social-media-links">
                <a href="#" className="text-white fs-5">
                  <img src={X} alt="" width='22px' className="mb-1" />
                </a>
                <a href="#" className="text-white fs-5">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="text-white fs-5">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href="#" className="text-white fs-5">
                  <i className="bi bi-youtube"></i>
                </a>
              </div>
            </div>
          </div>

          <div className=" col-md-6 col-lg-3 d-flex flex-column align-items-start justify-content-center">
            <h5 className="fw-semibold fs-3 mb-2">Get In Touch</h5>
            <ul className="list-unstyled small">
              <li className="mb-2 fs-6">
                <i className="bi bi-envelope me-2"></i> support@cozone.com
              </li>
              <li className="mb-2 fs-6">
                <i className="bi bi-telephone me-2"></i> +91 XXX XXX XXXX
              </li>
              <li className="fs-6">
                <i className="bi bi-geo-alt me-2"></i> Unit No: 7th Floor, Asian Sun City, B-Block, Kondapur, Hyderabad-500084
              </li>
            </ul>
          </div>

          <div className="col-md-12 col-lg-6 d-flex align-items-center justify-content-center fl links" style={{gap:'6rem'}}>
            <div> 
              <h3 className=" fw-bold mb-2">Insights</h3>
              <ul className="list-unstyled small mb-4">
                <li><Link to="/" className="text-decoration-none text-light fw-medium fs-6">Home</Link></li>
                <li><Link to="/about" className="text-decoration-none text-light fw-medium fs-6">About</Link></li>
                <li><Link to="/amenities" className="text-decoration-none text-light fw-medium fs-6">Amenities</Link></li>
                <li><Link to="/plans" className="text-decoration-none text-light fw-medium fs-6">Pricing</Link></li>
                <li><Link to="/gallery" className="text-decoration-none text-light fw-medium fs-6">Gallery</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="fw-semibold mt-3 mb-2">Services</h3>
              <ul className="list-unstyled small">
                <li><Link to="/private-cabins" className="text-decoration-none text-light fw-medium fs-6">Private Cabins</Link></li>
                <li><Link to="/dedicated-desk" className="text-decoration-none text-light fw-medium fs-6">Dedicated Desk</Link></li>
                <li><Link to="/day-pass" className="text-decoration-none text-light fw-medium fs-6">Day Pass</Link></li>
                <li><Link to="/conference-rooms" className="text-decoration-none text-light fw-medium fs-6">Conference Room</Link></li>
                <li><Link to="/virtual-zone" className="text-decoration-none text-light fw-medium fs-6">Virtual Zone</Link></li>
                <li><Link to="/custom-built-office" className="text-decoration-none text-light fw-medium fs-6">Custom-Built Office Spaces</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="mt-5"/>
        <div className="text-center fs-6 text-white pb-3">
          ©2025 All Rights Reserved. CoZone.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
