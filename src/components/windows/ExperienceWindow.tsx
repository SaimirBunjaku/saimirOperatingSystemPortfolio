
import React from 'react';
import { Calendar, MapPin, Building } from 'lucide-react';

const ExperienceWindow: React.FC = () => {
  const experiences = [
    {
      title: 'Frontend Developer',
      company: 'Tech Solutions',
      period: '2022 - Present',
      location: 'Remote',
      description: 'Developing modern web applications using React, TypeScript, and other cutting-edge technologies.',
      achievements: [
        'Built responsive user interfaces for 10+ client projects',
        'Improved application performance by 40%',
        'Collaborated with design team to implement pixel-perfect UIs'
      ]
    },
    {
      title: 'Junior Frontend Developer',
      company: 'Digital Agency',
      period: '2021 - 2022',
      location: 'Kosovo',
      description: 'Started my professional journey developing websites and web applications.',
      achievements: [
        'Converted designs to functional React components',
        'Maintained and updated existing codebases',
        'Learned industry best practices and coding standards'
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Work Experience</h2>
      
      <div className="space-y-4 max-h-64 overflow-y-auto">
        {experiences.map((exp, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-800">{exp.title}</h3>
                <div className="flex items-center space-x-1 text-blue-600">
                  <Building className="w-4 h-4" />
                  <span className="text-sm">{exp.company}</span>
                </div>
              </div>
              <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                Current
              </span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{exp.period}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{exp.location}</span>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-3">{exp.description}</p>
            
            <div>
              <h4 className="font-medium text-gray-800 text-sm mb-2">Key Achievements:</h4>
              <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
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
