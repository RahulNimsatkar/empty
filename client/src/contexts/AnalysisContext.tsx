import React, { createContext, useContext, useState, ReactNode } from 'react';
import { type BrandAnalysisResult } from '@/lib/brandAnalysis';

interface FormData {
  brandName: string;
  brandUrl: string;
  location: string;
  budgeted: string;
  description: string;
}

interface AnalysisContextType {
  analysisData: BrandAnalysisResult | null;
  formData: FormData | null;
  setAnalysisData: (data: BrandAnalysisResult | null) => void;
  setFormData: (data: FormData | null) => void;
  clearAnalysisData: () => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
}

export function AnalysisProvider({ children }: { children: ReactNode }) {
  const [analysisData, setAnalysisData] = useState<BrandAnalysisResult | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);

  const clearAnalysisData = () => {
    setAnalysisData(null);
    setFormData(null);
  };

  return (
    <AnalysisContext.Provider
      value={{
        analysisData,
        formData,
        setAnalysisData,
        setFormData,
        clearAnalysisData,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}