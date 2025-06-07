"use client";

import React, { useEffect, useState } from "react";
import {
  Home,
  Building2,
  Leaf,
  HardHat,
  Calendar,
  CreditCard,
  Truck,
  AlertCircle,
} from "lucide-react";
import { Skip, WasteType } from "@/types/types";
import WasteTypeSelection from "@/components/WasteTypeSelection";
import SkipSelection from "@/components/SkipSelection";
import ProgressBar from "@/components/ProgressBar";
import StepIndicator from "@/components/StepIndicator";
import Navigation from "@/components/Navigation";
import PermitCheck from "@/components/PermitCheck";
import DeliveryDateStep from "@/components/DeliveryDate";
import PaymentPage from "@/components/PaymentPage";

const WasteDisposalApp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedWasteTypes, setSelectedWasteTypes] = useState<string[]>([]);
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [skipData, setSkipData] = useState<Skip[]>([]);
  const [loadingSkips, setLoadingSkips] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const steps = [
    { id: 1, title: "Waste Type", icon: Leaf },
    { id: 2, title: "Skip Selection", icon: Truck },
    { id: 3, title: "Permit Check", icon: AlertCircle },
    { id: 4, title: "Date & Time", icon: Calendar },
    { id: 5, title: "Payment", icon: CreditCard },
  ];

  const wasteTypes: WasteType[] = [
    {
      id: "garden",
      title: "Garden Waste",
      description: "Green waste, leaves, branches, grass cuttings",
      icon: Leaf,
      color: "emerald",
    },
    {
      id: "household",
      title: "Household Waste",
      description: "General household items, furniture, appliances",
      icon: Home,
      color: "blue",
    },
    {
      id: "construction",
      title: "Construction Waste",
      description: "Building materials, renovation debris, rubble",
      icon: HardHat,
      color: "orange",
    },
    {
      id: "commercial",
      title: "Commercial Waste",
      description: "Business clearance, office equipment, fixtures",
      icon: Building2,
      color: "purple",
    },
  ];

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        const response = await fetch(
          process.env.BASE_URL ||
            "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch skip data");
        }
        const result = await response.json();
        setSkipData(result || []);
        setLoadingSkips(false);
      } catch (err: any) {
        setError(err.message || "An error occurred");
        setLoadingSkips(false);
      }
    };

    fetchSkips();
  }, []);

  const handleWasteTypeToggle = (wasteTypeId: string | number) => {
    const idStr = String(wasteTypeId);
    setSelectedWasteTypes((prev) =>
      prev.includes(idStr)
        ? prev.filter((id) => id !== idStr)
        : [...prev, idStr]
    );
  };

  const handleSkipSelect = (skip: Skip) => {
    setSelectedSkip(skip);
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canContinue = () => {
    switch (currentStep) {
      case 1:
        return selectedWasteTypes.length > 0;
      case 2:
        return selectedSkip !== null;
      default:
        return true;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <WasteTypeSelection
            wasteTypes={wasteTypes}
            selectedWasteTypes={selectedWasteTypes}
            onWasteTypeToggle={handleWasteTypeToggle}
          />
        );
      case 2:
        return (
          <SkipSelection
            skipData={skipData}
            selectedSkip={selectedSkip}
            onSkipSelect={handleSkipSelect}
          />
        );
      case 3:
        return <PermitCheck />;
      case 4:
        return <DeliveryDateStep />;
      case 5:
        return <PaymentPage  back={handleBack}/>;
      default:
        return (
          <WasteTypeSelection
            wasteTypes={wasteTypes}
            selectedWasteTypes={selectedWasteTypes}
            onWasteTypeToggle={handleWasteTypeToggle}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            WasteWise Disposal
          </h1>
          <p className="text-gray-600">
            Professional waste removal made simple
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <ProgressBar currentStep={currentStep} totalSteps={steps.length} />
          <StepIndicator steps={steps} currentStep={currentStep} />
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="p-6 md:p-8 lg:p-12">{renderCurrentStep()}</div>

            {currentStep !== steps.length && (
              <Navigation
                currentStep={currentStep}
                totalSteps={steps.length}
                onBack={handleBack}
                onNext={handleNext}
                canContinue={canContinue()}
              />
            )}
          </div>
        </div>

        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Need help? Contact our support team at support@wastewise.co.uk</p>
        </div>
      </div>
    </div>
  );
};

export default WasteDisposalApp;
