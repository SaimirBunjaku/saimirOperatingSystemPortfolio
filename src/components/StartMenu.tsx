
import React from 'react';
import { User, FolderOpen, Code, Mail, FileText, Settings, LogOut } from 'lucide-react';

interface StartMenuProps {
  onOpenWindow: (windowId: string) => void;
  onClose: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onOpenWindow, onClose }) => {
  const menuItems = [
    { id: 'about', name: 'About Me', icon: User },
    { id: 'projects', name: 'Projects', icon: FolderOpen },
    { id: 'skills', name: 'Skills', icon: Code },
    { id: 'experience', name: 'Experience', icon: FileText },
    { id: 'contact', name: 'Contact', icon: Mail },
    { id: 'settings', name: 'Settings', icon: Settings }
  ];

  const handleItemClick = (itemId: string) => {
    onOpenWindow(itemId);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute bottom-12 left-0 w-80 bg-gray-900 bg-opacity-95 backdrop-blur-sm border border-gray-600 rounded-tr-lg shadow-2xl z-50">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-600">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="text-white font-medium">Saimir Bunjaku</div>
              <div className="text-gray-400 text-sm">Frontend Developer</div>
            </div>
          </div>
          
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="w-full flex items-center space-x-3 p-2 hover:bg-gray-700 rounded text-white transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default StartMenu;
