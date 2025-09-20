import React from 'react';

interface JobDescriptionToggleProps {
  mode: 'with_jd' | 'without_jd';
  onModeChange: (mode: 'with_jd' | 'without_jd') => void;
}

const JobDescriptionToggle: React.FC<JobDescriptionToggleProps> = ({ mode, onModeChange }) => {
  return (
    <div className="flex gap-4 mb-6 justify-center">
      <button
        type="button"
        onClick={() => onModeChange('with_jd')}
        className={`
          px-6 py-3 rounded-full font-medium transition-all duration-200
          ${mode === 'with_jd' 
            ? 'bg-blue-600 text-white shadow-md' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }
        `}
      >
        Job description
      </button>
      <button
        type="button"
        onClick={() => onModeChange('without_jd')}
        className={`
          px-6 py-3 rounded-full font-medium transition-all duration-200
          ${mode === 'without_jd' 
            ? 'bg-blue-600 text-white shadow-md' 
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }
        `}
      >
        No job description
      </button>
    </div>
  );
};

export default JobDescriptionToggle;