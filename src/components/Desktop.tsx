
import React from 'react';
import DesktopIcon from './DesktopIcon';
import ThemeToggle from './ThemeToggle';
import { User, FolderOpen, Code, Mail, FileText, Palette } from 'lucide-react';

interface DesktopProps {
  onOpenWindow: (windowId: string) => void;
  openWindows: string[];
  minimizedWindows: Set<string>;
  onRestoreWindow: (windowId: string) => void;
}

const Desktop: React.FC<DesktopProps> = ({ 
  onOpenWindow, 
  openWindows, 
  minimizedWindows, 
  onRestoreWindow 
}) => {
  const desktopIcons = [
    {
      id: 'about',
      name: 'About Me',
      icon: User,
      position: { x: 50, y: 50 }
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: FolderOpen,
      position: { x: 50, y: 150 }
    },
    {
      id: 'skills',
      name: 'Skills',
      icon: Code,
      position: { x: 50, y: 250 }
    },
    {
      id: 'experience',
      name: 'Experience',
      icon: FileText,
      position: { x: 50, y: 350 }
    },
    {
      id: 'contact',
      name: 'Contact',
      icon: Mail,
      position: { x: 50, y: 450 }
    }
  ];

  const handleIconDoubleClick = (windowId: string) => {
    // Check if the window is already open
    if (openWindows.includes(windowId)) {
      // If it's minimized, restore it
      if (minimizedWindows.has(windowId)) {
        onRestoreWindow(windowId);
      }
      // If it's already open and not minimized, just activate it
      // (this is handled by the WindowManager)
    } else {
      // If it's not open at all, open a new window
      onOpenWindow(windowId);
    }
  };

  return (
    <div className="absolute inset-0 pb-12">
      {desktopIcons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          id={icon.id}
          name={icon.name}
          icon={icon.icon}
          position={icon.position}
          onDoubleClick={() => handleIconDoubleClick(icon.id)}
        />
      ))}
      
      {/* Theme Toggle positioned in top right */}
      <div className="absolute top-4 right-4 flex flex-col items-center">
        <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 p-3 rounded-lg shadow-lg mb-1 hover:scale-105 transition-all duration-200">
          <Palette className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
          <ThemeToggle />
        </div>
        <span className="text-white text-xs font-medium text-center max-w-16 leading-tight drop-shadow-md">
          Theme
        </span>
      </div>
    </div>
  );
};

export default Desktop;
