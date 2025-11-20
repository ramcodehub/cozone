import {useState, useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PricingCard from "../PricingCard/PricingCard";
import ServiceEnquiryModal from "../ServiceEnquiryModal/ServiceEnquiryModal";
import "./PricingPlans.css";

export default function PricingPlans({ plans }) {

  const pricingPlans= [
  {
    "heading": "Private Cabins",
    "navLink": "/private-cabins",
    "points": [
      "Lockable, private workspace",
      "Equipped with a 44-inch display screen",
      "High-Speed WiFi & Wired Internet",
      "Access to Conference & Training Rooms",
      "Ergonomic Chairs & Desks",
      "Charging Ports & 24/7 Power Backup",
      "Air Conditioning & Security Personnel"
    ]
  },
  {
    "heading": "Dedicated Desk / Hot Desk",
    "navLink": "/dedicated-desk",
    "points": [
      "Lockable, private workspace",
      "High-Speed WiFi & Wired Internet",
      "Access to Conference & Training Rooms",
      "Ergonomic Chairs & Desks",
      "Charging Ports & 24/7 Power Backup",
      "Air Conditioning & Security Personnel"
    ]
  },
  {
    "heading": "Day Pass",
    "navLink": "/day-pass",
    "points": [
      "Flexible, open workspace",
      "High-Speed WiFi & Wired Internet",
      "Access to Conference, Training & Meeting Rooms",
      "Ergonomic Chairs & Desks",
      "Charging Ports & 24/7 Power Backup",
      "Air Conditioning & Security Personnel"
    ]
  },
  {
    "heading": "Conference Rooms",
    "navLink": "/conference-rooms",
    "points": [
      "Bookable professional meeting rooms",
      "Equipped with a 32-inch display screen",
      "High-Speed WiFi & Wired Internet",
      "Access to Pantry & Drinking Water",
      "Air Conditioning & 24/7 Power Backup"
    ]
  },
  {
    "heading": "Communication / Virtual Zone",
    "navLink": "/virtual-zone",
    "points": [
      "Not for Company Registration or GST Filing",
      "Professional business address"
    ]
  },
  {
    "heading": "Custom-built Office Spaces",
    "navLink": "/custom-built-office",
    "points": [
      "Exclusively reserved floor with 100 seats",
      "Prime IT hub location in Doctors Colony, Madhapur",
      "Private floor with no co-working or shared zones",
      "Managed workspace with daily housekeeping"
    ]
  },
  
] 
   const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const handleEnquire = (serviceName) => {
    setSelectedService(serviceName);
    setShowModal(true);
  };
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="pb-5 pt-3">
      <div className="d-flex align-items-center justify-content-between swipe-btn mb-4">
        <h1 className="fw-bold">
          Our Pricing Plans <br /> <span className="cursive-heading">Choose What Fits You</span>
        </h1>

        <div className="d-flex gap-2 me-4">
          <button ref={prevRef} className="  bg-white rounded-circle" style={{padding:"1rem 1.25rem" }}>
            <i className="bi bi-arrow-left text-dark fs-4"></i>
          </button>
          <button ref={nextRef} className=" bg-white rounded-circle"  style={{ padding:"1rem 1.25rem"}}>
            <i className="bi bi-arrow-right text-dark fs-4"></i>
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={3}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 20 },
          480: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          992: { slidesPerView: 3, spaceBetween: 20 },
        }}
      >
        {pricingPlans.map((pricingPlan, idx) => (
          <SwiperSlide key={idx} className="d-flex align-items-stretch">
            <PricingCard
              heading={pricingPlan.heading}
              points={pricingPlan.points}
              navLink={pricingPlan.navLink}
               onEnquire={handleEnquire}
            />
            
          </SwiperSlide>
        ))}
      </Swiper>
       <ServiceEnquiryModal
        show={showModal}
        onClose={() => setShowModal(false)}
        serviceName={selectedService}
      />
    </div>
  );
}
