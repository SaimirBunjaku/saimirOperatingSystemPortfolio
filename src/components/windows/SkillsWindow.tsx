
import React from 'react';
import { Code, Settings, Palette } from 'lucide-react';

const SkillsWindow: React.FC = () => {
  const skillCategories = [
    {
      title: 'Frontend Technologies',
      icon: Code,
      skills: ['React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Next.js']
    },
    {
      title: 'Tools & Workflow',
      icon: Settings,
      skills: ['Git', 'VS Code', 'Webpack', 'Vite', 'npm/yarn', 'Figma', 'Chrome DevTools']
    },
    {
      title: 'Design & UI',
      icon: Palette,
      skills: ['Responsive Design', 'UI/UX Principles', 'Component Libraries', 'CSS Animation']
    }
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Skills & Technologies</h2>
      
      {/* Make this div flex-grow to fill available space and ensure proper scrolling */}
      <div className="space-y-4 overflow-y-auto flex-grow pr-1">
        {skillCategories.map((category, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700">
            <div className="flex items-center space-x-2 mb-3">
              <category.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">{category.title}</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span 
                  key={skill} 
                  className="bg-blue-100 dark:bg-blue-700 text-blue-800 dark:text-blue-100 text-sm px-3 py-1 rounded-full border border-blue-200 dark:border-blue-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Currently Learning</h3>
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full">React Native</span>
            <span className="bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full">GraphQL</span>
            <span className="bg-blue-200 dark:bg-blue-700 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full">Three.js</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsWindow;
