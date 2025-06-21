
import React, { useState } from 'react';
import Desktop from '../components/Desktop';
import Taskbar from '../components/Taskbar';
import WindowManager from '../components/WindowManager';
import SleepScreen from '../components/SleepScreen';

const Index = () => {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [startMenuOpen, setStartMenuOpen] = useState(false);
  const [activeWindow, setActiveWindow] = useState<string | undefined>(undefined);
  const [isSleeping, setIsSleeping] = useState(true);

  const openWindow = (windowId: string) => {
    if (!openWindows.includes(windowId)) {
      setOpenWindows([...openWindows, windowId]);
    }
    setActiveWindow(windowId);
  };

  const closeWindow = (windowId: string) => {
    setOpenWindows(openWindows.filter(id => id !== windowId));
    if (activeWindow === windowId) {
      setActiveWindow(undefined);
    }
  };

  const activateWindow = (windowId: string) => {
    setActiveWindow(windowId);
  };

  const handleWake = () => {
    setIsSleeping(false);
  };

  return (
    <>
      {isSleeping ? (
        <SleepScreen onWake={handleWake} />
      ) : (
        <div className="h-screen w-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 dark:from-gray-800 dark:via-gray-900 dark:to-black overflow-hidden relative transition-colors duration-300">
          {/* Desktop wallpaper pattern */}
          <div className="absolute inset-0 opacity-10 dark:opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
              backgroundSize: '50px 50px'
            }} />
          </div>
          
          <Desktop onOpenWindow={openWindow} />
          <WindowManager 
            openWindows={openWindows} 
            onCloseWindow={closeWindow}
            activeWindow={activeWindow}
            onActivateWindow={activateWindow}
          />
          <Taskbar 
            openWindows={openWindows}
            onOpenWindow={openWindow}
            startMenuOpen={startMenuOpen}
            setStartMenuOpen={setStartMenuOpen}
            onActivateWindow={activateWindow}
          />
        </div>
      )}
    </>
  );
};

export default Index;
