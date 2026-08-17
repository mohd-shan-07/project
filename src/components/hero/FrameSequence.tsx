import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Preloader from './Preloader';
import './FrameSequence.css';

gsap.registerPlugin(ScrollTrigger);

interface FrameSequenceProps {
  scrollTriggerRef: React.RefObject<HTMLDivElement | null>;
}

const TOTAL_FRAMES = 74; // 002 to 075
const START_FRAME = 2;
const END_FRAME = 75;

const FrameSequence: React.FC<FrameSequenceProps> = ({ scrollTriggerRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<Record<number, HTMLImageElement>>({});
  
  // We use a mutable object to hold the current frame for GSAP to tween
  const playhead = useRef({ frame: START_FRAME });

  const [loadedCount, setLoadedCount] = useState(0);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  // Generate frame path: 2 -> 002.png
  const getFramePath = (index: number) => {
    const paddedIndex = String(index).padStart(3, '0');
    return `/hero-frames/${paddedIndex}.png`;
  };

  // Preload frames
  useEffect(() => {
    let isCancelled = false;
    let localLoadedCount = 0;

    const loadImages = async () => {
      const loadPromises = [];

      for (let i = START_FRAME; i <= END_FRAME; i++) {
        const promise = new Promise<void>((resolve) => {
          const img = new Image();
          img.src = getFramePath(i);
          
          img.onload = () => {
            if (!isCancelled) {
              imagesRef.current[i] = img;
              localLoadedCount++;
              setLoadedCount(localLoadedCount);
              
              if (i === START_FRAME) {
                renderFrame(START_FRAME);
              }
            }
            resolve();
          };
          
          img.onerror = () => {
            if (!isCancelled) {
              localLoadedCount++;
              setLoadedCount(localLoadedCount);
            }
            resolve();
          };
        });
        
        loadPromises.push(promise);
      }

      await Promise.all(loadPromises);

      if (!isCancelled) {
        setIsFullyLoaded(true);
        setTimeout(() => {
          setShowPreloader(false);
        }, 500); 
      }
    };

    loadImages();

    return () => {
      isCancelled = true;
    };
  }, []);

  const loadPercentage = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));

  const renderFrame = (frameIndex: number) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let renderIndex = Math.round(frameIndex);
    while (!imagesRef.current[renderIndex] && renderIndex > START_FRAME) {
      renderIndex--;
    }

    const img = imagesRef.current[renderIndex];
    if (!img) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.width;
    const ih = img.height;

    let scale = Math.min(cw / iw, ch / ih);

    if (window.innerWidth <= 768) {
      const mobileScale = (ch * 0.82) / ih;
      scale = Math.max(scale, mobileScale);
    }

    const nw = iw * scale;
    const nh = ih * scale;
    const x = (cw - nw) / 2;
    const yOffset = window.innerWidth <= 768 ? ch * 0.05 : 0; 
    const y = (ch - nh) / 2 - yOffset;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, x, y, nw, nh);
  };

  // Setup GSAP ScrollTrigger for hardware-accelerated scrubbing without React re-renders
  useLayoutEffect(() => {
    if (!isFullyLoaded || !scrollTriggerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: scrollTriggerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1, // Smooth scrub
        onUpdate: (self) => {
          // Calculate the target frame directly from progress (0 to 1)
          playhead.current.frame = Math.max(
            START_FRAME, 
            Math.min(END_FRAME, Math.round(self.progress * (TOTAL_FRAMES - 1)) + START_FRAME)
          );
          
          // Request animation frame to render to canvas (prevents drawing twice per screen refresh)
          requestAnimationFrame(() => {
            renderFrame(playhead.current.frame);
          });
        }
      });
    });

    return () => ctx.revert();
  }, [isFullyLoaded, scrollTriggerRef]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;
      
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      renderFrame(playhead.current.frame);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Preloader progress={loadPercentage} isVisible={showPreloader} />

      <div className="frame-sequence-container loaded">
        <canvas ref={canvasRef} className="frame-canvas" />
      </div>
    </>
  );
};

export default FrameSequence;
