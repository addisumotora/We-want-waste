
import { CheckCircle, MapPin, Weight } from 'lucide-react';
import { Skip } from '@/types/types';

interface RegularSkipCardProps {
  skip: Skip;
  isSelected: boolean;
  onSelect: (skip: Skip) => void;
  calculateTotal: (skip: Skip) => number;
}

// Skip Visual Component
interface SkipVisualProps {
  size: number;
  isSelected: boolean;
}

const SkipVisual = ({ size, isSelected }: SkipVisualProps) => (
  <div className="relative w-full h-32 mb-4 flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 rounded-xl overflow-hidden">
    <div className={`
      relative transform transition-all duration-300
      ${isSelected ? 'scale-110' : 'scale-100'}
    `}>
      <div className={`
        bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-t-lg relative
        ${size >= 10 ? 'w-28 h-20' : size >= 6 ? 'w-24 h-18' : 'w-20 h-16'}
        ${isSelected ? 'shadow-lg' : 'shadow-md'}
      `}>
        <div className="absolute -left-1 top-2 w-2 h-4 bg-yellow-700 rounded-sm"></div>
        <div className="absolute -right-1 top-2 w-2 h-4 bg-yellow-700 rounded-sm"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xs font-bold text-yellow-900 text-center">
            <div className="text-blue-800 font-black text-xs">WW</div>
          </div>
        </div>
      </div>

      <div className={`
        bg-gradient-to-b from-yellow-600 to-yellow-700 rounded-b-sm
        ${size >= 10 ? 'w-28 h-2' : size >= 6 ? 'w-24 h-2' : 'w-20 h-2'}
      `}></div>
    </div>

    <div className="absolute top-2 right-2">
      <span className={`
        px-2 py-1 rounded-full text-xs font-bold
        ${isSelected ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 shadow-sm'}
      `}>
        {size} Yards
      </span>
    </div>
  </div>
);

const RegularSkipCard = ({ skip, isSelected, onSelect, calculateTotal }: RegularSkipCardProps) => {
  const total = calculateTotal(skip);

  return (
    <div
      onClick={() => onSelect(skip)}
      className={`
        relative bg-white rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-lg
        ${isSelected
          ? 'border-blue-500 shadow-xl ring-4 ring-blue-100'
          : 'border-gray-200 hover:border-blue-300'
        }
      `}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="bg-blue-500 text-white rounded-full p-2 shadow-lg">
            <CheckCircle size={20} />
          </div>
        </div>
      )}

      <div className="p-6">
        <SkipVisual size={skip.size} isSelected={isSelected} />

        <div className="text-center">
          <h3 className={`font-bold text-xl mb-2 ${isSelected ? 'text-blue-800' : 'text-gray-800'}`}>
            {skip.size} Yard Skip
          </h3>

          <div className="text-sm text-gray-600 mb-4">
            14 day hire period
          </div>

          <div className="space-y-1 text-xs text-gray-500 mb-4">
            <div className="flex items-center justify-center space-x-1">
              <MapPin size={12} />
              <span>{skip.allowed_on_road ? 'Road placement OK' : 'Private land only'}</span>
            </div>
            <div className="flex items-center justify-center space-x-1">
              <Weight size={12} />
              <span>{skip.allows_heavy_waste ? 'Heavy waste allowed' : 'Light waste only'}</span>
            </div>
          </div>

          <div className={`text-2xl font-bold mb-1 ${isSelected ? 'text-blue-600' : 'text-gray-800'}`}>
            £{total.toFixed(2)}
          </div>
          <div className="text-xs text-gray-500">including VAT</div>
        </div>
      </div>
    </div>
  );
};

export default RegularSkipCard;


