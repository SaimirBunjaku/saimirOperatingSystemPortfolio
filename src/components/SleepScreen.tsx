import React, { useState, useEffect } from 'react';

interface SleepScreenProps {
  onWake: () => void;
}

const SleepScreen: React.FC<SleepScreenProps> = ({ onWake }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Handle key press (Enter)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onWake();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onWake]);
  
  // Format time as HH:MM
  const formattedTime = currentTime.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  });
  
  // Format date as Day, Month Date
  const formattedDate = currentTime.toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div 
      className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center z-50 cursor-pointer"
      onClick={onWake}
    >
      <div className="text-center space-y-8">
        <div className="text-6xl font-light text-white mb-2">
          {formattedTime}
        </div>
        <div className="text-xl text-gray-300 mb-8">
          {formattedDate}
        </div>
        <div className="text-3xl font-bold text-white mb-12">
          Saimir Bunjaku's Portfolio
        </div>
        <div className="text-gray-400 text-lg animate-pulse mt-16">
          Click or press Enter to continue
        </div>
      </div>
    </div>
  );
};

export default SleepScreen;