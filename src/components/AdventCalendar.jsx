import { useState, useEffect } from 'react';
import Door from './Door';
import MediaModal from './MediaModal';
import { calendarData } from '../data/calendarData';
import './AdventCalendar.css';

const AdventCalendar = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  
  // Load opened doors from localStorage on initial render
  const [openedDoors, setOpenedDoors] = useState(() => {
    const saved = localStorage.getItem('adventCalendarOpenedDoors');
    if (saved) {
      try {
        return new Set(JSON.parse(saved));
      } catch (e) {
        return new Set();
      }
    }
    return new Set();
  });
  
  // Save opened doors to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('adventCalendarOpenedDoors', JSON.stringify([...openedDoors]));
  }, [openedDoors]);
  
  // Get current date (for testing, you can modify this)
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth(); // 0-indexed (11 = December)
  
  // Determine which doors should be unlocked
  // Only unlock if we're in December and the day has arrived
  const isDoorUnlocked = (day) => {
    // For testing: unlock all doors
    // return true;
    
    // For production: only unlock if it's December and day has arrived
    if (currentMonth === 10) { // December
      return day <= currentDay;
    }
    return false; // Lock all doors if not December
  };

  const handleDoorOpen = (content) => {
    setOpenedDoors(prev => {
      const newSet = new Set([...prev, content.day]);
      return newSet;
    });
    setSelectedContent(content);
  };

  const handleCloseModal = () => {
    setSelectedContent(null);
  };

  return (
    <div className="advent-calendar-container">
      <header className="calendar-header">
        <h1>🎄 Advent Calendar 2025 🎄</h1>
        <p className="calendar-subtitle">Open a new surprise each day!</p>
      </header>

      <div className="calendar-grid">
        {calendarData.map((item) => (
          <Door
            key={item.day}
            day={item.day}
            isUnlocked={isDoorUnlocked(item.day)}
            isOpened={openedDoors.has(item.day)}
            onOpen={handleDoorOpen}
            content={item}
          />
        ))}
      </div>

      <MediaModal content={selectedContent} onClose={handleCloseModal} />
    </div>
  );
};

export default AdventCalendar;
