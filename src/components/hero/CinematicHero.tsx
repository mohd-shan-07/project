import React, { useRef } from 'react';
import FrameSequence from './FrameSequence';
import HeroOverlay from './HeroOverlay';
import './CinematicHero.css';

const CinematicHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="cinematic-hero" ref={containerRef}>
      <div className="cinematic-hero__sticky">
        <h1 className="cinematic-hero__bg-text">POLAROID</h1>
        {/* We pass the trigger element ref to FrameSequence for GSAP ScrollTrigger */}
        <FrameSequence scrollTriggerRef={containerRef} />
        <HeroOverlay />
      </div>
    </section>
  );
};

export default CinematicHero;
