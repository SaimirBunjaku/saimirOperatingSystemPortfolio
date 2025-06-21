
import React from 'react';
import DesktopIcon from './DesktopIcon';
import ThemeToggle from './ThemeToggle';
import { User, FolderOpen, Code, Mail, FileText, Palette } from 'lucide-react';

interface DesktopProps {
  onOpenWindow: (windowId: string) => void;
}

const Desktop: React.FC<DesktopProps> = ({ onOpenWindow }) => {
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

  return (
    <div className="absolute inset-0 pb-12">
      {desktopIcons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          id={icon.id}
          name={icon.name}
          icon={icon.icon}
          position={icon.position}
          onDoubleClick={() => onOpenWindow(icon.id)}
        />
      ))}
      
      {/* Theme Toggle positioned in top right */}
      <div className="absolute top-4 right-4 flex flex-col items-center">
        <div className="bg-white bg-opacity-90 p-3 rounded-lg shadow-lg mb-1 hover:scale-105 transition-transform">
          <Palette className="w-8 h-8 text-blue-600 mb-2" />
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
