import React, { useEffect, useState } from 'react';
import './HeroOverlay.css';

const HeroOverlay: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animations shortly after mount
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`hero-overlay ${isLoaded ? 'is-loaded' : ''}`}>
      
      {/* LEFT CONTENT */}
      <div className="hero-overlay__left">
        <div className="hero-overlay__eyebrow">
          Creative Agency — Tech Forward
        </div>
        
        <h1 className="hero-overlay__headline">
          WE MAKE<br />
          BRANDS<br />
          <span className="hero-overlay__accent">IMPOSSIBLE</span> TO<br />
          IGNORE.
        </h1>
        
        <p className="hero-overlay__description">
          We craft visuals, brands and digital experiences<br />
          that people remember.
        </p>
        
        <button className="hero-overlay__cta">
          EXPLORE OUR WORK <span className="hero-overlay__cta-arrow">↗</span>
        </button>
        
        {/* SCROLL INDICATOR */}
        <div className="hero-overlay__scroll-indicator">
          <span className="hero-overlay__scroll-text">SCROLL TO EXPLORE</span>
          <div className="hero-overlay__scroll-line-container">
            <div className="hero-overlay__scroll-line"></div>
            <div className="hero-overlay__scroll-arrow">↓</div>
          </div>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="hero-overlay__right">
        <div className="hero-overlay__stats-block">
          <div className="hero-overlay__stats-bracket hero-overlay__stats-bracket--tl"></div>
          <div className="hero-overlay__stats-bracket hero-overlay__stats-bracket--tr"></div>
          <div className="hero-overlay__stats-bracket hero-overlay__stats-bracket--bl"></div>
          <div className="hero-overlay__stats-bracket hero-overlay__stats-bracket--br"></div>
          
          <div className="hero-overlay__stat">
            <div className="hero-overlay__stat-number">20+</div>
            <div className="hero-overlay__stat-label">Films Produced</div>
          </div>
          
          <div className="hero-overlay__stat-divider"></div>
          
          <div className="hero-overlay__stat">
            <div className="hero-overlay__stat-number">30+</div>
            <div className="hero-overlay__stat-label">Brands Worked With</div>
          </div>
          
          <div className="hero-overlay__stat-divider"></div>
          
          <div className="hero-overlay__stat">
            <div className="hero-overlay__stat-number">3x</div>
            <div className="hero-overlay__stat-label">Avg. Client Growth</div>
          </div>
        </div>
      </div>

      {/* BOTTOM RIGHT */}
      <div className="hero-overlay__bottom-right">
        PHOTO / FILM / BRANDING / DIGITAL
      </div>

    </div>
  );
};

export default HeroOverlay;
