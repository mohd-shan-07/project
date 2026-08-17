import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Clients.css';

gsap.registerPlugin(ScrollTrigger);

const clientLogos = [
  {
    name: 'LEAD College',
    element: <img src="/clients/LEAD college.webp" alt="LEAD College" className="client-logo" />
  },
  {
    name: 'Feastale',
    element: <img src="/clients/Feastale.webp" alt="Feastale" className="client-logo" />
  },
  {
    name: 'Livart',
    element: <img src="/clients/liv-art.webp" alt="Livart" className="client-logo" />
  },
  {
    name: 'Edex',
    element: <img src="/clients/edex.webp" alt="Edex" className="client-logo" />
  },
  {
    name: 'Happioca',
    element: <img src="/clients/happioca.webp" alt="Happioca" className="client-logo" />
  },
  {
    name: 'FutureHex',
    element: <img src="/clients/futurehex.webp" alt="FutureHex" className="client-logo" />
  },
  {
    name: 'FBA MIX',
    element: <img src="/clients/fbamix.webp" alt="FBA MIX" className="client-logo" />
  },
  {
    name: 'Kudumbashree',
    element: <img src="/clients/logo-kudumbashree.webp" alt="Kudumbashree" className="client-logo" />
  }
];

const Clients: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  // Create 3 copies for a seamless infinite loop
  const marqueeLogos = [...clientLogos, ...clientLogos, ...clientLogos];

  useGSAP(() => {
    // Text animations
    gsap.fromTo(
      textRef.current?.children || [],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      }
    );

    // Horizontal list fade-in
    gsap.fromTo(
      '.clients-horizontal-wrapper',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section className="clients-section" ref={containerRef}>
      <div className="clients-top-row">
        {/* Left Side: Editorial Text */}
        <div className="clients-text" ref={textRef}>
          <div className="clients-label">
            <span className="label-dot"></span> OUR CLIENTS
          </div>
          <h2 className="clients-heading">
            Trusted by Brands <br />
            That <span className="highlight">Inspire Us.</span>
          </h2>
          <div className="clients-text-divider"></div>
          <p className="clients-description">
            We collaborate with forward-thinking brands and institutions that value creativity, quality, and results.
          </p>
        </div>

        {/* Right Side: Action Button */}
        <div className="clients-action">
          <button className="clients-btn">LET'S WORK TOGETHER <span className="arrow">→</span></button>
        </div>
      </div>

      {/* Bottom Side: Horizontal Scroll Showcase */}
      <div className="clients-bottom-row">
        <div className="clients-horizontal-wrapper">
          {marqueeLogos.map((client, index) => (
            <React.Fragment key={index}>
              <div className="client-horizontal-cell">
                <div className="client-logo-wrapper">
                  {client.element}
                </div>
              </div>
              <div className="client-separator">
                <span className="separator-dot"></span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;
