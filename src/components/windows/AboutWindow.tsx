
import React from 'react';
import { MapPin, Calendar, Code } from 'lucide-react';

const AboutWindow: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white text-2xl font-bold">SB</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Saimir Bunjaku</h2>
          <p className="text-blue-600 dark:text-blue-400 font-medium">Frontend Developer</p>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>Kosovo</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>3+ Years Experience</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">About Me</h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Passionate Frontend Developer with expertise in React, TypeScript, and modern web technologies. 
            I love creating intuitive user interfaces and bringing designs to life with clean, efficient code. 
            Always eager to learn new technologies and improve user experiences.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">What I Do</h3>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              <span className="text-gray-700 dark:text-gray-300">Frontend Development</span>
            </div>
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-green-500 dark:text-green-400" />
              <span className="text-gray-700 dark:text-gray-300">React & TypeScript</span>
            </div>
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-purple-500 dark:text-purple-400" />
              <span className="text-gray-700 dark:text-gray-300">UI/UX Implementation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutWindow;
