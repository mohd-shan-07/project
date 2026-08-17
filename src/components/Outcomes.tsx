import React, { useEffect, useRef } from 'react';
import { Megaphone, AppWindow, BarChart3 } from 'lucide-react';
import './Outcomes.css';

const outcomesData = [
  {
    id: '01',
    category: 'ADVERTISING & CREATIVE',
    title: 'ADS THAT ACTUALLY\nMOVE PEOPLE',
    description: 'We craft narratives that cut through the noise and resonate with your audience\'s core.',
    Icon: Megaphone,
    services: [
      'High-impact advertising posters',
      'Brand & product films',
      'Campaign creative direction',
      'Social media content systems',
      'Print & OOH advertising'
    ]
  },
  {
    id: '02',
    category: 'DIGITAL EXPERIENCE',
    title: 'WEBSITES THAT CONVERT,\nNOT JUST LOOK GOOD',
    description: 'Your digital home should be your hardest working salesperson. We make sure it is.',
    Icon: AppWindow,
    services: [
      'Brand identity & visual systems',
      'Website design & development',
      'Landing pages built to convert',
      'UI/UX for apps & products',
      'Motion graphics & reels'
    ]
  },
  {
    id: '03',
    category: 'GROWTH & STRATEGY',
    title: 'STRATEGY THAT MAKES\nGROWTH INEVITABLE',
    description: 'Data-driven decisions meeting world-class creative execution for measurable results.',
    Icon: BarChart3,
    services: [
      'Brand positioning & messaging',
      'Performance ad campaigns',
      'SEO & content marketing',
      'Social media management',
      'Analytics & growth consulting'
    ]
  }
];

const Outcomes: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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
    
    cardsRef.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="outcomes-section" id="outcomes" ref={sectionRef}>
      <div className="outcomes__container">
        
        <header className="outcomes__header">
          <div className="outcomes__pre-title">
            <span className="category-dot"></span>
            OUR OUTCOMES
          </div>
          <h2 className="outcomes__title">
            OUTCOMES,<br />
            NOT <span className="highlight-orange">ACTIVITIES.</span>
          </h2>
          <p className="outcomes__subtitle">
            We focus on what drives impact — real results that<br />
            build brands, grow businesses, and create lasting value.
          </p>
        </header>

        <div className="outcomes__grid">
          {outcomesData.map((outcome, index) => {
            const IconComponent = outcome.Icon;
            return (
              <div 
                key={outcome.id} 
                className="outcome-card"
                ref={(el) => { cardsRef.current[index] = el; }}
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <div className="outcome-card__glow"></div>
                
                <div className="outcome-card__top">
                  <div className="outcome-card__icon-wrapper">
                    <IconComponent size={20} strokeWidth={1.5} />
                  </div>
                  <div className="outcome-card__number">{outcome.id}</div>
                </div>
                
                <div className="outcome-card__content">
                  <div className="outcome-card__category">
                    {outcome.category}
                  </div>
                  
                  <h3 className="outcome-card__title">
                    {outcome.title.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}<br/>
                      </React.Fragment>
                    ))}
                  </h3>
                  
                  <p className="outcome-card__description">
                    {outcome.description}
                  </p>
                  
                  <ul className="outcome-card__services">
                    {outcome.services.map((service, i) => (
                      <li key={i}>
                        <span className="service-bullet">•</span> {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Outcomes;
