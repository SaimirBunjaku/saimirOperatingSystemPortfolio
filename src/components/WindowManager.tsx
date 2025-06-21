
import React, { useState } from 'react';
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
        >
          {getWindowContent(windowId)}
        </Window>
      ))}
    </>
  );
};

export default WindowManager;
