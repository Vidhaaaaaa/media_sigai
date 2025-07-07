import React, { useState, useEffect } from 'react';
import NightSky from './NightSky';
import Tile from './tile'; // make sure this is correct
import './Media.css';

const colors = ['#000000', '#0B100E', '#1E332D'];

const interpolateColor = (color1, color2, factor) => {
  const hex = (c) => c.toString(16).padStart(2, '0');
  const r1 = parseInt(color1.substring(1, 3), 16),
        g1 = parseInt(color1.substring(3, 5), 16),
        b1 = parseInt(color1.substring(5, 7), 16);
  const r2 = parseInt(color2.substring(1, 3), 16),
        g2 = parseInt(color2.substring(3, 5), 16),
        b2 = parseInt(color2.substring(5, 7), 16);
  const r = Math.round(r1 + factor * (r2 - r1)),
        g = Math.round(g1 + factor * (g2 - g1)),
        b = Math.round(b1 + factor * (b2 - b1));
  return `#${hex(r)}${hex(g)}${hex(b)}`;
};

function Media() {
  const [background, setBackground] = useState(colors[0]);
  const [isTitleDone, setIsTitleDone] = useState(false);
  const [startCaption, setStartCaption] = useState(false);
  const [isCaptionDone, setIsCaptionDone] = useState(false);

  useEffect(() => {
    const titleTypingDuration = 1500;
    const titleStartDelay = 500;
    const captionStartDelay = 500;
    const captionTypingDuration = 4000;

    const titleFinishTime = titleTypingDuration + titleStartDelay;
    const captionStartTime = titleFinishTime + captionStartDelay;
    const captionFinishTime = captionStartTime + captionTypingDuration;

    const titleTimer = setTimeout(() => setIsTitleDone(true), titleFinishTime);
    const captionStartTimer = setTimeout(() => setStartCaption(true), captionStartTime);
    const captionFinishTimer = setTimeout(() => setIsCaptionDone(true), captionFinishTime);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(captionStartTimer);
      clearTimeout(captionFinishTimer);
    };
  }, []);

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

  // 🧩 Sample tiles for testing layout (you can replace this later)
  const tiles = [
    { image: 'https://via.placeholder.com/150', description: 'Sunset vibes', name: 'Vidha', dateTag: 'June 2024', eveTag: 'Hackathon' },
    { image: 'https://via.placeholder.com/150', description: 'Learning React', name: 'Dev', dateTag: 'May 2024', eveTag: 'Workshop' },
    { image: 'https://via.placeholder.com/150', description: 'Night Sky', name: 'Skywatcher', dateTag: 'April 2024', eveTag: 'Seminar' },
    { image: 'https://via.placeholder.com/150', description: 'More Vibes', name: 'Chill', dateTag: 'March 2024', eveTag: 'Event' }
  ];

  // 💡 Distribute tiles into 3 columns round-robin
  const columns = [[], [], []];
  tiles.forEach((tile, index) => {
    columns[index % 3].unshift(
      <Tile
        key={index}
        image={tile.image}
        description={tile.description}
        name={tile.name}
        dateTag={tile.dateTag}
        eveTag={tile.eveTag}
      />
    );
  });

  return (
    <div className="main-wrapper" style={{ backgroundColor: background }}>
      <div className="starfield-section">
        <NightSky />
        <div className="title-container">
          <h1 className={`line-1 anim-typewriter ${isTitleDone ? 'cursor-hidden' : ''}`}>
            Our Media
          </h1>
          {startCaption && (
            <p className={`caption anim-typewriter-caption ${isCaptionDone ? 'cursor-hidden' : ''}`}>
              Some memories pass like shooting stars, but leave a sky full of wonder.
            </p>
          )}
        </div>

        <div className="media-controls">
          <div className="filters">
            <select className="dropdown">
              <option value="">Filter by Event</option>
              <option value="hackathon">Hackathon</option>
              <option value="seminar">Seminar</option>
              <option value="workshop">Workshop</option>
            </select>
            <select className="dropdown">
              <option value="">Filter by Date</option>
              <option value="2024-01">Jan 2024</option>
              <option value="2024-02">Feb 2024</option>
              <option value="2024-03">Mar 2024</option>
            </select>
          </div>
          <button className="upload-btn">Upload Media</button>
        </div>
        <div className="tiles-layout">
          {columns.map((col, i) => (
            <div key={i} className="tile-column">
              {col}
            </div>
          ))}
        </div>
      </div>
      

      <div className="slide-spacer"></div>
    </div>
  );
}

export default Media;
