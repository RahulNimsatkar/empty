import { useEffect } from "react";
import { useLocation } from "wouter";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { UnifiedAnalysisResults } from "@/components/analysis/UnifiedAnalysisResults";
import { useAnalysis } from "@/contexts/AnalysisContext";
import logoPath from "@assets/logo-2_1757587029671.png";

export default function AnalysisResults() {
  const [, setLocation] = useLocation();
  const { analysisData, formData, clearAnalysisData } = useAnalysis();

  // Redirect to home if no analysis data
  useEffect(() => {
    console.log('Results page loading with context data:', { 
      hasAnalysisData: !!analysisData,
      analysisSuccess: analysisData?.success,
      hasAnalysisContent: !!analysisData?.data,
      hasFormData: !!formData
    });
    
    if (!analysisData || !analysisData.success || !analysisData.data || !formData) {
      console.log('Missing required data, redirecting to home');
      setLocation("/");
    }
  }, [analysisData, formData, setLocation]);

  // Return loading state while redirecting
  if (!analysisData || !analysisData.success || !analysisData.data || !formData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analysis results...</p>
        </div>
      </div>
    );
  }

  const handleBackToHome = () => {
    clearAnalysisData();
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      {/* Fixed Header with Logo and Back Button */}
      <header className="w-full flex items-center justify-between mb-6 sticky top-0 bg-background/95 backdrop-blur-sm py-4 shadow-sm z-10 border-b border-border">
        <div className="flex items-center space-x-3">
          <img src={logoPath} alt="ADNOXY Logo" className="h-12 w-12 object-contain" />
          <span className="text-2xl font-bold text-foreground">ADNOXY</span>
        </div>
        
        <Button
          variant="outline"
          onClick={handleBackToHome}
          className="flex items-center gap-2"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to Home
        </Button>
      </header>

      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Brand Analysis Results
          </h1>
          <p className="text-muted-foreground">
            Complete insights and data for {formData.brandName || 'your brand'}
          </p>
        </div>

        {/* Analysis Results */}
        <UnifiedAnalysisResults 
          brandAnalysis={analysisData.data}
          formData={formData}
        />
      </div>
    </div>
  );
}