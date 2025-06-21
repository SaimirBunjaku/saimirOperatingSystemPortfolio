import React from 'react';
import { LucideIcon } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface DesktopIconProps {
  id: string;
  name: React.ReactNode;
  icon: LucideIcon;
  position: { x: number; y: number };
  onDoubleClick: () => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  id,
  name,
  icon: Icon,
  position,
  onDoubleClick,
  isSelected,
  onSelect,
}) => {
  const isMobile = useIsMobile();

  const handleClick = () => {
    onSelect(id);
    if (isMobile && isSelected) {
      // If already selected on mobile, tap again to open
      onDoubleClick();
    }
  };

  return (
    <div
      className="absolute cursor-pointer select-none group"
      style={{ left: position.x, top: position.y }}
      onClick={handleClick}
      onDoubleClick={isMobile ? undefined : onDoubleClick}
    >
      <div
        className={`flex flex-col items-center p-2 rounded ${
          isSelected ? 'bg-blue-500 bg-opacity-30' : ''
        } hover:bg-blue-400 hover:bg-opacity-20 transition-colors`}
      >
        <div className="bg-white bg-opacity-90 p-3 rounded-lg shadow-lg mb-1 group-hover:scale-105 transition-transform">
          <Icon className="w-8 h-8 text-blue-600" />
        </div>
        <span className="text-white text-xs font-medium text-center max-w-16 leading-tight drop-shadow-md">
          {name}
        </span>

        {isMobile && isSelected && (
          <div className="mt-1 text-xs text-white bg-blue-600 px-2 py-0.5 rounded-full">
            Tap again to open
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopIcon;
