
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search } from 'lucide-react';
import StartMenu from './StartMenu';

interface TaskbarProps {
  openWindows: string[];
  onOpenWindow: (windowId: string) => void;
  startMenuOpen: boolean;
  setStartMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onActivateWindow: (windowId: string) => void;
  onReorderWindows?: (newOrder: string[]) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({
  openWindows,
  onOpenWindow,
  startMenuOpen,
  setStartMenuOpen,
  onActivateWindow,
  onReorderWindows
}) => {
  // Local state to manage window order
  const [windowOrder, setWindowOrder] = useState<string[]>(openWindows);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  
  // Update local order when openWindows changes (new windows added or closed)
  useEffect(() => {
    // Add any new windows that aren't in our order yet
    const newWindows = openWindows.filter(id => !windowOrder.includes(id));
    // Remove any windows that are no longer open
    const currentWindows = windowOrder.filter(id => openWindows.includes(id));
    
    if (newWindows.length > 0 || currentWindows.length !== windowOrder.length) {
      setWindowOrder([...currentWindows, ...newWindows]);
    }
  }, [openWindows, windowOrder]);

  const handleWindowClick = useCallback((windowId: string) => {
    // Use the global toggleMinimize function if available
    // @ts-ignore - Accessing custom property on window
    if (window.toggleWindowMinimize) {
      // @ts-ignore
      window.toggleWindowMinimize(windowId);
    } else {
      // Fallback to just activating the window
      onActivateWindow(windowId);
    }
  }, [onActivateWindow]);

  // Drag and drop handlers
  const handleDragStart = (e: React.DragEvent, windowId: string) => {
    setDraggedItem(windowId);
    e.dataTransfer.setData('text/plain', windowId);
    // Make the drag image transparent
    const dragImage = new Image();
    dragImage.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(dragImage, 0, 0);
  };

  const handleDragOver = (e: React.DragEvent, windowId: string) => {
    e.preventDefault();
    if (draggedItem === windowId) return;
    
    const draggedIndex = windowOrder.indexOf(draggedItem);
    const hoverIndex = windowOrder.indexOf(windowId);
    
    // Don't replace items with themselves
    if (draggedIndex === hoverIndex) return;
    
    // Time to actually perform the action
    const newOrder = [...windowOrder];
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(hoverIndex, 0, draggedItem);
    
    setWindowOrder(newOrder);
  };

  const handleDragEnd = () => {
    if (onReorderWindows) {
      onReorderWindows(windowOrder);
    }
    setDraggedItem(null);
  };

  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-800 dark:bg-gray-900 bg-opacity-95 backdrop-blur-sm border-t border-gray-600 dark:border-gray-700 flex items-center px-2 z-50 transition-colors duration-200">
        {/* Start Button */}
        <button
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className={`h-8 px-4 bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-700 rounded text-white text-sm font-medium transition-colors ${
            startMenuOpen ? 'bg-gray-600 dark:bg-gray-700' : ''
          }`}
        >
          Start
        </button>

        {/* Taskbar buttons for open windows - with drag and drop */}
        <div className="flex ml-2 space-x-1 overflow-x-auto flex-grow">
          <div className="flex space-x-1">
            {windowOrder.map((windowId) => (
              <div 
                key={windowId} 
                className="flex items-center"
                draggable
                onDragStart={(e) => handleDragStart(e, windowId)}
                onDragOver={(e) => handleDragOver(e, windowId)}
                onDragEnd={handleDragEnd}
              >
                <button
                  className={`h-8 px-3 bg-gray-600 dark:bg-gray-700 hover:bg-gray-500 dark:hover:bg-gray-600 rounded text-white text-xs capitalize transition-colors border border-gray-500 dark:border-gray-600 flex items-center cursor-grab ${
                    draggedItem === windowId ? 'opacity-50' : ''
                  }`}
                  onClick={() => handleWindowClick(windowId)}
                >
                  {windowId}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* System tray */}
        <div className="ml-auto flex items-center space-x-2">
          <button className="p-1 hover:bg-gray-700 dark:hover:bg-gray-800 rounded text-white">
            <Search className="w-4 h-4" />
          </button>
          <div className="text-white text-xs">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>

      {startMenuOpen && (
        <StartMenu onOpenWindow={onOpenWindow} onClose={() => setStartMenuOpen(false)} />
      )}
    </>
  );
};

export default Taskbar;
