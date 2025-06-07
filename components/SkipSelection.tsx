import { Skip } from "@/types/types";
import LargeSkipCard from "./LargeSkipCard";
import RegularSkipCard from "./RegularSkipCard";
import SelectionSummary from "./SelectionSummary";

interface SkipSelectionProps {
  skipData: Skip[];
  selectedSkip: Skip | null;
  onSkipSelect: (skip: Skip) => void;
}

const SkipSelection: React.FC<SkipSelectionProps> = ({ skipData, selectedSkip, onSkipSelect }) => {
  const calculateTotal = (skip: Skip) => {
    const subtotal = skip.price_before_vat;
    const vatAmount = (subtotal * skip.vat) / 100;
    return subtotal + vatAmount;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          Choose Your Skip Size
        </h2>
        <p className="text-gray-600">Select the skip size that best suits your needs</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {skipData.slice(0, 6).map((skip, index) => (
          <RegularSkipCard
            key={index}
            skip={skip}
            isSelected={selectedSkip?.size === skip.size}
            onSelect={onSkipSelect}
            calculateTotal={calculateTotal}
          />
        ))}
      </div>

      {skipData.length > 6 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Large Commercial Skips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skipData.slice(6).map((skip, index) => (
              <LargeSkipCard
                key={index + 6}
                skip={skip}
                isSelected={selectedSkip?.size === skip.size}
                onSelect={onSkipSelect}
                calculateTotal={calculateTotal}
              />
            ))}
          </div>
        </div>
      )}

      <SelectionSummary selectedSkip={selectedSkip} calculateTotal={calculateTotal} />

      <div className="mt-6 p-4 bg-gray-50 rounded-xl">
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          Skip images are for illustration purposes only. Actual skips may vary in appearance.
          All prices include delivery, collection, and disposal fees. 14-day hire period standard.
        </p>
      </div>
    </div>
  );
};

export default SkipSelection;