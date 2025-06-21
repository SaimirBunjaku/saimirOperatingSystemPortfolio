
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { X, Minus, Maximize } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  initialPosition?: { x: number; y: number };
  isMinimized?: boolean;
  onMinimize?: (minimized: boolean) => void;
  isActive?: boolean;
  onActivate?: () => void;
}

const Window: React.FC<WindowProps> = ({ 
  title, 
  children, 
  onClose, 
  initialPosition = { x: 100, y: 100 },
  isMinimized = false,
  onMinimize,
  isActive = false,
  onActivate
}) => {
  const isMobile = useIsMobile();
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [zIndex, setZIndex] = useState(30);
  const windowRef = useRef<HTMLDivElement>(null);

  // Adjust position for mobile devices
  useEffect(() => {
    if (isMobile) {
      // On mobile, center the window horizontally and position near the top
      const mobilePosition = {
        x: 0, // Start at left edge
        y: 60  // Give some space from the top for status bar/browser UI
      };
      setPosition(mobilePosition);
      // Auto-maximize on mobile for better UX
      setIsMaximized(true);
    }
  }, [isMobile]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isMaximized) return;
    
    setIsDragging(true);
    setZIndex(50); // Bring to front when clicked
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
    if (isMinimized) {
      onMinimize?.(false);
    }
  };

  const toggleMinimize = () => {
    onMinimize?.(!isMinimized);
  };

  const handleWindowClick = () => {
    setZIndex(50); // Bring to front when any part of window is clicked
    if (isMinimized) {
      onMinimize?.(false);
    }
    onActivate?.();
  };

  if (isMinimized) {
    return null; // Hide window when minimized
  }

  return (
    <div
      ref={windowRef}
      className={`absolute bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-300 dark:border-gray-600 transition-colors duration-200 ${
        isMaximized ? 'inset-0 sm:inset-4' : 'w-full sm:w-96'
      } ${isDragging ? 'select-none' : ''}`}
      style={isMaximized ? { zIndex } : { 
        left: position.x, 
        top: position.y, 
        zIndex,
        height: isMobile ? '100%' : '400px',
        width: isMobile ? '100%' : undefined
      }}
      onClick={handleWindowClick}
    >
      {/* Window title bar */}
      <div 
        className="flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-t-lg cursor-move"
        onMouseDown={handleMouseDown}
      >
        <h3 className="font-medium text-gray-800 dark:text-gray-100 truncate">{title}</h3>
        <div className="flex items-center space-x-2">
          <button 
            className="w-6 h-6 bg-yellow-400 hover:bg-yellow-300 rounded-full flex items-center justify-center transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              toggleMinimize();
            }}
          >
            <Minus className="w-3 h-3 text-yellow-800" />
          </button>
          <button 
            className="w-6 h-6 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximize();
            }}
          >
            <Maximize className="w-3 h-3 text-green-900" />
          </button>
          <button 
            className="w-6 h-6 bg-red-500 hover:bg-red-400 rounded-full flex items-center justify-center transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <X className="w-3 h-3 text-red-900" />
          </button>
        </div>
      </div>

      {/* Window content */}
      <div className="p-4 overflow-hidden text-gray-900 dark:text-gray-100" style={{ 
        height: isMaximized ? 'calc(100% - 48px)' : isMobile ? 'calc(100% - 48px)' : 'calc(400px - 48px)' 
      }}>
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Window;
