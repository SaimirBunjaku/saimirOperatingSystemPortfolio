import React, { useState } from 'react';
import { Mail, ExternalLink, MapPin } from 'lucide-react';
import ImageModal from '../ImageModal';

interface ContactWindowProps {
  isMaximized?: boolean;
}

const ContactWindow: React.FC<ContactWindowProps> = ({ isMaximized }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  
  const contactMethods = [
    {
      type: 'Email',
      value: 'saimirbunjaku@gmail.com',
      icon: Mail,
      action: 'mailto:saimirbunjaku@gmail.com'
    },
    {
      type: 'LinkedIn',
      value: 'linkedin.com/in/saimirbunjaku',
      icon: ExternalLink,
      action: 'https://www.linkedin.com/in/saimirbunjaku/'
    },
    {
      type: 'Location',
      value: 'Kosovo, Gjilan',
      icon: MapPin,
      action: null
    }
  ];

  return (
    <div className={`space-y-6 ${isMaximized ? 'p-4' : ''}`}>
      <div className="text-center">
        <div 
          className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => setShowImageModal(true)}
          title="Click to view full image"
        >
          <img 
            src="/images/colprofil.jpg" 
            alt="Saimir Bunjaku" 
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Get In Touch</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Let's discuss your next project!</p>
      </div>

      {/* Responsive contact cards container */}
      <div className={`grid ${isMaximized ? 'grid-cols-3 gap-6' : 'grid-cols-1 gap-4'} transition-all duration-300`}>
        {contactMethods.map((contact, index) => (
          <div 
            key={index} 
            className={`flex flex-col p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
              isMaximized ? 'min-h-[180px]' : 'h-full'
            }`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <contact.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div className="font-medium text-gray-800 dark:text-gray-100 text-sm">
                {contact.type}
              </div>
            </div>
            <div className="text-gray-600 dark:text-gray-300 text-sm mb-3 flex-grow">
              {contact.value}
            </div>
            {contact.action && (
              <button
                onClick={() => window.open(contact.action, '_blank')}
                className="mt-auto text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors self-start"
              >
                Open
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Available for:</h3>
        <ul className="text-blue-700 dark:text-blue-300 text-sm space-y-1">
          <li>• Frontend Development Projects</li>
          <li>• React/TypeScript Consulting</li>
          <li>• Code Reviews & Mentoring</li>
          <li>• Freelance Opportunities</li>
        </ul>
      </div>

      {showImageModal && (
        <ImageModal 
          src="/images/colprofil.jpg" 
          alt="Saimir Bunjaku" 
          onClose={() => setShowImageModal(false)} 
        />
      )}
    </div>
  );
};

export default ContactWindow;