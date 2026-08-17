import React, { useEffect, useRef } from 'react';
import './About.css';

const About: React.FC = () => {
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
    <section className="about-section" id="about" ref={sectionRef}>
      <div className="about__container">
        
        {/* Left Column: Text & Stats */}
        <div className="about__left">
          <div className="about__pre-title">
            <span className="category-dot"></span>
            ABOUT US
          </div>
          
          <h2 className="about__title">
            WE'RE NOT AN<br />
            AGENCY.<br />
            WE'RE YOUR<br />
            CREATIVE <span className="highlight-orange">WEAPON.</span>
          </h2>
          
          <div className="about__description">
            <p>
              Founded with a vision for the future, Polaroid Dosa was built to 
              solve a single problem: generic branding. We don't do "safe" 
              and we don't do "average".
            </p>
            <p>
              We partner with founders and brands that want to dominate 
              their category through visual excellence and cinematic 
              storytelling.
            </p>
          </div>
          
          <div className="about__divider"></div>
          
          <div className="about__stats">
            <div className="stat-item">
              <div className="stat-value">20<span className="highlight-orange">+</span></div>
              <div className="stat-label">FILMS PRODUCED</div>
              <div className="stat-underline"></div>
            </div>
            
            <div className="stat-item">
              <div className="stat-value">30<span className="highlight-orange">+</span></div>
              <div className="stat-label">BRANDS WORKED WITH</div>
              <div className="stat-underline"></div>
            </div>
            
            <div className="stat-item">
              <div className="stat-value">3<span className="highlight-orange">x</span></div>
              <div className="stat-label">AVG. CLIENT GROWTH</div>
              <div className="stat-underline"></div>
            </div>
          </div>
        </div>

        {/* Right Column: Image Card */}
        <div className="about__right">
          <div className="about__card">
            
            {/* Watermark text */}
            <div className="about__card-watermark">PD</div>
            
            {/* Gradient flare overlay mimicking the image */}
            <div className="about__card-flare"></div>
            
            {/* Top Right Badge */}
            <div className="about__badge">
              AVAILABLE — FOR NEW PROJECTS
            </div>
            
            {/* Bottom Quote */}
            <div className="about__quote-container">
              <span className="about__quote-mark">“</span>
              <div className="about__quote-text">
                "If it doesn't stop the scroll,<br />
                it didn't earn a place on the screen."
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default About;
