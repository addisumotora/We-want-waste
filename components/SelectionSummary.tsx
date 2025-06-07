import { Skip } from '@/types/types';
import { CheckCircle } from 'lucide-react';
import React from 'react';

type SelectionSummaryProps = {
  selectedSkip: Skip | null; 
    calculateTotal: (selectedSkip: Skip) => number;
};

const SelectionSummary = ({ selectedSkip, calculateTotal }: SelectionSummaryProps) => {
  if (!selectedSkip) return null;

  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-blue-50 border-2 border-emerald-200 rounded-2xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
            <CheckCircle className="text-emerald-600" size={24} />
          </div>
          <div>
            <h4 className="font-bold text-emerald-800 text-lg">Selected: {selectedSkip.size} Yard Skip</h4>
            <p className="text-emerald-600 text-sm">Perfect for your waste disposal needs</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-emerald-700">
            £{calculateTotal(selectedSkip).toFixed(2)}
          </div>
          <div className="text-sm text-emerald-600">Total including VAT</div>
        </div>
      </div>
    </div>
  );
};

export default SelectionSummary;