import React from 'react';
import { createPortal } from 'react-dom';
import './Preloader.css';

interface PreloaderProps {
  progress: number;
  isVisible: boolean;
}

const Preloader: React.FC<PreloaderProps> = ({ progress, isVisible }) => {
  const preloaderContent = (
    <div className={`premium-preloader ${!isVisible ? 'fade-out' : ''}`}>
      <div className="premium-preloader__center">
        <img 
          src="/logo/polaroid-dosa-logo.png" 
          alt="Polaroid Dosa" 
          className="premium-preloader__logo-image" 
          style={{ opacity: progress > 0 ? 1 : 0 }} 
        />
      </div>

      <div className="premium-preloader__bottom-left">
        POLAROID DOSA<br />
        2025
      </div>
      
      <div className="premium-preloader__bottom-right">
        CINEMATIC<br />
        SEQUENCE
      </div>
    </div>
  );

  // Use a portal to render the preloader directly in the body,
  // bypassing any CSS stacking context limitations of parent elements (like position: sticky).
  return createPortal(preloaderContent, document.body);
};

export default Preloader;
