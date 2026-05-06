import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import './App.css';
import Header from './components/Header/Header';

import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import About from './pages/About/About';
import Plans from './pages/Plans/Plans';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

//Imports for Services
import PrivateCabin from './pages/Services/PrivateCabin';
import DedicatedDesk from './pages/Services/DedicatedDesk';
import ConferenceRooms from './pages/Services/ConferenceRooms';
import VirtualZone from './pages/Services/VirtualZone';
import CustomBuiltOfficeSpaces from './pages/Services/CustomBuiltOfficeSpaces';
import DayPass from './pages/Services/DayPass';
import Gallery from './pages/Gallery/Gallery';
import Amenities from './pages/Amenities/Amenities';

import ErrorPage from './components/ErrorPage/ErrorPage';

// Floating UI Components
import FloatingWhatsApp from './components/FloatingWhatsApp/FloatingWhatsApp';
import FloatingCall from './components/FloatingCall/FloatingCall';
import ChatWidget from './components/Assistant/ChatWidget';

// SEO Utilities
import { updateMetaTags, pageSEOMetadata } from './utils/seoUtils';

function App() {
  const location = useLocation();
  
  useEffect(() => {
    // Update SEO metadata based on current route
    updateSEOMetadata(location.pathname);
    
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      document.querySelectorAll("[data-aos]").forEach(el => {
        el.removeAttribute("data-aos");
        el.removeAttribute("data-aos-delay");
        el.removeAttribute("data-aos-duration");
      });
    }

    AOS.init({
      duration: 650,
      once: true,
      easing: "ease-in-out",
    });

    AOS.refresh();
  }, [location]);
  
  // Update SEO metadata based on pathname
  const updateSEOMetadata = (pathname) => {
    let seoData;
    
    switch (pathname) {
      case '/':
        seoData = pageSEOMetadata.home;
        break;
      case '/about':
        seoData = pageSEOMetadata.about;
        break;
      case '/amenities':
        seoData = pageSEOMetadata.amenities;
        break;
      case '/plans':
        seoData = pageSEOMetadata.plans;
        break;
      case '/gallery':
        seoData = pageSEOMetadata.gallery;
        break;
      case '/day-pass':
        seoData = pageSEOMetadata.dayPass;
        break;
      case '/private-cabins':
        seoData = pageSEOMetadata.privateCabins;
        break;
      case '/dedicated-desk':
        seoData = pageSEOMetadata.dedicatedDesk;
        break;
      case '/conference-rooms':
        seoData = pageSEOMetadata.conferenceRooms;
        break;
      case '/virtual-zone':
        seoData = pageSEOMetadata.virtualZone;
        break;
      case '/custom-built-office':
        seoData = pageSEOMetadata.customBuiltOffice;
        break;
      default:
        seoData = pageSEOMetadata.home;
    }
    
    updateMetaTags(seoData);
  };

  return (
    <>
      <ScrollToTop />
      <Header />
      <div className='cozone'>
          <Routes>
          <Route path='*' element={<ErrorPage/>}/>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/amenities' element={<Amenities />} />
          <Route path='/plans' element={<Plans />} />
          <Route path='/gallery' element={<Gallery />} />

          {/* Service Pages */}
          <Route path='/day-pass' element={<DayPass />} />
          <Route path='/private-cabins' element={<PrivateCabin />} />
          <Route path='/dedicated-desk' element={<DedicatedDesk />} />
          <Route path='/conference-rooms' element={<ConferenceRooms />} />
          <Route path='/virtual-zone' element={<VirtualZone />} />
          <Route path='/custom-built-office' element={<CustomBuiltOfficeSpaces />} />
        </Routes>
      </div>
      <Footer />
      
      {/* Floating UI Components */}
      <FloatingCall />
      <FloatingWhatsApp />
      <ChatWidget />
    </>
  )
}

export default App;