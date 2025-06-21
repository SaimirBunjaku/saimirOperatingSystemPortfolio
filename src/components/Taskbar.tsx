
import React from 'react';
import { Search, Settings, User } from 'lucide-react';
import StartMenu from './StartMenu';

interface TaskbarProps {
  openWindows: string[];
  onOpenWindow: (windowId: string) => void;
  startMenuOpen: boolean;
  setStartMenuOpen: (open: boolean) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({
  openWindows,
  onOpenWindow,
  startMenuOpen,
  setStartMenuOpen
}) => {
  return (
    <>
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gray-800 bg-opacity-95 backdrop-blur-sm border-t border-gray-600 flex items-center px-2 z-50">
        {/* Start Button */}
        <button
          onClick={() => setStartMenuOpen(!startMenuOpen)}
          className={`h-8 px-4 bg-gray-700 hover:bg-gray-600 rounded text-white text-sm font-medium transition-colors ${
            startMenuOpen ? 'bg-gray-600' : ''
          }`}
        >
          Start
        </button>

        {/* Taskbar buttons for open windows */}
        <div className="flex ml-2 space-x-1">
          {openWindows.map((windowId) => (
            <button
              key={windowId}
              className="h-8 px-3 bg-gray-600 hover:bg-gray-500 rounded text-white text-xs capitalize transition-colors"
              onClick={() => onOpenWindow(windowId)}
            >
              {windowId}
            </button>
          ))}
        </div>

        {/* System tray */}
        <div className="ml-auto flex items-center space-x-2">
          <button className="p-1 hover:bg-gray-700 rounded text-white">
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
