import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/logoWithBg-removebg-preview.png";
import Button from "../Button/Button";
import MobileNavigation from "../MobileNavigation/MobileNavigation";
import "./Header.css";
import VirtualZone from '../../assets/img/CoZone_Workspace/Reception.jpg';
import ConferenceRooms from '../../assets/img/service-images/conferencerooms2.jpg';
import DayPass from '../../assets/img/service-images/daypass1.jpg';
import DedicatedDesk from '../../assets/img/service-images/dedicateddesk5.jpg';
import PrivateCabin from '../../assets/img/service-images/privatecabin1.jpg';
import CustomBuiltOfficeSpace from '../../assets/img/service-images/custombuiltofficespace1.jpg';

const servicesData = [

  {

    title: "Private Cabins",

    to: "/private-cabins",

    description:

      "Fully furnished private cabins ideal for startups and growing teams.",

    image: PrivateCabin,

  },

  {

    title: "Dedicated Desk",

    to: "/dedicated-desk",

    description:

      "Your own dedicated desk in a shared workspace with all amenities.",

    image: DedicatedDesk,

  },

  {

    title: "Day Pass",

    to: "/day-pass",

    description:

      "Flexible day passes for professionals who need a workspace on demand.",

    image: DayPass,

  },

  {

    title: "Conference Room",

    to: "/conference-rooms",

    description:

      "Fully equipped conference rooms for meetings and presentations.",

    image: ConferenceRooms,

  },

  {

    title: "Virtual Zone",

    to: "/virtual-zone",

    description:

      "Premium business address and virtual office services.",

    image: VirtualZone,

  },

  {

    title: "Custom-Built Office Spaces",

    to: "/custom-built-office",

    description:

      "Tailor-made office spaces designed to match your business needs.",

    image: CustomBuiltOfficeSpace,

  },

];


const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeService, setActiveService] = useState(null);
  const [megaOpen, setMegaOpen] = useState(true);


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setSticky(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 20) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`header d-flex align-items-center justify-content-between w-100 position-fixed
        ${sticky ? "fixed-header" : ""}
        ${visible ? "header-show" : "header-hide"}
      `}
    >
      <NavLink to="/" aria-label="CoZone Homepage">
        <img src={logo} alt="CoZone" />
      </NavLink>

      {/* DESKTOP NAV */}
      <nav className="d-none d-lg-flex header-nav">
        <ul className="list-unstyled m-0 p-0 d-flex gap position-relative">
          <li><NavLink className="d-flex align-items-baseline text-decoration-none fw-medium header-link" to="/" aria-label="Homepage">Home</NavLink></li>
          <li><NavLink className="d-flex align-items-baseline text-decoration-none fw-medium header-link" to="/about" aria-label="About CoZone">About</NavLink></li>
          <li><NavLink className="d-flex align-items-baseline text-decoration-none fw-medium header-link" to="/amenities" aria-label="Amenities at CoZone">Amenities</NavLink></li>
          <li
            className="mega-parent"
            onMouseEnter={() => setMegaOpen(true)}
          >
            <span className="d-flex align-items-baseline text-decoration-none fw-medium header-link ">Services</span>

            <div className={`mega-menu ${!megaOpen ? "force-hide" : ""}`}>

              <div
                className="mega-inner"
                onMouseLeave={() => setActiveService(null)}
              >
                {/* LEFT */}
                <div className="mega-left " style={{ borderRight: '1px solid grey' }}>
                  <h3>Our Services</h3>
                  <ul className="list-unstyled">
                    {servicesData.map((service) => (
                      <li
                        key={service.title}
                        onMouseEnter={() => setActiveService(service)}
                      >
                        <NavLink to={service.to} onClick={() => setMegaOpen(false)}>
                          {service.title}
                        </NavLink>
                        <i className="bi bi-chevron-right fs-6 pe-3"></i>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CENTER */}
                {activeService && (
                  <div className="mega-center d-flex flex-column justify-content-center">
                    {activeService && (
                      <img
                        src={activeService.image}
                        alt={activeService.title}
                      />
                    )}
                  </div>
                )}
                {/* RIGHT */}
                <div className="mega-right d-flex flex-column justify-content-center">
                  {!activeService ? (
                    <div className=" d-flex flex-column align-items-start " style={{ width: '400px' }}>
                      <h4>Explore Our Services</h4>
                      <p>
                        Discover thoughtfully designed workspaces and services tailored to support productivity, collaboration, and growth. Whether you’re a freelancer, startup, or growing team, we provide a professional environment that adapts to your business needs.
                      </p>
                    </div>
                  ) : (
                    <div className="">
                      <h4>{activeService.title}</h4>
                      <p>{activeService.description}</p>
                      <Button variant="primary"
                        to={activeService.to}
                        icon={<i className="bi bi-arrow-right"></i>}
                        onClick={() => setMegaOpen(false)}
                      >
                        Explore More
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </li>
          <li>
            <NavLink className="d-flex align-items-baseline text-decoration-none fw-medium header-link" to="/plans" aria-label="CoZone Gallery">Plans</NavLink>
          </li>
          <li>
            <NavLink className="d-flex align-items-baseline text-decoration-none fw-medium header-link" to="/gallery" aria-label="CoZone Gallery">GalleryZone</NavLink>
          </li>
        </ul>
      </nav>

      {/* MOBILE */}
      <div className="d-lg-none">
        <MobileNavigation />
      </div>

      <Button variant="secondary" className="navBar-Btn d-none d-lg-flex" scrollToForm>
        Get Started
      </Button>
    </header>
  );
};

export default Header;
