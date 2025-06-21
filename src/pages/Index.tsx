
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
  const [minimizedWindows, setMinimizedWindows] = useState<Set<string>>(new Set());

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
    // Also remove from minimized windows if it was minimized
    if (minimizedWindows.has(windowId)) {
      const newMinimized = new Set(minimizedWindows);
      newMinimized.delete(windowId);
      setMinimizedWindows(newMinimized);
    }
  };

  const activateWindow = (windowId: string) => {
    setActiveWindow(windowId);
  };

  const handleWake = () => {
    setIsSleeping(false);
  };

  const handleReorderWindows = (newOrder: string[]) => {
    // Update the openWindows state with the new order
    setOpenWindows(newOrder);
  };

  // Add a function to handle window minimization
  const handleMinimizeWindow = (windowId: string, isMinimized: boolean) => {
    setMinimizedWindows(prev => {
      const newSet = new Set(prev);
      if (isMinimized) {
        newSet.add(windowId);
      } else {
        newSet.delete(windowId);
      }
      return newSet;
    });
  };

  // Add a function to restore a minimized window
  const restoreWindow = (windowId: string) => {
    setMinimizedWindows(prev => {
      const newSet = new Set(prev);
      newSet.delete(windowId);
      return newSet;
    });
    setActiveWindow(windowId);
  };

  return (
    <>
      {isSleeping ? (
        <SleepScreen onWake={handleWake} />
      ) : (
        <div className="relative h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900 dark:from-gray-900 dark:to-gray-800 text-white bg-dot-pattern dark:bg-dark-dot-pattern bg-dot-size">
          
          <Desktop 
            onOpenWindow={openWindow} 
            openWindows={openWindows}
            minimizedWindows={minimizedWindows}
            onRestoreWindow={restoreWindow}
          />
          <WindowManager 
            openWindows={openWindows} 
            onCloseWindow={closeWindow}
            activeWindow={activeWindow}
            onActivateWindow={activateWindow}
            minimizedWindows={minimizedWindows}
            onMinimizeWindow={handleMinimizeWindow}
          />
          <Taskbar 
            openWindows={openWindows}
            onOpenWindow={openWindow}
            startMenuOpen={startMenuOpen}
            setStartMenuOpen={setStartMenuOpen}
            onActivateWindow={activateWindow}
            onReorderWindows={handleReorderWindows}
          />
        </div>
      )}
    </>
  );
};

export default Index;
