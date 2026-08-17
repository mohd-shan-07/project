import React from 'react';
import './ScrollIndicator.css';

interface ScrollIndicatorProps {
  isScrolling: boolean;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ isScrolling }) => {
  return (
    <div className={`scroll-indicator ${isScrolling ? 'hidden' : ''}`}>
      <span className="scroll-indicator__text">
        SCROLL<br />
        TO EXPLORE
      </span>
      <div className="scroll-indicator__arrow">↓</div>
    </div>
  );
};

export default ScrollIndicator;
