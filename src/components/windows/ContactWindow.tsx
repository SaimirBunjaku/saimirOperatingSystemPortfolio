
import React from 'react';
import { Mail, ExternalLink, MapPin, User } from 'lucide-react';

const ContactWindow: React.FC = () => {
  const contactMethods = [
    {
      type: 'Email',
      value: 'saimir.bunjaku@example.com',
      icon: Mail,
      action: 'mailto:saimir.bunjaku@example.com'
    },
    {
      type: 'LinkedIn',
      value: 'linkedin.com/in/saimirbunjaku',
      icon: ExternalLink,
      action: 'https://www.linkedin.com/in/saimirbunjaku/'
    },
    {
      type: 'Location',
      value: 'Kosovo',
      icon: MapPin,
      action: null
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Get In Touch</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Let's discuss your next project!</p>
      </div>

      <div className="space-y-3">
        {contactMethods.map((contact, index) => (
          <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <div className="flex items-center space-x-3">
              <contact.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <div>
                <div className="font-medium text-gray-800 dark:text-gray-100 text-sm">{contact.type}</div>
                <div className="text-gray-600 dark:text-gray-300 text-sm">{contact.value}</div>
              </div>
            </div>
            {contact.action && (
              <button
                onClick={() => window.open(contact.action, '_blank')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors"
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
    </div>
  );
};

export default ContactWindow;
