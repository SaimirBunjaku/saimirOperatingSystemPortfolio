
import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface DesktopIconProps {
  id: string;
  name: string;
  icon: LucideIcon;
  position: { x: number; y: number };
  onDoubleClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({
  name,
  icon: Icon,
  position,
  onDoubleClick
}) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className={`absolute cursor-pointer select-none group`}
      style={{ left: position.x, top: position.y }}
      onClick={() => setIsSelected(!isSelected)}
      onDoubleClick={onDoubleClick}
    >
      <div className={`flex flex-col items-center p-2 rounded ${
        isSelected ? 'bg-blue-500 bg-opacity-30' : ''
      } hover:bg-blue-400 hover:bg-opacity-20 transition-colors`}>
        <div className="bg-white bg-opacity-90 p-3 rounded-lg shadow-lg mb-1 group-hover:scale-105 transition-transform">
          <Icon className="w-8 h-8 text-blue-600" />
        </div>
        <span className="text-white text-xs font-medium text-center max-w-16 leading-tight drop-shadow-md">
          {name}
        </span>
      </div>
    </div>
  );
};

export default DesktopIcon;
