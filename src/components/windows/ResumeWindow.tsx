import React from 'react';

// Adjust the path if you place your PDF in /public or import directly
const resumePdfPath = '../public/Saimir Bunjaku - CV - 2025.pdf'; // example: public/resume.pdf or import directly

const ResumeWindow: React.FC = () => {
  return (
    <div className="w-full h-full bg-white dark:bg-gray-900 p-2">
      <iframe
        src={resumePdfPath}
        title="Resume PDF"
        className="w-full h-full"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default ResumeWindow;
