
import React, { useState, useRef, useCallback } from 'react';
import { X, Minus, Maximize } from 'lucide-react';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  initialPosition?: { x: number; y: number };
}

const Window: React.FC<WindowProps> = ({ title, children, onClose, initialPosition = { x: 100, y: 100 } }) => {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isMaximized) return;
    
    setIsDragging(true);
    const rect = windowRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  }, [isMaximized]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging && !isMaximized) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  }, [isDragging, dragOffset, isMaximized]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized);
  };

  return (
    <div
      ref={windowRef}
      className={`absolute bg-white rounded-lg shadow-2xl border border-gray-300 z-30 ${
        isMaximized ? 'inset-4' : 'w-96 h-80'
      } ${isDragging ? 'select-none' : ''}`}
      style={isMaximized ? {} : { left: position.x, top: position.y }}
    >
      {/* Title bar */}
      <div
        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-t-lg flex items-center justify-between cursor-move"
        onMouseDown={handleMouseDown}
      >
        <span className="font-medium text-sm">{title}</span>
        <div className="flex space-x-1">
          <button
            className="w-6 h-6 bg-yellow-500 hover:bg-yellow-400 rounded-full flex items-center justify-center transition-colors"
            onClick={() => {}}
          >
            <Minus className="w-3 h-3 text-yellow-900" />
          </button>
          <button
            className="w-6 h-6 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center transition-colors"
            onClick={toggleMaximize}
          >
            <Maximize className="w-3 h-3 text-green-900" />
          </button>
          <button
            className="w-6 h-6 bg-red-500 hover:bg-red-400 rounded-full flex items-center justify-center transition-colors"
            onClick={onClose}
          >
            <X className="w-3 h-3 text-red-900" />
          </button>
        </div>
      </div>

      {/* Window content */}
      <div className="p-4 h-full overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Window;
