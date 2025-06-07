import { CheckCircle } from 'lucide-react';
import React from 'react';

const getColorClasses = (color: 'emerald' | 'blue' | 'orange' | 'purple') => {
    const colors = {
      emerald: 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700',
      blue: 'border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700',
      orange: 'border-orange-200 bg-orange-50 hover:bg-orange-100 text-orange-700',
      purple: 'border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700'
    };
  return colors[color] || colors.blue;
};

interface WasteType {
  id: string | number;
  title: string;
  description: string;
  color: 'emerald' | 'blue' | 'orange' | 'purple';
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface WasteTypeCardProps {
  wasteType: WasteType;
  isSelected: boolean;
  onToggle: (id: string | number) => void;
}

const WasteTypeCard = ({ wasteType, isSelected, onToggle }: WasteTypeCardProps) => {
  const Icon = wasteType.icon;

  return (
    <div
      onClick={() => onToggle(wasteType.id)}
      className={`
        relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105
        ${isSelected
          ? 'border-blue-500 bg-blue-50 shadow-lg'
          : `${getColorClasses(wasteType.color)} border-2`
        }
      `}
    >
      {isSelected && (
        <div className="absolute top-4 right-4">
          <CheckCircle className="text-blue-500" size={24} />
        </div>
      )}

      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-xl ${isSelected ? 'bg-blue-100' : 'bg-white shadow-sm'}`}>
          <Icon size={28} className={isSelected ? 'text-blue-600' : 'text-gray-600'} />
        </div>

        <div className="flex-1">
          <h3 className={`font-semibold text-lg mb-2 ${isSelected ? 'text-blue-800' : 'text-gray-800'}`}>
            {wasteType.title}
          </h3>
          <p className={`text-sm ${isSelected ? 'text-blue-600' : 'text-gray-600'}`}>
            {wasteType.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WasteTypeCard;