
import React from 'react';
import { Calendar, MapPin, Building } from 'lucide-react';

const ExperienceWindow: React.FC = () => {
  const experiences = [
    {
      title: 'Front-end Developer',
      company: 'Cloudarina',
      period: 'April 2023 - Current',
      location: 'Prishtine - Remote',
      description: 'Leading the development of responsive interfaces using HTML, CSS and jQuery, ensuring functionality across diverse devices and browsers.',
      achievements: [
        'Converted client designs into pixel-perfect, reusable web components',
        'Refactored the entire codebase, optimizing functions for better performance',
        'Increased efficiency and reduced redundancy across the platform'
      ]
    },
    {
      title: 'Contract Specialist',
      company: 'Kosbit',
      period: 'May 2020 – Current',
      location: 'Prishtine - Remote',
      description: 'Managing contract development and standardization for enhanced organizational consistency.',
      achievements: [
        'Developed and standardized contract templates for enhanced organizational consistency',
        'Orchestrated negotiation and finalization of 1000+ contracts',
        'Reduced procurement costs through strategic contract management'
      ]
    },
    {
      title: 'Full-stack Developer - Internship',
      company: 'Starlabs',
      period: 'January-April, 2023',
      location: 'Prishtine - Remote',
      description: 'Developed a full-stack web application utilizing the MERN (MongoDB, Express.js, React and Node.js) stack.',
      achievements: [
        'Collaborated with the team on building RESTful APIs with Express.js and Node.js',
        'Facilitated smooth data flow between frontend and backend',
        'Managed MongoDB database schema for efficient storage and retrieval of user preferences and game data'
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Work Experience</h2>
      
      <div className="space-y-4 max-h-full overflow-y-auto">
        {experiences.map((exp, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">{exp.title}</h3>
                <div className="flex items-center space-x-1 text-blue-600 dark:text-blue-400">
                  <Building className="w-4 h-4" />
                  <span className="text-sm">{exp.company}</span>
                </div>
              </div>
              {index === 0 && (
                <span className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 text-xs px-2 py-1 rounded">
                  Current
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-3">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{exp.period}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{exp.location}</span>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{exp.description}</p>
            
            <div>
              <h4 className="font-medium text-gray-800 dark:text-gray-100 text-sm mb-2">Key Achievements:</h4>
              <ul className="list-disc list-inside text-xs text-gray-600 dark:text-gray-300 space-y-1">
                {exp.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceWindow;
