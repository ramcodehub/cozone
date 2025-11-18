import { useEffect, useState } from 'react';
import logo from '../../assets/img/logoWithBg-removebg-preview.png';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
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
      <nav className="d-flex justify-content-between header-nav">
        <ul className="list-unstyled m-0 p-0 d-flex gap position-relative">    
          <li><Link className="d-flex align-items-baseline text-decoration-none fw-medium header-link" to="/">Home</Link></li>
          <li><Link className="d-flex align-items-baseline text-decoration-none fw-medium header-link" to="/about">About</Link></li>
          <li><Link className="d-flex align-items-baseline text-decoration-none fw-medium header-link" to="/">Amenities</Link></li>
          <li><Link className="d-flex align-items-baseline text-decoration-none fw-medium header-link" to="/">Pricing</Link></li>
          <li><Link className="d-flex align-items-baseline text-decoration-none fw-medium header-link" to="/">Gallery</Link></li>
        </ul>
      </nav>
      <Button variant="secondary" className="navBar-Btn">Get Started</Button>
    </header>
  );
};

export default Header;