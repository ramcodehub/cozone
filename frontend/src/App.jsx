import './App.css'
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";

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

function App() {
  useEffect(() => {
    AOS.init({
      duration: 650,
      once: true,    
      easing: "ease-in-out",
    });
  }, []);
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
    </>
  )
}

export default App;