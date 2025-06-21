
import React, { useState, useEffect } from 'react';
import Window from './Window';
import AboutWindow from './windows/AboutWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import SkillsWindow from './windows/SkillsWindow';
import ExperienceWindow from './windows/ExperienceWindow';
import ContactWindow from './windows/ContactWindow';

interface WindowManagerProps {
  openWindows: string[];
  onCloseWindow: (windowId: string) => void;
  activeWindow?: string;
  onActivateWindow?: (windowId: string) => void;
}

const WindowManager: React.FC<WindowManagerProps> = ({ 
  openWindows, 
  onCloseWindow, 
  activeWindow,
  onActivateWindow 
}) => {
  const [minimizedWindows, setMinimizedWindows] = useState<Set<string>>(new Set());

  // Remove the effect that automatically un-minimizes windows when they become active
  // This was causing the immediate un-minimization issue

  const handleMinimize = (windowId: string, minimized: boolean) => {
    setMinimizedWindows(prev => {
      const newSet = new Set(prev);
      if (minimized) {
        newSet.add(windowId);
      } else {
        newSet.delete(windowId);
        onActivateWindow?.(windowId);
      }
      return newSet;
    });
  };

  // Add a function to toggle minimization from taskbar
  const toggleMinimize = (windowId: string) => {
    if (minimizedWindows.has(windowId)) {
      // If window is minimized, restore it and make it active
      setMinimizedWindows(prev => {
        const newSet = new Set(prev);
        newSet.delete(windowId);
        return newSet;
      });
      onActivateWindow?.(windowId);
    } else {
      // If window is visible, minimize it
      setMinimizedWindows(prev => {
        const newSet = new Set(prev);
        newSet.add(windowId);
        return newSet;
      });
    }
  };

  // Expose the toggleMinimize function to parent components
  useEffect(() => {
    // @ts-ignore - Adding a custom property to the window object
    window.toggleWindowMinimize = toggleMinimize;
    return () => {
      // @ts-ignore
      delete window.toggleWindowMinimize;
    };
  }, [minimizedWindows]);

  const getWindowContent = (windowId: string) => {
    switch (windowId) {
      case 'about':
        return <AboutWindow />;
      case 'projects':
        return <ProjectsWindow />;
      case 'skills':
        return <SkillsWindow />;
      case 'experience':
        return <ExperienceWindow />;
      case 'contact':
        return <ContactWindow />;
      default:
        return <div>Unknown window</div>;
    }
  };

  const getWindowTitle = (windowId: string) => {
    switch (windowId) {
      case 'about':
        return 'About Me';
      case 'projects':
        return 'My Projects';
      case 'skills':
        return 'Skills & Technologies';
      case 'experience':
        return 'Work Experience';
      case 'contact':
        return 'Contact Information';
      default:
        return windowId;
    }
  };

  return (
    <>
      {openWindows.map((windowId, index) => (
        <Window
          key={windowId}
          title={getWindowTitle(windowId)}
          onClose={() => onCloseWindow(windowId)}
          initialPosition={{ x: 100 + index * 30, y: 100 + index * 30 }}
          isMinimized={minimizedWindows.has(windowId)}
          onMinimize={(minimized) => handleMinimize(windowId, minimized)}
          isActive={activeWindow === windowId}
          onActivate={() => onActivateWindow?.(windowId)}
        >
          {getWindowContent(windowId)}
        </Window>
      ))}
    </>
  );
};

export default WindowManager;
