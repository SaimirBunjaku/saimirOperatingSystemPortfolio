
import React, { useState, useEffect, useRef } from 'react';
import { Code, Settings, Palette } from 'lucide-react';

const SkillsWindow: React.FC = () => {
  const [isMaximized, setIsMaximized] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  
  // Check if window is maximized by looking at its size
  useEffect(() => {
    const checkIfMaximized = () => {
      if (!windowRef.current) return;
      
      const windowWidth = window.innerWidth;
      const windowRect = windowRef.current.getBoundingClientRect();
      setIsMaximized(windowRect.width > windowWidth * 0.8);
    };
    
    checkIfMaximized();
    window.addEventListener('resize', checkIfMaximized);
    
    const observer = new MutationObserver(checkIfMaximized);
    observer.observe(document.body, { 
      attributes: true, 
      childList: true, 
      subtree: true 
    });
    
    return () => {
      window.removeEventListener('resize', checkIfMaximized);
      observer.disconnect();
    };
  }, []);

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
    <div ref={windowRef} className="h-full flex flex-col overflow-y-auto">
      <div className={`w-full ${isMaximized ? 'max-w-6xl mx-auto' : 'px-2'}`}>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Skills & Technologies</h2>
        
        <div className={isMaximized 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
          : "flex flex-col space-y-4"
        }>
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
        </div>

        <div className="mt-6 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
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
