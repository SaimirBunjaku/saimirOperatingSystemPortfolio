
import React from 'react';
import { User, FolderOpen, Code, Mail, FileText, Palette, Gamepad } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface StartMenuProps {
  onOpenWindow: (windowId: string) => void;
  onClose: () => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onOpenWindow, onClose }) => {
  const menuItems = [
    { id: 'about', name: 'About Me', icon: User },
    // { id: 'projects', name: 'Projects', icon: FolderOpen },
    // { id: 'skills', name: 'Skills', icon: Code },
    { id: 'experience', name: 'Experience', icon: FileText },
    { id: 'contact', name: 'Contact', icon: Mail },
    // { id: 'games', name: 'Games', icon: Gamepad }
  ];

  const handleItemClick = (itemId: string) => {
    onOpenWindow(itemId);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute bottom-12 left-0 w-80 bg-gray-900 dark:bg-gray-800 bg-opacity-95 backdrop-blur-sm border border-gray-600 dark:border-gray-700 rounded-tr-lg shadow-2xl z-50 transition-colors duration-200">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-600 dark:border-gray-700">
            <div className="w-12 h-12 bg-blue-600 dark:bg-blue-700 rounded-full overflow-hidden">
              <img
                src="../../public/images/colprofil.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-white font-medium">Saimir Bunjaku</div>
              <div className="text-gray-400 dark:text-gray-300 text-sm">Frontend Developer</div>
            </div>
          </div>
          
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="w-full flex items-center space-x-3 p-2 hover:bg-gray-700 dark:hover:bg-gray-700 rounded text-white transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            ))}
            
            {/* Theme toggle section */}
            <div className="flex items-center justify-between p-2 text-white border-t border-gray-600 dark:border-gray-700 mt-2 pt-3">
              <div className="flex items-center space-x-3">
                <Palette className="w-5 h-5" />
                <span>Theme</span>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartMenu;
