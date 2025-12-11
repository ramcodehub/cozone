import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MobileNavigation.css";

const MobileNavigation = () => {
  const [open, setOpen] = useState(false);

  // Disable scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      <div className="mobile-hamburger" onClick={() => setOpen(true)}>
        <i className="bi bi-list"></i>
      </div>

      {open && (
        <div className="mobile-overlay" onClick={() => setOpen(false)}></div>
      )}

      {/* Slide Menu */}
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {/* Close Button */}
        <button className="mobile-close-btn" onClick={() => setOpen(false)}>
          <i className="bi bi-x-lg"></i>
        </button>

        <ul>
          <li><Link to="/" onClick={() => setOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setOpen(false)}>About</Link></li>
          <li><Link to="/amenities" onClick={() => setOpen(false)}>Amenities</Link></li>
          <li><Link to="/plans" onClick={() => setOpen(false)}>Services</Link></li>
          <li><Link to="/gallery" onClick={() => setOpen(false)}>GalleryZone</Link></li>
        </ul>
      </div>
    </>
  );
};

export default MobileNavigation;
