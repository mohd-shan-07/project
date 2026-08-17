import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If we are not on the home page, it should always be black (or turn black immediately on scroll)
      if (location.pathname !== '/') {
        setIsScrolled(window.scrollY > 10);
        return;
      }

      const heroSection = document.querySelector('.cinematic-hero');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        // The navbar is 80px tall. When the bottom of the 500vh hero section 
        // reaches 100px from the top of the viewport, the next section is sliding underneath the navbar.
        // We want the background to turn black.
        if (rect.bottom < 100) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      } else {
        // Fallback
        if (window.scrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__logo">
          <Link to="/">
            <img src="/logo/polaroid-dosa-logo.png" alt="Polaroid Dosa" className="navbar__logo-img" />
          </Link>
        </div>
        <ul className="navbar__links">
          <li><a href="/#work">WORK</a></li>
          <li><a href="/#services">SERVICES</a></li>
          <li><a href="/#about">ABOUT</a></li>
          <li><a href="/#contact">LET'S TALK</a></li>
        </ul>
        <div className="navbar__mobile-menu" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✕' : '☰'}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`navbar__mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <button className="navbar__mobile-close" onClick={closeMobileMenu} aria-label="Close Menu">
          ✕
        </button>
        <ul className="navbar__mobile-links">
          <li><a href="/#work" onClick={closeMobileMenu}>WORK</a></li>
          <li><a href="/#services" onClick={closeMobileMenu}>SERVICES</a></li>
          <li><a href="/#about" onClick={closeMobileMenu}>ABOUT</a></li>
          <li><a href="/#contact" onClick={closeMobileMenu}>LET'S TALK</a></li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
