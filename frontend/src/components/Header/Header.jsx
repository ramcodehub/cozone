import { useEffect, useState } from 'react';
import logo from '../../assets/img/logoWithBg-removebg-preview.png';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 50 ? setSticky(true) : setSticky(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <header
      className={`header d-flex justify-content-between w-100 position-fixed  ${sticky ? 'fixed-header' : ''}`}
      >
      <img src={logo} alt="Logo" />
      <nav className="d-flex justify-content-between header-nav">
        <ul className="list-unstyled m-0 p-0 d-flex gap position-relative">    
          <li>
            <Link
              className="d-flex align-items-baseline text-decoration-none fw-medium header-link"
              to='/'
            >
              Home
            </Link>
          </li> 
          <li>
            <Link
              className="d-flex align-items-baseline text-decoration-none fw-medium header-link"
              to='/'
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className="d-flex align-items-baseline text-decoration-none fw-medium header-link"
              to='/'
            >
              Pricing
            </Link>
           </li> 
          <li>
            <Link
              className="d-flex align-items-baseline text-decoration-none fw-medium header-link"
              to='/'
            >
              Gallery
            </Link>
          </li>
          
      </ul>
      </nav>
      <Button variant="secondary" onClick={() => setShowContact(true)} className='navBar-Btn ms-4'>Get Started</Button>
    </header>
  );
};

export default Header;
