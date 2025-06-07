import { Skip } from '@/types/types';
import { CheckCircle, MapPin, Truck, Weight } from 'lucide-react';
import React from 'react';

interface LargeSkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (skip: Skip) => void;
  calculateTotal: (skip: Skip) => number;
}

const LargeSkipCard: React.FC<LargeSkipCardProps> = ({ skip, isSelected, onSelect, calculateTotal }) => {
  const total = calculateTotal(skip);

  return (
    <div
      onClick={() => onSelect(skip)}
      className={`
        relative bg-white rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md
        ${isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-lg' 
          : 'border-gray-200 hover:border-blue-300'
        }
      `}
    >
      {isSelected && (
        <div className="absolute top-3 right-3 md:top-4 md:right-4">
          <CheckCircle className="text-blue-500" size={20} />
        </div>
      )}
      
      <div className="p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <div className="flex-shrink-0 w-full sm:w-auto">
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}`}>
            <Truck size={28} className={isSelected ? 'text-blue-600' : 'text-gray-600'} />
          </div>
        </div>

        <div className="flex-1 w-full space-y-1">
          <h4 className={`font-bold text-base sm:text-lg ${isSelected ? 'text-blue-800' : 'text-gray-800'}`}>
            {skip.size} Yard Skip
          </h4>
          <p className="text-xs sm:text-sm text-gray-600 mb-2">Commercial grade • 14 day hire</p>
          
          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
            <span className="flex items-center space-x-1">
              <MapPin size={10} />
              <span>{skip.allowed_on_road ? 'Road OK' : 'Private only'}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Weight size={10} />
              <span>{skip.allows_heavy_waste ? 'Heavy waste' : 'Light waste'}</span>
            </span>
          </div>
        </div>

        <div className="text-right w-full sm:w-auto mt-2 sm:mt-0">
          <div className={`text-lg sm:text-xl font-bold ${isSelected ? 'text-blue-600' : 'text-gray-800'}`}>
            £{total.toFixed(2)}
          </div>
          <div className="text-xs text-gray-500">inc. VAT</div>
        </div>
      </div>
    </div>
  );
};

export default LargeSkipCard;