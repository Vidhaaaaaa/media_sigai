// --- START OF FILE UploadModal.jsx (Updated) ---

import React, { useState } from 'react';
import './UploadModal.css';

const MAX_WORDS = 50;
const EVENT_TAGS = ['Hackathon', 'Seminar', 'Workshop']; // Define the available tags

function UploadModal({ onClose, onSubmit }) {
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [tag, setTag] = useState(''); // State for the selected tag
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');

  const countWords = (str) => {
    if (!str.trim()) return 0;
    return str.trim().split(/\s+/).length;
  };

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    if (countWords(text) <= MAX_WORDS) {
      setDescription(text);
    }
  };

  const processFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError('');
    } else {
      setError('Please upload a valid image file (e.g., JPG, PNG, GIF).');
    }
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!imageFile) {
      setError('An image is required to upload.');
      return;
    }
    if (!description.trim()) {
        setError('A description is required.');
        return;
    }
    // --- New validation for the tag ---
    if (!tag) {
        setError('Please select an event tag.');
        return;
    }
    // Pass the complete data to the parent component
    onSubmit({ image: imageFile, description, tag });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>×</button>
        <h2>Upload Your Memory</h2>

        <div
          className={`drag-drop-area ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('file-input').click()}
        >
          <input
            type="file"
            id="file-input"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleFileChange}
          />
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="image-preview" />
          ) : (
            <p>Drag & drop an image here, or click to select</p>
          )}
        </div>

        <textarea
          className="description-box"
          placeholder="Add a description..."
          value={description}
          onChange={handleDescriptionChange}
        />
        <div className="word-counter">
          {countWords(description)} / {MAX_WORDS} words
        </div>
        
        {/* --- New Tag Selector Dropdown --- */}
        <div className="tag-selector-container">
          <label htmlFor="tag-selector">Event Tag</label>
          <select 
            id="tag-selector" 
            className="tag-selector" 
            value={tag} 
            onChange={(e) => setTag(e.target.value)}
          >
            <option value="" disabled>Select a tag...</option>
            {EVENT_TAGS.map(eventTag => (
              <option key={eventTag} value={eventTag}>{eventTag}</option>
            ))}
          </select>
        </div>
        
        {error && <p className="error-message">{error}</p>}

        <button className="modal-submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default UploadModal;