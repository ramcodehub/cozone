import React from "react";
import "./GalleryImages.css";

import image1 from '../../assets/img/gallery/logo-desk.jpg';
import image2 from '../../assets/img/gallery/cafeteria.jpg';
import image3 from '../../assets/img/gallery/conference-room.jpg';
import image4 from '../../assets/img/gallery/office-room.jpeg';
import image5 from '../../assets/img/gallery/Reception.jpg';
import image6 from '../../assets/img/gallery/private-cabin.jpg';
import cine from '../../assets/img/gallery/cinescope2.jpg';
import image8 from '../../assets/img/gallery/custom-built2.jpg'
import image9 from '../../assets/img/gallery/dedicated-desk.jpg';
import image10 from '../../assets/img/gallery/waiting-chairs.jpg';
import image11 from '../../assets/img/gallery/custom-built.jpg';
import image12 from '../../assets/img/gallery/cafeteria2.jpg';



const GalleryImages = () => {
  return (
    <div className="gallery-section container-fluid my-5 p-5 d-flex justify-content-center">
      <div className="gallery-wrapper">

        {/* Row 1 */}
        <div className="row gx-4 gy-4">
          <div className="col-md-4">
            <div className="gallery-block" data-aos="fade-right" data-aos-delay='400'>
                <img src={image1} alt="" />
            </div>
          </div>
          <div className="col-md-8">
            <div className="gallery-block" data-aos="fade-left" data-aos-delay='600'>
                <img src={image2} alt="" />
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="row gx-4 gy-4 mt-2">
          <div className="col-md-8">
            <div className="row gx-4 gy-4">
              <div className="col-12">
                <div className="gallery-block" data-aos="fade-right">
                    <img src={image3} alt="" />
                </div>
              </div>
              <div className="col-6">
                <div className="gallery-block small" data-aos="fade-up">
                    <img src={image4} alt="" />
                </div>
              </div>
              <div className="col-6">
                <div className="gallery-block small" data-aos="fade-up" data-aos-delay='200'>
                    <img src={image5} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="gallery-block taller" data-aos="fade-left">
                <img src={image6} alt="" />
            </div>
          </div>
        </div>

        {/* Row 3 */}
        <div className="row gx-4 gy-4 mt-3">
          <div className="col-12">
            <div className="gallery-block wide" data-aos="fade-up">
                <img src={cine} alt="" />
            </div>
          </div>
        </div>

        {/* Row 4 */}
        <div className="row gx-4 gy-4 mt-2">
          <div className="col-md-8">
            <div className="row gx-4 gy-4">
              <div className="col-6">
                <div className="gallery-block tall" data-aos="fade-up">
                    <img src={image8} alt="" />
                </div>
              </div>
              <div className="col-6">
                <div className="gallery-block tall" data-aos="fade-up" data-aos-delay='200'>
                    <img src={image9} alt="" />
                </div>
              </div>
            </div>
            <div className="row gx-4 gy-4 mt-2">
              <div className="col-12">
                <div className="gallery-block" data-aos="fade-up">
                    <img src={image11} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row gx-4 gy-4">
              <div className="col-12">
                <div className="gallery-block" data-aos="fade-left">
                    <img src={image10} alt="" />
                </div>
              </div>
              <div className="col-12 mt-4">
                <div className="gallery-block tallest" data-aos="fade-left">
                    <img src={image12} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GalleryImages;
