// src/App.jsx
import React, { useState, useEffect } from 'react';
import NightSky from './NightSky';
import './App.css';

const colors = ['#000000', '#0B100E', '#1E332D'];

// The color interpolation logic remains the same
const interpolateColor = (color1, color2, factor) => {
  const hex = (c) => c.toString(16).padStart(2, '0');
  const r1 = parseInt(color1.substring(1, 3), 16), g1 = parseInt(color1.substring(3, 5), 16), b1 = parseInt(color1.substring(5, 7), 16);
  const r2 = parseInt(color2.substring(1, 3), 16), g2 = parseInt(color2.substring(3, 5), 16), b2 = parseInt(color2.substring(5, 7), 16);
  const r = Math.round(r1 + factor * (r2 - r1)), g = Math.round(g1 + factor * (g2 - g1)), b = Math.round(b1 + factor * (b2 - b1));
  return `#${hex(r)}${hex(g)}${hex(b)}`;
};

function App() {
  const [background, setBackground] = useState(colors[0]);

  // --- START OF MODIFIED CODE ---
  // State to track the animation progress
  const [isTitleDone, setIsTitleDone] = useState(false);
  const [startCaption, setStartCaption] = useState(false); // New state to trigger caption
  const [isCaptionDone, setIsCaptionDone] = useState(false);

  useEffect(() => {
    // Timings from your CSS
    const titleTypingDuration = 1500;   // 1.5s
    const titleStartDelay = 500;        // 0.5s
    const captionStartDelay = 500;      // NEW: The 0.5s pause you want
    const captionTypingDuration = 4000; // 4s (from CSS)

    // Calculate key moments in the animation timeline
    const titleFinishTime = titleTypingDuration + titleStartDelay;
    const captionStartTime = titleFinishTime + captionStartDelay;
    const captionFinishTime = captionStartTime + captionTypingDuration;

    // Timer 1: Hides the title's cursor when it finishes typing
    const titleTimer = setTimeout(() => {
      setIsTitleDone(true);
    }, titleFinishTime);

    // Timer 2: Starts the caption animation after the short pause
    const captionStartTimer = setTimeout(() => {
      setStartCaption(true);
    }, captionStartTime);

    // Timer 3: Hides the caption's cursor when it finishes
    const captionFinishTimer = setTimeout(() => {
      setIsCaptionDone(true);
    }, captionFinishTime);

    // Cleanup function to clear all timers if the component unmounts
    return () => {
      clearTimeout(titleTimer);
      clearTimeout(captionStartTimer);
      clearTimeout(captionFinishTimer);
    };

  }, []); // The empty array [] ensures this effect runs only once
  // --- END OF MODIFIED CODE ---

  // useEffect for background scroll remains unchanged
  useEffect(() => {
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollableHeight === 0) return;
      const scrollFraction = window.scrollY / scrollableHeight;
      const colorSegments = colors.length - 1;
      const currentSegment = Math.min(Math.floor(scrollFraction * colorSegments), colors.length - 1);
      const segmentFraction = (scrollFraction * colorSegments) - currentSegment;
      const newColor = interpolateColor(colors[currentSegment], colors[currentSegment + 1], segmentFraction);
      setBackground(newColor);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="main-wrapper" style={{ backgroundColor: background }}>
      <div className="starfield-section">
        <NightSky />
        <div className="title-container">
          <h1 className={`line-1 anim-typewriter ${isTitleDone ? 'cursor-hidden' : ''}`}>
            Our Media
          </h1>
          {/*
            The caption is now controlled by `startCaption`.
            It will only render after the title is done AND the short delay has passed.
          */}
          {startCaption && (
            <p className={`caption anim-typewriter-caption ${isCaptionDone ? 'cursor-hidden' : ''}`}>
              Some memories pass like shooting stars, but leave a sky full of wonder.
            </p>
          )}
        </div>
      </div>

      <div className="slide-spacer"></div>
      <div className="slide-spacer"></div>
      <div className="slide-spacer"></div>
    </div>
  );
}

export default App;