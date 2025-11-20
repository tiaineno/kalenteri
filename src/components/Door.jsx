import { useState } from 'react';
import './Door.css';

const Door = ({ day, isUnlocked, isOpened, onOpen, content }) => {
  const [isFlipping, setIsFlipping] = useState(false);

  const handleClick = () => {
    if (isUnlocked && !isFlipping) {
      setIsFlipping(true);
      setTimeout(() => {
        onOpen(content);
        setIsFlipping(false);
      }, 600);
    }
  };

  return (
    <div 
      className={`door ${isUnlocked ? 'unlocked' : 'locked'} ${isFlipping ? 'flipping' : ''} ${isOpened ? 'opened' : ''}`}
      onClick={handleClick}
    >
      <div className="door-inner">
        {/* Front of the door */}
        <div className="door-front">
          {isOpened ? (
            <div className="door-thumbnail">
              {content.type === 'image' ? (
                <img src={content.url} alt={`Day ${day}`} />
              ) : (
                <div className="video-thumbnail">
                  <video src={content.url} />
                  <div className="play-icon">▶</div>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="door-number">{day}</div>
              <div className="door-decoration">
                {isUnlocked ? '🎄' : '🔒'}
              </div>
            </>
          )}
        </div>
        
        {/* Back of the door (revealed when flipping) */}
        <div className="door-back">
          <div className="door-surprise">🎁</div>
        </div>
      </div>
    </div>
  );
};

export default Door;
