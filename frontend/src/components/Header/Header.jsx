import { useEffect, useState } from 'react';
import logo from '../../assets/img/logoWithBg-removebg-preview.png';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import MobileNavigation from '../MobileNavigation/MobileNavigation'; 
import './Header.css';

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`header d-flex align-items-center justify-content-between w-100 position-fixed
        ${sticky ? 'fixed-header' : ''}
        ${visible ? 'header-show' : 'header-hide'}
      `}
    >

      <img src={logo} alt="Logo" />


      <nav className="d-flex justify-content-between header-nav d-none d-lg-flex">
        <ul className="list-unstyled m-0 p-0 d-flex gap position-relative">
          <li><Link className="d-flex align-items-baseline text-decoration-none fw-medium header-link" to="/">Home</Link></li>
          <li><Link className="d-flex align-items-baseline text-decoration-none fw-medium header-link" to="/about">About</Link></li>
          <li><Link className="d-flex align-items-baseline text-decoration-none fw-medium header-link" to="/amenities">Amenities</Link></li>
          <li><Link className="d-flex align-items-baseline text-decoration-none fw-medium header-link" to="/plans">Pricing</Link></li>
          <li><Link className="d-flex align-items-baseline text-decoration-none fw-medium header-link" to="/gallery">Gallery</Link></li>
        </ul>
      </nav>


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
