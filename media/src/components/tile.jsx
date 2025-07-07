import React, { useEffect, useRef, useState } from 'react';
import './tile.css';

function Tile({ image, description, name, dateTag, eveTag }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`tile ${visible ? 'fade-in' : 'hidden'}`}>
      <img src={image} alt={description} className="tile-image" />
      <div className="tile-text">
        <p className="tile-description">{description}</p>
        <p className="tile-name"> ~ {name}</p>
        <hr className="tile-hr" />
        <p className="tile-date-tag">{dateTag}</p>
        <p className="tile-eve-tag">{eveTag}</p>
      </div>
    </div>
  );
}

export default Tile;