
import React from 'react';
import DesktopIcon from './DesktopIcon';
import { User, FolderOpen, Code, Mail, FileText, Settings } from 'lucide-react';

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
    </div>
  );
};

export default Desktop;
