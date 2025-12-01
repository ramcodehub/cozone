import React from "react";
import "./GalleryImages.css";
import img from '../../assets/img/img.jpg'
import img1 from '../../assets/img/tall.jpg'
import img2 from '../../assets/img/32.jpg'
import img3 from '../../assets/img/169.jpg'
import img4 from '../../assets/img/cricket.jpg'
import img5 from '../../assets/img/11.jpg'
import img6 from '../../assets/img/111.jpg'
import img7 from '../../assets/img/1111.jpg'
import img8 from '../../assets/img/tallest.jpg'
import img9 from '../../assets/img/taller.jpg'
import img10 from '../../assets/img/1699.jpg'
import img11 from '../../assets/img/16999.jpg'
import img12 from '../../assets/img/taller2.jpg'

const GalleryImages = () => {
  return (
    <div className="gallery-section container-fluid my-5 p-5 d-flex justify-content-center">
      <div className="gallery-wrapper">

        {/* Row 1 */}
        <div className="row gx-4 gy-4">
          <div className="col-md-4">
            <div className="gallery-block" data-aos="fade-right" data-aos-delay='400'>
                <img src={img2} alt="" />
            </div>
          </div>
          <div className="col-md-8">
            <div className="gallery-block" data-aos="fade-left" data-aos-delay='600'>
                <img src={img} alt="" />
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="row gx-4 gy-4 mt-2">
          <div className="col-md-8">
            <div className="row gx-4 gy-4">
              <div className="col-12">
                <div className="gallery-block" data-aos="fade-right">
                    <img src={img10} alt="" />
                </div>
              </div>
              <div className="col-6">
                <div className="gallery-block small" data-aos="fade-up">
                    <img src={img5} alt="" />
                </div>
              </div>
              <div className="col-6">
                <div className="gallery-block small" data-aos="fade-up" data-aos-delay='200'>
                    <img src={img6} alt="" />
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
                <img src={img4} alt="" />
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
                    <img src={img12} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="row gx-4 gy-4">
              <div className="col-12">
                <div className="gallery-block" data-aos="fade-left">
                    <img src={img7} alt="" />
                </div>
              </div>
              <div className="col-12 mt-4">
                <div className="gallery-block tallest" data-aos="fade-left">
                    <img src={img8} alt="" />
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
