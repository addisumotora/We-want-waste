import React from 'react';
import WasteTypeCard from './WasteTypeCard';
import { CheckCircle } from 'lucide-react';

interface WasteType {
  id: string | number;
  title: string;
  description: string;
  color: "emerald" | "blue" | "orange" | "purple";
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface WasteTypeSelectionProps {
  wasteTypes: WasteType[];
  selectedWasteTypes: (string | number)[];
  onWasteTypeToggle: (id: string | number) => void;
}

const WasteTypeSelection: React.FC<WasteTypeSelectionProps> = ({ wasteTypes, selectedWasteTypes, onWasteTypeToggle }) => (
  <div className="space-y-6">
    <div className="text-center mb-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
        What type of waste are you disposing of?
      </h2>
      <p className="text-gray-600">Select all that apply to get the best skip recommendation</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {wasteTypes.map((wasteType) => (
        <WasteTypeCard
          key={wasteType.id}
          wasteType={wasteType}
          isSelected={selectedWasteTypes.includes(wasteType.id)}
          onToggle={onWasteTypeToggle}
        />
      ))}
    </div>
    {selectedWasteTypes.length > 0 && (
      <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-xl">
        <div className="flex items-center space-x-2">
          <CheckCircle className="text-green-600" size={20} />
          <span className="text-green-800 font-medium">
            {selectedWasteTypes.length} waste type{selectedWasteTypes.length > 1 ? 's' : ''} selected
          </span>
        </div>
      </div>
    )}
  </div>
);

export default WasteTypeSelection;