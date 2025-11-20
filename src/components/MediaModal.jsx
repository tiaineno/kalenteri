import { useEffect } from 'react';
import './MediaModal.css';

const MediaModal = ({ content, onClose }) => {
  useEffect(() => {
    // Close modal on ESC key
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!content) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2 className="modal-title">{content.title}</h2>
        
        <div className="modal-media">
          {content.type === 'image' ? (
            <img src={content.url} alt={content.title} />
          ) : (
            <video controls autoPlay>
              <source src={content.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        
        <p className="modal-day">Day {content.day} of Advent</p>
      </div>
    </div>
  );
};

export default MediaModal;
