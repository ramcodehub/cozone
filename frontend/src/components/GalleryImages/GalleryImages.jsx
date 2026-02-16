import React from "react";
import "./GalleryImages.css";
import img from '../../assets/img/img.jpg'
// import img from '../../assets/img/imgn.jpg'

import img9 from '../../assets/img/tallern.jpg'
import image1 from '../../assets/img/CoZone_Workspace/WaitingChairs.jpg';
import image2 from '../../assets/img/CoZone_Workspace/DedicatedDesks.jpg';
import image3 from '../../assets/img/CoZone_Workspace/LogoDesk.jpg';
import image4 from '../../assets/img/CoZone_Workspace/Reception.jpg';
import image5 from '../../assets/img/ConferenceRoom.jpeg';
import image6 from '../../assets/img/OfficeRoom.jpeg';
import img1 from '../../assets/img/service-images/privatecabin4.jpg'
import img11 from '../../assets/img/service-images/custombuiltofficespace4.jpg'


import img169 from '../../assets/img/gallery/169.jpg';
import cine from '../../assets/img/gallery/cinescope2.jpg';
import img16999 from '../../assets/img/gallery/16999.jpeg';



const GalleryImages = () => {
  return (
    <div className="gallery-section container-fluid my-5 p-5 d-flex justify-content-center">
      <div className="gallery-wrapper">

        {/* Row 1 */}
        <div className="row gx-4 gy-4">
          <div className="col-md-4">
            <div className="gallery-block" data-aos="fade-right" data-aos-delay='400'>
                <img src={image3} alt="" />
            </div>
          </div>
          <div className="col-md-8">
            <div className="gallery-block" data-aos="fade-left" data-aos-delay='600'>
                <img src={img16999} alt="" />
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="row gx-4 gy-4 mt-2">
          <div className="col-md-8">
            <div className="row gx-4 gy-4">
              <div className="col-12">
                <div className="gallery-block" data-aos="fade-right">
                    <img src={image5} alt="" />
                </div>
              </div>
              <div className="col-6">
                <div className="gallery-block small" data-aos="fade-up">
                    <img src={image6} alt="" />
                </div>
              </div>
              <div className="col-6">
                <div className="gallery-block small" data-aos="fade-up" data-aos-delay='200'>
                    <img src={image4} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="gallery-block taller" data-aos="fade-left">
                <img src={img1} alt="" />
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
                    <img src={img9} alt="" />
                </div>
              </div>
              <div className="col-6">
                <div className="gallery-block tall" data-aos="fade-up" data-aos-delay='200'>
                    <img src={img11} alt="" />
                </div>
              </div>
            </div>
            <div className="row gx-4 gy-4 mt-2">
              <div className="col-12">
                <div className="gallery-block" data-aos="fade-up">
                    <img src={img169} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row gx-4 gy-4">
              <div className="col-12">
                <div className="gallery-block" data-aos="fade-left">
                    <img src={image1} alt="" />
                </div>
              </div>
              <div className="col-12 mt-4">
                <div className="gallery-block tallest" data-aos="fade-left">
                    <img src={image2} alt="" />
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
