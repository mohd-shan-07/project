import React, { useEffect, useRef } from 'react';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';
import './Contact.css';

const InstagramIcon = ({ size = 24, color = "currentColor", strokeWidth = 2, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ size = 24, color = "currentColor", strokeWidth = 2, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const contactMethods = [
  {
    id: 'email',
    label: 'EMAIL',
    value: 'polaroiddosa@gmail.com',
    href: 'mailto:polaroiddosa@gmail.com',
    Icon: Mail
  },
  {
    id: 'instagram',
    label: 'INSTAGRAM',
    value: '@polaroiddosa',
    href: 'https://instagram.com/polaroiddosa',
    Icon: InstagramIcon
  },
  {
    id: 'whatsapp',
    label: 'WHATSAPP',
    value: '9446976393',
    href: 'https://wa.me/919446976393',
    Icon: Phone
  },
  {
    id: 'linkedin',
    label: 'LINKEDIN',
    value: 'Polaroid Dosa',
    href: 'https://linkedin.com/company/polaroid-dosa',
    Icon: LinkedinIcon
  }
];

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section className="contact-section" id="contact" ref={sectionRef}>
      <div className="contact__container">
        
        {/* Left Column: Headline & CTA */}
        <div className="contact__left">
          <div className="contact__pre-title">
            <span className="category-dot"></span>
            GET IN TOUCH
          </div>
          
          <h2 className="contact__title">
            LET'S CREATE<br />
            SOMETHING<br />
            <span className="highlight-orange">THAT LASTS.</span>
          </h2>
          
          <p className="contact__subtitle">
            Got a project, idea, or just want to say hi?<br />
            We'd love to hear from you. Let's create<br />
            something impactful together.
          </p>
        </div>

        {/* Center Vertical Divider (Desktop Only) */}
        <div className="contact__divider-vertical"></div>

        {/* Right Column: Visual & Contact List */}
        <div className="contact__right">
          
          {/* Top Visual Lockup */}
          <div className="contact__visual">
            <img 
              src="/logo/polaroid-dosa.png" 
              alt="Polaroid Dosa" 
              className="contact__logo" 
            />
          </div>
          
          {/* Contact Methods List */}
          <div className="contact__list">
            {contactMethods.map((method) => {
              const IconComponent = method.Icon;
              return (
                <a key={method.id} href={method.href} target="_blank" rel="noopener noreferrer" className="contact__list-item">
                  <div className="contact__item-icon-box">
                    <IconComponent size={20} strokeWidth={1.5} color="#fff" />
                  </div>
                  
                  <div className="contact__item-details">
                    <span className="contact__item-label">{method.label}</span>
                    <span className="contact__item-value">{method.value}</span>
                  </div>
                  
                  <div className="contact__item-arrow">
                    <ArrowUpRight size={18} strokeWidth={2} color="#F5A000" />
                  </div>
                </a>
              );
            })}
          </div>
          
        </div>
        
      </div>
    </section>
  );
};

export default Contact;
