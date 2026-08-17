import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CoverflowCarousel from './CoverflowCarousel';
import './SelectedWork.css';

const posterNumbers = [1, 3, 6, 7, 8, 11, 12, 15, 20, 23, 30, 31, 46, 39, 40];
const posterProjects = posterNumbers.map((num, i) => ({
  id: `poster-${i}`,
  title: `Poster ${num}`,
  category: 'POSTER DESIGN',
  year: '2024',
  image: `/posters/optimized/poster-${num.toString().padStart(2, '0')}.webp`
}));

const videoModules = import.meta.glob('/public/videos/*.{mp4,webm}');
const filmProjects = Object.keys(videoModules).map((filePath, index) => {
  const fileNameWithExt = filePath.split('/').pop() || '';
  const match = fileNameWithExt.match(/(.*)\.(mp4|webm)$/i);
  const baseName = match ? match[1] : `video-${index + 1}`;
  
  return {
    id: `film-${index + 1}`,
    title: baseName.replace(/-/g, ' ').toUpperCase(),
    category: 'FILM & VIDEO',
    year: '2024',
    video: filePath.replace('/public', '') + '#t=1'
  };
});

const SelectedWork: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("POSTERS");
  const [activeIndex, setActiveIndex] = useState(2); // Start at center item

  const currentItems = (activeCategory === 'POSTERS' ? posterProjects : filmProjects).slice(0, 10);

  // Auto-play functionality: advance the carousel every 4 seconds.
  useEffect(() => {
    // If it's a video, we might not want it to auto-advance, or maybe we do? Let's just keep the carousel logic.
    if (currentItems.length <= 1) return; // don't auto-advance if only 1 item
    
    const timer = setTimeout(() => {
      setActiveIndex((prevIndex) => (prevIndex >= currentItems.length - 1 ? 0 : prevIndex + 1));
    }, 4000);
    return () => clearTimeout(timer);
  }, [activeIndex, currentItems.length]);

  // Reset index when category changes
  useEffect(() => {
    setActiveIndex(currentItems.length > 2 ? 2 : 0);
  }, [activeCategory, currentItems.length]);

  return (
    <section className="selected-work" id="work">
      <div className="selected-work__container">
        
        {/* Header Section */}
        <div className="sw-header">
          <div className="sw-header__left">
            <span className="sw-header__label">
              <span className="label-dot"></span> SELECTED WORK
            </span>
            <h2 className="sw-header__title">
              The Work<br />
              <span className="highlight">Speaks First.</span>
            </h2>
            <p className="sw-header__subtitle">
              A curated selection of posters, films, and brand stories<br/>
              crafted with purpose and precision.
            </p>
          </div>
          <div className="sw-header__right">
            <Link to="/projects" className="sw-header__link">VIEW ALL PROJECTS ↗</Link>
            <div className="sw-filters__container">
              <button 
                className={`sw-filter-btn ${activeCategory === 'POSTERS' ? 'active' : ''}`}
                onClick={() => setActiveCategory('POSTERS')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                POSTERS
              </button>
              
              <span className="sw-filters__divider">|</span>
              
              <button 
                className={`sw-filter-btn ${activeCategory === 'FILMS' ? 'active' : ''}`}
                onClick={() => setActiveCategory('FILMS')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="23 7 16 12 23 17 23 7"></polygon>
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                </svg>
                FILMS & VIDEOS
              </button>
            </div>
          </div>
        </div>

        {/* Coverflow Carousel Layout */}
        <CoverflowCarousel 
          items={currentItems}
          activeIndex={activeIndex}
          onIndexChange={setActiveIndex}
        />

      </div>
    </section>
  );
};

export default SelectedWork;
