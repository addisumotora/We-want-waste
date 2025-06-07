import { CheckCircle } from 'lucide-react';
import React from 'react';

type Step = {
  id: number;
  title: string;
  icon: React.ComponentType<{ size?: number }>;
};

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => (
  <div className="flex justify-center mb-8 overflow-x-auto pb-2">
    <div className="flex space-x-2 md:space-x-4">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;

        return (
          <div key={step.id} className="flex flex-col items-center min-w-0">
            <div className={`
              w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300
              ${isActive ? 'bg-blue-500 text-white shadow-lg' :
                isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}
            `}>
              {isCompleted ? <CheckCircle size={20} /> : <Icon size={20} />}
            </div>
            <span className={`text-xs md:text-sm mt-1 text-center ${
              isActive ? 'text-blue-600 font-semibold' :
              isCompleted ? 'text-green-600' : 'text-gray-500'
            }`}>
              {step.title}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

export default StepIndicator;