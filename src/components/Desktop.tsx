import React, { useState, useEffect, useRef } from 'react';
import DesktopIcon from './DesktopIcon';
import ThemeToggle from './ThemeToggle';
import MusicPlayer from './MusicPlayer';
import { User, FolderOpen, Code, Mail, FileText, Palette, Gamepad } from 'lucide-react';

interface DesktopProps {
  onOpenWindow: (windowId: string) => void;
  openWindows: string[];
  minimizedWindows: Set<string>;
  onRestoreWindow: (windowId: string) => void;
}

interface IconData {
  id: string;
  icon: any;
  position: { x: number; y: number };
}

const Desktop: React.FC<DesktopProps> = ({
  onOpenWindow,
  openWindows,
  minimizedWindows,
  onRestoreWindow,
}) => {
  const desktopRef = useRef<HTMLDivElement>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    iconId: string | null;
  } | null>(null);

  const [iconNames, setIconNames] = useState<Record<string, string>>({
    about: 'About Me',
    projects: 'Projects',
    skills: 'Skills',
    experience: 'Experience',
    contact: 'Contact',
    games: 'Games',
  });

  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState<string>('');
  const [selectedIconId, setSelectedIconId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const [icons, setIcons] = useState<IconData[]>([
    { id: 'about', icon: User, position: { x: 50, y: 50 } },
    { id: 'projects', icon: FolderOpen, position: { x: 50, y: 150 } },
    { id: 'skills', icon: Code, position: { x: 50, y: 250 } },
    { id: 'experience', icon: FileText, position: { x: 50, y: 350 } },
    { id: 'contact', icon: Mail, position: { x: 50, y: 450 } },
    { id: 'games', icon: Gamepad, position: { x: 50, y: 550 } },
  ]);

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
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY, iconId });
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
      setIconNames((prev) => ({
        ...prev,
        [renamingId]: renameValue.trim() || prev[renamingId],
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

  const handleSelectIcon = (id: string) => {
    setSelectedIconId(id);
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('iconId', id);
    setDraggingId(id);
    
    // Calculate offset from mouse position to icon position
    const iconElement = e.currentTarget as HTMLElement;
    const rect = iconElement.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    // Use a transparent image for better drag visuals
    const dragImage = new Image();
    dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggingId || !desktopRef.current) return;

    const desktopRect = desktopRef.current.getBoundingClientRect();
    const newX = e.clientX - desktopRect.left - dragOffset.x;
    const newY = e.clientY - desktopRect.top - dragOffset.y;

    setIcons(prev => prev.map(icon =>
      icon.id === draggingId ? { ...icon, position: { x: newX, y: newY } } : icon
    ));
  };

  const handleDragEnd = () => {
    setDraggingId(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggingId(null);
  };

  useEffect(() => {
    const handleClick = () => {
      setContextMenu(null);
      setSelectedIconId(null);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div
      ref={desktopRef}
      className="absolute inset-0 pb-12"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {icons.map((icon) => (
        <div
          key={icon.id}
          style={{ 
            position: 'absolute', 
            left: icon.position.x, 
            top: icon.position.y,
            cursor: draggingId === icon.id ? 'grabbing' : 'pointer'
          }}
          onDoubleClick={() => handleIconDoubleClick(icon.id)}
          onContextMenu={(e) => handleIconRightClick(e, icon.id)}
          onClick={(e) => {
            e.stopPropagation();
            handleSelectIcon(icon.id);
          }}
          draggable
          onDragStart={(e) => handleDragStart(e, icon.id)}
          onDragEnd={handleDragEnd}
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
            isSelected={selectedIconId === icon.id}
            onSelect={handleSelectIcon}
            isDragging={draggingId === icon.id}
          />
        </div>
      ))}

      {contextMenu && (
        <ul
          className="absolute bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg z-50 text-sm"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
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