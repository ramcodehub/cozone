import React from "react";
import "./GalleryImages.css";
import image1 from '../../assets/img/CoZone_Workspace/WaitingChairs.jpg';
import image2 from '../../assets/img/CoZone_Workspace/DedicatedDesks.jpg';
import image3 from '../../assets/img/CoZone_Workspace/LogoDesk.jpg';
import image4 from '../../assets/img/CoZone_Workspace/Reception.jpg';
import image5 from '../../assets/img/wwa.png';
import image6 from '../../assets/img/OfficeRoom.jpeg';
import imagei from '../../assets/img/cozone/IMG20260217153053.jpg';
import imageii from '../../assets/img/CoZone-Workspace_img/IMG_20260217_151335_154.jpg';
import image_r3_v1 from '../../assets/img/cozone/IMG20260217153315.jpg';
import image_r4_h1 from '../../assets/img/CoZone-Workspace_img/custom_built.jpg';
import image_r4_h2 from '../../assets/img/CoZone-Workspace_img/IMG_20260217_153435_428.jpg';
import cine from '../../assets/img/gallery/cinescope2.jpg';



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
              <img src={imageii} alt="" />
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
              <img src={imagei} alt="" />
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
                  <img src={image_r3_v1} alt="" />
                </div>
              </div>
              <div className="col-6">
                <div className="gallery-block tall" data-aos="fade-up" data-aos-delay='200'>
                  <img src={image_r4_h2} alt="" />
                </div>
              </div>
            </div>
            <div className="row gx-4 gy-4 mt-2">
              <div className="col-12">
                <div className="gallery-block" data-aos="fade-up">
                  <img src={image_r4_h1} alt="" />
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
