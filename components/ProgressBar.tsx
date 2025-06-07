import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => (
  <div className="w-full bg-gray-100 rounded-full h-2 mb-8">
    <div 
      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
      style={{ width: `${(currentStep / totalSteps) * 100}%` }}
    />
  </div>
);

export default ProgressBar;