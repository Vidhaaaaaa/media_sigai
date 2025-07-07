import React, { useState, useEffect } from 'react';
import './TileModal.css';

const TileModal = ({ tile, onClose }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(tile.comments || []);
  }, [tile]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const updatedComments = [...comments, { user: 'You', text: newComment }];
    setComments(updatedComments);
    setNewComment('');
  };

  return (
    <div className="tile-modal" onClick={onClose}>
      <div className="tile-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-left">
          <img src={tile.image} alt="Tile" />
        </div>
        <div className="modal-right">
          <div className="tile-info">
            <h3>{tile.description}</h3>
            <p>
              <strong>{tile.name}</strong> • {tile.dateTag} • {tile.eveTag}
            </p>
          </div>
          <div className="tile-comments">
            {comments.map((c, i) => (
              <p key={i}>
                <strong>{c.user}:</strong> {c.text}
              </p>
            ))}
          </div>
          <div className="comment-input">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
            />
            <button onClick={handleAddComment}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TileModal;
