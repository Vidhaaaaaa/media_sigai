// --- START OF FILE Media.jsx (Updated) ---

import React, { useState, useEffect } from 'react';
import NightSky from './NightSky';
import Tile from './tile'; 
import './Media.css';
import TileModal from './TileModal';
import UploadModal from './UploadModal';

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
  const [selectedTile, setSelectedTile] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  


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
    const marker = document.querySelector('.tile-trigger-marker');
    if (!marker) return;
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setBackground('#000000'); 
          } else {
            setBackground('#1E332D'); 
          }
        });
      },
      {
        threshold: 0.5,
      }
    );
  
    observer.observe(marker);
  
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // The 'data' object now includes the 'tag' property
  const handleUploadSubmit = (data) => {
    console.log("New media to upload:", data);
    // data is { image: File, description: "...", tag: "..." }
    // Handle the file upload to a server here.
    setIsUploadModalOpen(false);
  };

  const tiles = [
    { image: '/87205.jpg', description: 'Sunset vibes', name: 'Vidha', dateTag: 'June 2024', eveTag: 'Hackathon' },
    { image: '/87205.jpg', description: 'Learning React', name: 'Dev', dateTag: 'May 2024', eveTag: 'Workshop' },
    { image: '/87205.jpg', description: 'Night Sky', name: 'Skywatcher', dateTag: 'April 2024', eveTag: 'Seminar' },
    { image: '/87205.jpg', description: 'More Vibes', name: 'Chill', dateTag: 'March 2024', eveTag: 'Event' },
    { image: '/87205.jpg', description: 'Night Sky', name: 'Skywatcher', dateTag: 'April 2024', eveTag: 'Seminar' },
    { image: '/87205.jpg', description: 'More Vibes', name: 'Chill', dateTag: 'March 2024', eveTag: 'Event' },
    { image: '/87205.jpg', description: 'Night Sky', name: 'Skywatcher', dateTag: 'April 2024', eveTag: 'Seminar' },
    { image: '/87205.jpg', description: 'More Vibes', name: 'Chill', dateTag: 'March 2024', eveTag: 'Event' },
    { image: '/eif.jpg', description: 'Night Sky', name: 'Skywatcher', dateTag: 'April 2024', eveTag: 'Seminar' },
    { image: '/87205.jpg', description: 'More Vibes', name: 'Chill', dateTag: 'March 2024', eveTag: 'Event' },
    { image: '/87205.jpg', description: 'Night Sky', name: 'Skywatcher', dateTag: 'April 2024', eveTag: 'Seminar' },
    { image: '/87205.jpg', description: 'More Vibes', name: 'Chill', dateTag: 'March 2024', eveTag: 'Event' },
    { image: '/hello.gif', description: 'Night Sky', name: 'Skywatcher', dateTag: 'April 2024', eveTag: 'Seminar' },
    { image: '/eif.jpg', description: 'More Vibes', name: 'Chill', dateTag: 'March 2024', eveTag: 'Event' }
  ];

  const columns = [[], [], []];
  // 🔎 Apply filters before rendering
const filteredTiles = tiles.filter((tile) => {
  const eventMatch = selectedEvent ? tile.eveTag.toLowerCase() === selectedEvent.toLowerCase() : true;
  const dateMatch = selectedDate ? tile.dateTag.includes(selectedDate) : true;
  return eventMatch && dateMatch;
});

// 💡 Distribute filtered tiles into 3 columns
columns.forEach(col => col.length = 0); // clear columns before filling

filteredTiles.forEach((tile, index) => {
  columns[index % 3].unshift(
    <Tile
      key={index}
      image={tile.image}
      description={tile.description}
      name={tile.name}
      dateTag={tile.dateTag}
      eveTag={tile.eveTag}
      onClick={() => setSelectedTile(tile)}
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
  <select
    className="dropdown"
    value={selectedEvent}
    onChange={(e) => setSelectedEvent(e.target.value)}
  >
    <option value="">Filter by Event</option>
    <option value="Hackathon">Hackathon</option>
    <option value="Seminar">Seminar</option>
    <option value="Workshop">Workshop</option>
    <option value="Event">Other Event</option>
  </select>

  <select
    className="dropdown"
    value={selectedDate}
    onChange={(e) => setSelectedDate(e.target.value)}
  >
    <option value="">Filter by Date</option>
    <option value="June 2024">June 2024</option>
    <option value="May 2024">May 2024</option>
    <option value="April 2024">April 2024</option>
    <option value="March 2024">March 2024</option>
  </select>
</div>

          <button className="upload-btn" onClick={() => setIsUploadModalOpen(true)}>
              Upload Media
          </button>
        </div>
        <div className="tiles-layout">
        <div className="tile-trigger-marker" /> 
          {columns.map((col, i) => (
            <div key={i} className="tile-column">
              {col}
            </div>
          ))}
        </div>
      </div>
      <div className="slide-spacer"></div>
      <footer className="simple-footer">
        <p>Developed by <strong>MUJ SIGAI WebDev Team</strong> 💻</p>
        <div className="footer-links">
            <a href="mailto:sigai@muj.manipal.edu" target="_blank" rel="noopener noreferrer">Email</a>
            <a href="https://www.linkedin.com/company/sigai-muj/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/sigai.muj/" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </footer>

      {selectedTile && (
        <TileModal tile={selectedTile} onClose={() => setSelectedTile(null)} /> 
      )}

      {isUploadModalOpen && (
        <UploadModal 
          onClose={() => setIsUploadModalOpen(false)} 
          onSubmit={handleUploadSubmit}
        />
      )}
    </div>
  );
}

export default Media;