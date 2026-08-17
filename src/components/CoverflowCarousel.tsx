import React, { useState, useEffect } from 'react';
import { useDrag } from '@use-gesture/react';
import './CoverflowCarousel.css';

export interface CarouselItem {
  id: string | number;
  image?: string;
  title: string;
  category?: string;
  year?: string;
  video?: string;
}

interface CoverflowCarouselProps {
  items: CarouselItem[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
}

const CoverflowCarousel: React.FC<CoverflowCarouselProps> = ({ items, activeIndex, onIndexChange }) => {
  const [activeModalVideo, setActiveModalVideo] = useState<string | null>(null);

  // Robust scroll lock and Escape key listener
  useEffect(() => {
    if (!activeModalVideo) return;

    // Capture current scroll position to restore later if needed
    // Pause Lenis smooth scrolling if it exists
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.stop();
    }

    // Fallback and strict native scroll lock
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';

    // Handle Escape key to close modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalVideo(null);
      }
    };

    // Prevent wheel and touchmove events on the modal background
    // Allows scrolling/interaction only if the target is the video element itself
    const preventScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName !== 'VIDEO') {
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });

    return () => {
      // Resume Lenis smooth scrolling
      if (lenis) {
        lenis.start();
      }

      // Remove styles to unlock native scroll
      document.body.style.overflow = '';
      document.body.style.overscrollBehavior = '';

      // Cleanup listeners
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
    };
  }, [activeModalVideo]);

  const handlePrev = () => {
    onIndexChange(activeIndex === 0 ? items.length - 1 : activeIndex - 1);
  };

  const handleNext = () => {
    onIndexChange(activeIndex === items.length - 1 ? 0 : activeIndex + 1);
  };

  const openVideoModal = (e: React.MouseEvent, videoUrl: string) => {
    e.stopPropagation();
    // Remove the #t=1 hash so the modal video plays from the beginning
    const cleanUrl = videoUrl.split('#')[0];
    setActiveModalVideo(cleanUrl);
  };

  const bind = useDrag(({ movement: [mx], swipe: [swipeX], last }) => {
    if (last) {
      if (swipeX === -1 || mx < -50) {
        handleNext();
      } else if (swipeX === 1 || mx > 50) {
        handlePrev();
      }
    }
  }, { swipe: { distance: 30 } });

  return (
    <div className="coverflow-container" {...bind()} style={{ touchAction: 'pan-y' }}>
      {/* Left Arrow */}
      <button 
        className="coverflow-nav-btn prev" 
        onClick={handlePrev}
        aria-label="Previous poster"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Track */}
      <div className="coverflow-track">
        {items.map((item, index) => {
          let offset = index - activeIndex;
          const half = items.length / 2;
          
          // Wrap offset for infinite loop effect
          if (offset > half) {
            offset -= items.length;
          } else if (offset < -half) {
            offset += items.length;
          }

          const absOffset = Math.abs(offset);
          
          // Calculate visual properties
          const isActive = offset === 0;
          const scale = isActive ? 1 : 1 - (absOffset * 0.15);
          const zIndex = 10 - absOffset;
          const opacity = absOffset > 3 ? 0 : 1; // fade out items at the edge

          return (
            <div
              key={item.id}
              className={`coverflow-card ${isActive ? 'active' : ''} ${item.video ? 'coverflow-card--video' : ''}`}
              onClick={(e) => {
                if (!isActive) {
                  onIndexChange(index);
                } else if (item.video) {
                  openVideoModal(e, item.video);
                }
              }}
              style={{
                transform: `translate3d(calc(-50% + calc(${offset} * var(--coverflow-gap, 180px))), 0, 0) scale(${scale})`,
                zIndex,
                opacity,
                pointerEvents: opacity === 0 ? 'none' : 'auto',
                willChange: opacity > 0 ? 'transform, opacity' : 'auto'
              }}
            >
              {item.video ? (
                <>
                  <video 
                    src={item.video}
                    poster={item.image}
                    className="coverflow-card__image"
                    playsInline
                    muted
                    preload="metadata"
                  />
                  {isActive && (
                    <button className="coverflow-card__play-btn" aria-label="Play Video">
                      <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  )}
                </>
              ) : (
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="coverflow-card__image" 
                  loading="eager" 
                  decoding="async" 
                />
              )}
              
              {/* Overlay for inactive cards */}
              {!isActive && <div className="coverflow-card__overlay"></div>}
            </div>
          );
        })}
      </div>

      {/* Right Arrow */}
      <button 
        className="coverflow-nav-btn next" 
        onClick={handleNext}
        aria-label="Next poster"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Video Modal */}
      {activeModalVideo && (
        <div className="video-modal-overlay" onClick={() => setActiveModalVideo(null)}>
          <button className="video-modal-close" onClick={() => setActiveModalVideo(null)}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <video 
              src={activeModalVideo} 
              controls 
              controlsList="nofullscreen nodownload"
              autoPlay 
              playsInline 
              className="video-modal-player" 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverflowCarousel;
