
import React, { useState, useEffect } from 'react';
import { ExternalLink, Code } from 'lucide-react';

const ProjectsWindow: React.FC = () => {
  const [isMaximized, setIsMaximized] = useState(false);
  
  // Check if window is maximized by looking at its size
  useEffect(() => {
    const checkIfMaximized = () => {
      // If window is taking up most of the viewport, consider it maximized
      const windowWidth = window.innerWidth;
      const windowElement = document.querySelector('.window-content');
      if (windowElement) {
        const windowRect = windowElement.getBoundingClientRect();
        // If window width is more than 80% of viewport, consider it maximized
        setIsMaximized(windowRect.width > windowWidth * 0.8);
      }
    };
    
    // Initial check
    checkIfMaximized();
    
    // Check on resize
    window.addEventListener('resize', checkIfMaximized);
    
    // Add mutation observer to detect DOM changes (like window maximizing)
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

  const projects = [
    {
      name: 'E-Commerce Platform',
      description: 'Modern e-commerce solution built with React and TypeScript',
      tech: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js'],
      status: 'Completed'
    },
    {
      name: 'Task Management App',
      description: 'Collaborative task management tool with real-time updates',
      tech: ['React', 'Firebase', 'Material-UI'],
      status: 'In Progress'
    },
    {
      name: 'Portfolio Website',
      description: 'Creative portfolio showcasing web development skills',
      tech: ['React', 'Next.js', 'Framer Motion'],
      status: 'Completed'
    }
  ];

  return (
    <div className="h-full flex flex-col overflow-y-auto window-content">
      <div className={`w-full ${isMaximized ? 'max-w-6xl mx-auto' : 'px-2'}`}>
        <div className="flex items-center space-x-2 mb-4">
          <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">My Projects</h2>
        </div>

        {/* Use flex-col when not maximized, grid when maximized */}
        <div className={isMaximized 
          ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
          : "flex flex-col space-y-4"
        }>
          {projects.map((project, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md dark:hover:bg-gray-700 transition-all bg-white dark:bg-gray-800 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100">{project.name}</h3>
                <span className={`text-xs px-2 py-1 rounded ${
                  project.status === 'Completed' 
                    ? 'bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200' 
                    : 'bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-200'
                }`}>
                  {project.status}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 flex-grow">{project.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tech.map((tech) => (
                  <span key={tech} className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 text-xs px-2 py-1 rounded">
                    {tech}
                  </span>
                ))}
              </div>
              
              <button className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm transition-colors mt-auto">
                <ExternalLink className="w-3 h-3" />
                <span>View Project</span>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Upcoming Projects</h3>
          <div className={isMaximized 
            ? "grid grid-cols-1 md:grid-cols-2 gap-3" 
            : "flex flex-col space-y-3"
          }>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-md border border-blue-100 dark:border-blue-800">
              <div className="font-medium text-gray-800 dark:text-gray-100">AI-Powered Dashboard</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">Data visualization with AI insights</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-md border border-blue-100 dark:border-blue-800">
              <div className="font-medium text-gray-800 dark:text-gray-100">Mobile App</div>
              <div className="text-gray-600 dark:text-gray-300 text-sm">Cross-platform app with React Native</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsWindow;
