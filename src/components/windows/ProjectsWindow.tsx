
import React from 'react';
import { ExternalLink, Code } from 'lucide-react';

const ProjectsWindow: React.FC = () => {
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
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Code className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">My Projects</h2>
      </div>

      <div className="space-y-4 max-h-64 overflow-y-auto">
        {projects.map((project, index) => (
          <div key={index} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md dark:hover:bg-gray-700 transition-all bg-white dark:bg-gray-800">
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
            
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{project.description}</p>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {project.tech.map((tech) => (
                <span key={tech} className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 text-xs px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
            
            <button className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm transition-colors">
              <ExternalLink className="w-3 h-3" />
              <span>View Project</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsWindow;
