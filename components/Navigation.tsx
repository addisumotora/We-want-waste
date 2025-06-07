import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

type NavigationProps = {
  currentStep: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  canContinue: boolean;
};

const Navigation: React.FC<NavigationProps> = ({
  currentStep,
  totalSteps,
  onBack,
  onNext,
  canContinue,
}) => (
  <div className="bg-gray-50 px-6 md:px-8 lg:px-12 py-6 flex justify-between items-center">
    <button
      onClick={() => currentStep === 1 ? window.history.back() : onBack()}
      className={`
        flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 cursor-pointer
        ${
          currentStep === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
        }
      `}
    >
      <ChevronLeft size={20} />
      <span>Back</span>
    </button>
    <button
      onClick={onNext}
      disabled={!canContinue}
      className={`
        flex items-center space-x-2 px-8 py-3 rounded-xl font-medium transition-all duration-300 transform cursor-pointer
        ${
          canContinue
            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 hover:scale-105 shadow-lg"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }
      `}
    >
      <span>
        {" "}
        {currentStep === 4
          ? "Continue to Payment"
          : currentStep === totalSteps
          ? "Complete Order"
          : "Continue"}
      </span>
      <ChevronRight size={20} />
    </button>
  </div>
);

export default Navigation;
