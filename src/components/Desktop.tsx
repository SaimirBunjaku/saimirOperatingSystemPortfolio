import React, { useState, useEffect } from 'react';
import DesktopIcon from './DesktopIcon';
import ThemeToggle from './ThemeToggle';
import MusicPlayer from './MusicPlayer';
import { User, FolderOpen, Code, Mail, Clipboard, FileText, Palette, Gamepad } from 'lucide-react';

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
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    iconId: string | null;
  } | null>(null);

  // We move icon names to state for renaming
  const [iconNames, setIconNames] = useState<Record<string, string>>({
    about: 'About Me',
    projects: 'Projects',
    skills: 'Skills',
    experience: 'Experience',
    contact: 'Contact',
    games: 'Games',
    resume: 'CV Resume',
  });

  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState<string>('');

  const desktopIcons = [
    {
      id: 'about',
      icon: User,
      position: { x: 50, y: 50 }
    },
    {
      id: 'projects',
      icon: FolderOpen,
      position: { x: 50, y: 150 }
    },
    {
      id: 'skills',
      icon: Code,
      position: { x: 50, y: 250 }
    },
    {
      id: 'experience',
      icon: Clipboard,
      position: { x: 50, y: 350 }
    },
    {
      id: 'contact',
      icon: Mail,
      position: { x: 50, y: 450 }
    },
    {
      id: 'games',
      icon: Gamepad,
      position: { x: 50, y: 550 }
    },
    {
      id: 'resume',
      icon: FileText,  // or use any icon you like
      position: { x: 50, y: 650 }
    },
  ];

  const handleIconDoubleClick = (windowId: string) => {
    if (openWindows.includes(windowId)) {
      if (minimizedWindows.has(windowId)) {
        onRestoreWindow(windowId);
      }
    } else {
      onOpenWindow(windowId);
    }
  };

  const handleIconRightClick = (e: React.MouseEvent, iconId: string) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      iconId,
    });
  };

  const handleOpen = () => {
    if (contextMenu?.iconId) {
      handleIconDoubleClick(contextMenu.iconId);
      setContextMenu(null);
    }
  };

  const handleRename = () => {
    if (contextMenu?.iconId) {
      setRenamingId(contextMenu.iconId);
      setRenameValue(iconNames[contextMenu.iconId]);
      setContextMenu(null);
    }
  };

  const handleRenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRenameValue(e.target.value);
  };

  const handleRenameSubmit = () => {
    if (renamingId) {
      setIconNames(prev => ({
        ...prev,
        [renamingId]: renameValue.trim() || prev[renamingId], // fallback if empty
      }));
      setRenamingId(null);
      setRenameValue('');
    }
  };

  const handleRenameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleRenameSubmit();
    } else if (e.key === 'Escape') {
      setRenamingId(null);
      setRenameValue('');
    }
  };

  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="absolute inset-0 pb-12">
      {desktopIcons.map((icon) => (
        <div
          key={icon.id}
          style={{ position: 'absolute', left: icon.position.x, top: icon.position.y }}
          onDoubleClick={() => handleIconDoubleClick(icon.id)}
          onContextMenu={(e) => handleIconRightClick(e, icon.id)}
        >
          <DesktopIcon
            id={icon.id}
            name={
              renamingId === icon.id ? (
                <input
                  type="text"
                  value={renameValue}
                  autoFocus
                  onChange={handleRenameChange}
                  onBlur={handleRenameSubmit}
                  onKeyDown={handleRenameKeyDown}
                  className="bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded px-1 outline-none w-full text-center text-xs"
                  style={{ maxWidth: 80 }}
                />
              ) : (
                iconNames[icon.id]
              )
            }
            icon={icon.icon}
            position={{ x: 0, y: 0 }}
            onDoubleClick={() => handleIconDoubleClick(icon.id)}
          />
        </div>
      ))}

      {contextMenu && (
        <ul
          className="absolute bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg z-50 text-sm"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <li
            onClick={handleOpen}
            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            Open
          </li>
          <li
            onClick={handleRename}
            className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            Rename
          </li>
        </ul>
      )}

      <div className="absolute top-4 right-4 flex flex-col items-center">
        <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 p-3 rounded-lg shadow-lg mb-1 hover:scale-105 transition-all duration-200">
          <Palette className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
          <ThemeToggle />
        </div>
        <span className="text-white text-xs font-medium text-center max-w-16 leading-tight drop-shadow-md">
          Theme
        </span>
      </div>

      <MusicPlayer />
    </div>
  );
};

export default Desktop;
