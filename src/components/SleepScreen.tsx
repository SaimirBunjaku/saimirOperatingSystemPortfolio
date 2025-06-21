import React, { useState, useEffect } from 'react';

interface SleepScreenProps {
  onWake: () => void;
}

const SleepScreen: React.FC<SleepScreenProps> = ({ onWake }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeFadingOut, setWelcomeFadingOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') triggerWake();
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const triggerWake = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);

    // Step 1: Fade out time & info
    setTimeout(() => {
      setShowWelcome(true); // Step 2: Show Welcome

      // Step 3: Wait before fading out Welcome
      setTimeout(() => {
        setWelcomeFadingOut(true);

        // Step 4: After Welcome fades out, wake to desktop
        setTimeout(() => {
          onWake();
        }, 500); // Match fade-out duration
      }, 1000); // Show Welcome for 1s
    }, 600); // Time to fade out initial screen
  };

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const formattedDate = currentTime.toLocaleDateString([], {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div
      className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center z-50 cursor-pointer"
      onClick={triggerWake}
    >
      {!showWelcome ? (
        <div
          className={`transition-opacity duration-500 text-center space-y-8 ${
            isFadingOut ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="text-6xl font-light text-white">{formattedTime}</div>
          <div className="text-xl text-gray-300">{formattedDate}</div>
          <div className="text-3xl font-bold text-white">Saimir Bunjaku&apos;s Portfolio</div>
          <div className="text-gray-400 text-lg animate-pulse mt-16">
            Click or press Enter to continue
          </div>
        </div>
      ) : (
        <div
          className={`text-6xl font-bold text-white transition-opacity duration-500 ${
            welcomeFadingOut ? 'opacity-0' : 'opacity-100'
          }`}
        >
          Welcome
        </div>
      )}
    </div>
  );
};

export default SleepScreen;
