import React from 'react';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import './Footer.css';

// Custom icons for brands not in Lucide
const InstagramIcon = ({ size = 20, color = "currentColor", strokeWidth = 2, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 20, color = "currentColor", strokeWidth = 2, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const WhatsappIcon = ({ size = 20, color = "currentColor", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill={color} {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        
        {/* Top Section: Brand & Socials */}
        <div className="footer__top">
          <div className="footer__brand">
            <img src="/logo/polaroid-dosa-logo.png" alt="Polaroid Dosa" className="footer__logo-image" />
            <div className="footer__brand-text">
              <p className="footer__brand-tagline">WE CREATE. WE TELL STORIES.<br/>WE MAKE IMPACT.</p>
            </div>
          </div>
          
          <div className="footer__socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">
              <InstagramIcon size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer__social-link">
              <LinkedinIcon size={20} />
            </a>
            <a href="https://wa.me/919446976393" target="_blank" rel="noopener noreferrer" className="footer__social-link">
              <WhatsappIcon size={20} color="#ffffff" />
            </a>
            <a href="mailto:polaroiddosa@gmail.com" className="footer__social-link">
              <Mail size={20} strokeWidth={2} />
            </a>
          </div>
        </div>
        
        {/* Middle Section: Links Grid */}
        <div className="footer__grid">
          
          
          <div className="footer__col">
            <h4 className="footer__col-title">SERVICES</h4>
            <ul className="footer__list">
              <li><a href="#">Advertising & Creative <ArrowUpRight size={14} className="link-arrow"/></a></li>
              <li><a href="#">Brand Films & Videos <ArrowUpRight size={14} className="link-arrow"/></a></li>
              <li><a href="#">Digital Experiences <ArrowUpRight size={14} className="link-arrow"/></a></li>
              <li><a href="#">Growth & Strategy <ArrowUpRight size={14} className="link-arrow"/></a></li>
            </ul>
          </div>
          
          <div className="footer__col">
            <h4 className="footer__col-title">COMPANY</h4>
            <ul className="footer__list">
              <li><a href="#">About Us <ArrowUpRight size={14} className="link-arrow"/></a></li>
              <li><a href="#">Our Story <ArrowUpRight size={14} className="link-arrow"/></a></li>
              <li><a href="#">Careers <ArrowUpRight size={14} className="link-arrow"/></a></li>
              <li><a href="#">Let's Collaborate <ArrowUpRight size={14} className="link-arrow"/></a></li>
            </ul>
          </div>
          
          
          <div className="footer__col">
            <h4 className="footer__col-title">SUPPORT</h4>
            <ul className="footer__list">
              <li><a href="#">Help Center <ArrowUpRight size={14} className="link-arrow"/></a></li>
              <li><a href="#">FAQs <ArrowUpRight size={14} className="link-arrow"/></a></li>
              <li><a href="#">Privacy Policy <ArrowUpRight size={14} className="link-arrow"/></a></li>
              <li><a href="#">Terms of Service <ArrowUpRight size={14} className="link-arrow"/></a></li>
            </ul>
          </div>
          
          <div className="footer__col">
            <h4 className="footer__col-title">GET IN TOUCH</h4>
            <ul className="footer__list footer__contact-list">
              <li>
                <a href="mailto:polaroiddosa@gmail.com">
                  <Mail size={16} strokeWidth={1.5} className="contact-icon" />
                  polaroiddosa@gmail.com 
                  <ArrowUpRight size={14} className="link-arrow ml-auto"/>
                </a>
              </li>
              <div className="contact-divider"></div>
              <li>
                <a href="tel:+919446976393">
                  <Phone size={16} strokeWidth={1.5} className="contact-icon" />
                  9446976393 
                  <ArrowUpRight size={14} className="link-arrow ml-auto"/>
                </a>
              </li>
              <div className="contact-divider"></div>
              <li>
                <a href="#">
                  <MapPin size={16} strokeWidth={1.5} className="contact-icon" />
                  Kollam, Kerala, India 
                  <ArrowUpRight size={14} className="link-arrow ml-auto"/>
                </a>
              </li>
            </ul>
          </div>
          
        </div>
        
        {/* Bottom Section: Copyright */}
        <div className="footer__bottom">
          <div className="footer__copyright">
            © 2025 POLAROID DOSA. ALL RIGHTS RESERVED.
          </div>
          
          <div className="footer__tagline">
            <span className="dot"></span> CREATIVE STUDIO <span className="dot"></span>
          </div>
          
          <div className="footer__credit">
            MADE WITH PASSION, FUELED BY PURPOSE.
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
