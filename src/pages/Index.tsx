
import React, { useState } from 'react';
import Desktop from '../components/Desktop';
import Taskbar from '../components/Taskbar';
import WindowManager from '../components/WindowManager';

const Index = () => {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  const openWindow = (windowId: string) => {
    if (!openWindows.includes(windowId)) {
      setOpenWindows([...openWindows, windowId]);
    }
  };

  const closeWindow = (windowId: string) => {
    setOpenWindows(openWindows.filter(id => id !== windowId));
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 overflow-hidden relative">
      {/* Desktop wallpaper pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      <Desktop onOpenWindow={openWindow} />
      <WindowManager 
        openWindows={openWindows} 
        onCloseWindow={closeWindow}
      />
      <Taskbar 
        openWindows={openWindows}
        onOpenWindow={openWindow}
        startMenuOpen={startMenuOpen}
        setStartMenuOpen={setStartMenuOpen}
      />
    </div>
  );
};

export default Index;
