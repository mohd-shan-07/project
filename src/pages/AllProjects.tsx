import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLenis } from '../hooks/useLenis';
import './AllProjects.css';

// Dynamically load all poster paths from the public folder using Vite's glob feature
const posterModules = import.meta.glob('/public/posters/*.{jpg,png,jpeg,webp}');

// Extract the file paths and remove the '/public' prefix so they work correctly as absolute URLs
const allPosters = Object.keys(posterModules).map((filePath, index) => {
  const fileNameWithExt = filePath.split('/').pop() || '';
  const match = fileNameWithExt.match(/(.*)\.(jpg|png|jpeg|webp)$/i);
  const baseName = match ? match[1] : `poster-${index + 1}`;
  const ext = match ? match[2] : 'jpg';
  
  return {
    id: index + 1,
    baseName: baseName,
    rawExt: ext,
    rawUrl: filePath.replace('/public', ''),
    optimizedUrl: `/posters/optimized/${baseName}.webp`,
    title: baseName.replace(/-/g, ' ').toUpperCase()
  };
});

// Dynamically load all video paths
const videoModules = import.meta.glob('/public/videos/*.{mp4,webm}');

const allVideos = Object.keys(videoModules).map((filePath, index) => {
  const fileNameWithExt = filePath.split('/').pop() || '';
  const match = fileNameWithExt.match(/(.*)\.(mp4|webm)$/i);
  const baseName = match ? match[1] : `video-${index + 1}`;
  
  return {
    id: `video-${index + 1}`,
    title: baseName.replace(/-/g, ' ').toUpperCase(),
    rawUrl: filePath.replace('/public', ''),
  };
});

const AllProjects: React.FC = () => {
  useLenis();
  const [activeCategory, setActiveCategory] = useState<'POSTERS' | 'FILMS'>('POSTERS');
  const [activeModalVideo, setActiveModalVideo] = useState<string | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Robust scroll lock and Escape key listener for the Video Modal
  useEffect(() => {
    if (!activeModalVideo) return;

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

  const handleOpenVideo = (videoUrl: string) => {
    setActiveModalVideo(videoUrl);
  };

  return (
    <div className="all-projects-page">
      {/* Navigation (Simple back link for now) */}
      <nav className="ap-nav">
        <Link to="/" className="ap-back-link">
          ← BACK TO HOME
        </Link>
      </nav>

      {/* Header Section */}
      <header className="ap-header">
        <div className="ap-header__left">
          <h1 className="ap-title">
            Selected<br />
            <span className="highlight">Work.</span>
          </h1>
          <p className="ap-description">
            A curated selection of posters, films,<br />
            and brand stories crafted with purpose<br />
            and precision.
          </p>
        </div>
        
        <div className="ap-header__right">
          <div className="ap-explore-label">EXPLORE WORK</div>
          <div className="ap-filters">
            <button 
              className={`ap-filter-btn ${activeCategory === 'POSTERS' ? 'active' : ''}`}
              onClick={() => setActiveCategory('POSTERS')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              POSTERS
            </button>
            <button 
              className={`ap-filter-btn ${activeCategory === 'FILMS' ? 'active' : ''}`}
              onClick={() => setActiveCategory('FILMS')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
              FILMS & VIDEOS
            </button>
          </div>
          
          <div className="ap-stats">
            <div className="ap-stats__number">
              {activeCategory === 'POSTERS' ? allPosters.length : allVideos.length}
            </div>
            <div className="ap-stats__text">
              <span className="highlight">{activeCategory === 'POSTERS' ? 'POSTERS' : 'VIDEOS'}</span><br />
              and counting
            </div>
          </div>
        </div>
      </header>

      {/* Grid Section */}
      <section className="ap-grid-section">
        <div className="ap-grid-header">
          <div className="ap-grid-title">ALL {activeCategory === 'POSTERS' ? 'POSTERS' : 'VIDEOS'}</div>
          <div className="ap-grid-sort">
            SORT BY <span className="highlight">LATEST ⌄</span>
          </div>
        </div>

        <div className="ap-grid">
          {activeCategory === 'POSTERS' ? (
            allPosters.map((poster) => (
              <div key={poster.id} className="ap-grid-card">
                <div className="ap-grid-card__image-wrapper">
                  <img 
                    src={poster.optimizedUrl} 
                    alt={poster.title} 
                    className="ap-grid-card__image" 
                    onError={(e) => {
                      e.currentTarget.src = poster.rawUrl;
                    }}
                  />
                </div>
              </div>
            ))
          ) : (
            allVideos.map((video) => (
              <div 
                key={video.id} 
                className="ap-grid-card ap-grid-card--video"
                onClick={() => handleOpenVideo(video.rawUrl)}
              >
                <div className="ap-grid-card__image-wrapper">
                  <video 
                    src={`${video.rawUrl}#t=1`} 
                    className="ap-grid-card__image" 
                    playsInline 
                    muted 
                    preload="metadata"
                  />
                  <div className="ap-video-overlay">
                    <button className="ap-play-btn" aria-label="Play Video">
                      <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Full-Screen Video Modal */}
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

export default AllProjects;
