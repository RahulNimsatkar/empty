import { useState, useCallback, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { PaperPlaneIcon, ReloadIcon, CheckCircledIcon, InfoCircledIcon, EyeOpenIcon, BarChartIcon, LockClosedIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import logoPath from "@assets/logo-2_1757587029671.png";
import { brandAnalysisService, type BrandAnalysisResult } from "@/lib/brandAnalysis";
import { useAnalysis } from "@/contexts/AnalysisContext";

interface FormData {
  brandName: string;
  brandUrl: string;
  location: string;
  budgeted: string;
  description: string;
}

interface FormErrors {
  brandName?: string;
  brandUrl?: string;
  location?: string;
  budgeted?: string;
  description?: string;
}

export default function Home() {
  const [, setLocation] = useLocation();
  const { setAnalysisData, setFormData } = useAnalysis();
  
  const [form, setForm] = useState<FormData>({
    brandName: "",
    brandUrl: "",
    location: "",
    budgeted: "",
    description: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [brandAnalysis, setBrandAnalysis] = useState<BrandAnalysisResult | null>(null);

  function validate(values: FormData): FormErrors {
    const e: FormErrors = {};
    
    if (!values.brandName.trim()) e.brandName = "Brand name is required.";
    
    if (!values.brandUrl.trim()) {
      e.brandUrl = "Brand URL is required.";
    } else {
      try {
        const url = new URL(values.brandUrl);
        if (!["http:", "https:"].includes(url.protocol)) {
          e.brandUrl = "Enter a valid http(s) URL.";
        }
      } catch (err) {
        e.brandUrl = "Enter a valid URL (example: https://example.com).";
      }
    }
    
    if (!values.location.trim()) e.location = "Location is required.";
    
    if (!values.budgeted.toString().trim()) {
      e.budgeted = "Budget is required.";
    } else if (isNaN(Number(values.budgeted)) || Number(values.budgeted) < 0) {
      e.budgeted = "Enter a valid non-negative number.";
    }
    
    if (!values.description.trim()) {
      e.description = "Short description is required.";
    } else if (values.description.length > 1000) {
      e.description = "Description must be under 1000 characters.";
    }
    
    return e;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    // Clear previous analysis to allow re-triggering
    if (brandAnalysis) {
      setBrandAnalysis(null);
    }
  }

  // Check if all fields are filled and valid
  const allFieldsFilled = form.brandName.trim() && form.brandUrl.trim() && form.location.trim() && form.budgeted.trim() && form.description.trim();
  const formErrors = validate(form);
  const isFormValid = allFieldsFilled && Object.keys(formErrors).length === 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    
    if (Object.keys(v).length === 0) {
      setLoading(true);
      console.log("Submitting suggestion:", form);
      
      setTimeout(() => {
        setSubmitted(true);
        setLoading(false);
        setForm({ brandName: "", brandUrl: "", location: "", budgeted: "", description: "" });
      }, 1500);
    } else {
      setSubmitted(false);
    }
  }

  function resetForm() {
    setForm({ brandName: "", brandUrl: "", location: "", budgeted: "", description: "" });
    setErrors({});
    setSubmitted(false);
    setLoading(false);
    setAnalyzing(false);
    setAnalysisProgress(0);
    setBrandAnalysis(null);
  }

  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const redirectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const analyzingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const analyzeBrand = useCallback(async () => {
    if (!isFormValid) {
      return;
    }

    // Snapshot form at start to prevent stale overwrites
    const formSnapshot = { ...form };
    
    setAnalyzing(true);
    setAnalysisProgress(0);
    setBrandAnalysis(null); // Clear previous results
    
    try {
      // First check if we already have data for this URL in the database
      const documentId = formSnapshot.brandUrl.replace(/https?:\/\//, '').replace(/[^a-zA-Z0-9]/g, '-');
      
      setAnalysisProgress(10);
      console.log('Checking database for existing analysis...');
      
      let result: any;
      let existingDataResponse: Response | null = null;
      let dataWasFromDatabase = false;
      
      try {
        existingDataResponse = await fetch(`/api/brand-profiles/by-url?url=${encodeURIComponent(formSnapshot.brandUrl)}`);
        
        if (existingDataResponse.ok) {
          // Data exists! Use existing analysis instead of calling AI
          const existingData = await existingDataResponse.json();
          console.log('Found existing analysis in database, skipping AI analysis');
          setAnalysisProgress(90);
          dataWasFromDatabase = true;
          
          result = {
            success: true,
            data: {
              brand_profile: existingData.brand_profile
            }
          };
        } else if (existingDataResponse.status === 404) {
          // No existing data, proceed with AI analysis
          console.log('No existing data found, proceeding with AI analysis...');
          setAnalysisProgress(20);
          
          // Simulate progress updates during AI analysis
          progressIntervalRef.current = setInterval(() => {
            setAnalysisProgress(prev => {
              if (prev >= 90) return prev;
              return prev + Math.random() * 15;
            });
          }, 300);

          result = await brandAnalysisService.analyzeBrand(formSnapshot.brandUrl);
        } else {
          throw new Error('Failed to check database');
        }
      } catch (dbError) {
        // If database check fails, fallback to AI analysis
        console.log('Database check failed, proceeding with AI analysis...', dbError);
        setAnalysisProgress(20);
        
        // Simulate progress updates during AI analysis
        progressIntervalRef.current = setInterval(() => {
          setAnalysisProgress(prev => {
            if (prev >= 90) return prev;
            return prev + Math.random() * 15;
          });
        }, 300);

        result = await brandAnalysisService.analyzeBrand(formSnapshot.brandUrl);
      }
      
      // Clear progress interval
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      setAnalysisProgress(100);
      
      setBrandAnalysis(result);
      
      if (result.success && result.data) {
        // Auto-fill brand name if still empty and hasn't been changed during analysis
        const topKeyword = result.data.brand_profile?.keywords?.[0]?.keyword;
        const updatedForm = (!form.brandName.trim() && topKeyword) 
          ? { ...form, brandName: topKeyword } 
          : form;
        
        // Store analysis data and current form data in context
        setAnalysisData(result);
        setFormData(updatedForm);
        
        // Save analysis results to Firebase only if it's new data (not fetched from database)
        if (!dataWasFromDatabase) {
          // Only save if data was newly generated, not fetched from database
          try {
            const response = await fetch('/api/brand-profiles', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                documentId: formSnapshot.brandUrl.replace(/https?:\/\//, '').replace(/[^a-zA-Z0-9]/g, '-'),
                url: formSnapshot.brandUrl,
                brand_profile: result.data.brand_profile
              })
            });
            
            if (response.ok) {
              console.log('Brand analysis saved to Firebase successfully');
            } else {
              const errorText = await response.text();
              console.error('Failed to save brand analysis to Firebase:', response.status, errorText);
            }
          } catch (error) {
            console.error('Error saving brand analysis to Firebase:', error);
          }
        } else {
          console.log('Using existing data from database, no need to save');
        }
      }
    } catch (error) {
      console.error("Brand analysis error:", error);
      setBrandAnalysis({
        success: false,
        error: "Network error occurred. Please check your connection and try again."
      });
      setAnalysisProgress(0);
    } finally {
      // Always clear interval
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      analyzingTimeoutRef.current = setTimeout(() => {
        setAnalyzing(false);
      }, 800);
    }
  }, [form, isFormValid, setAnalysisData, setFormData, setLocation]);
  
  // State-driven navigation: navigate to results when analysis data is ready
  const { analysisData: contextAnalysisData, formData: contextFormData } = useAnalysis();
  useEffect(() => {
    if (contextAnalysisData?.success && contextAnalysisData.data && contextFormData && analyzing) {
      // Small delay to show completion before navigating
      redirectTimeoutRef.current = setTimeout(() => {
        setLocation("/results");
      }, 800);
    }
  }, [contextAnalysisData, contextFormData, analyzing, setLocation]);
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      if (redirectTimeoutRef.current) {
        clearTimeout(redirectTimeoutRef.current);
      }
      if (analyzingTimeoutRef.current) {
        clearTimeout(analyzingTimeoutRef.current);
      }
    };
  }, []);

  // Removed auto-trigger analysis - now only triggers on button click

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 flex flex-col items-center">
      {/* Fixed Header with Logo */}
      <header className="w-full flex items-center justify-center mb-6 sticky top-0 bg-background/95 backdrop-blur-sm py-4 shadow-sm z-10 border-b border-border">
        <div className="flex items-center space-x-3">
          <img src={logoPath} alt="ADNOXY Logo" className="h-12 w-12 object-contain" data-testid="img-logo" />
          <span className="text-2xl font-bold text-foreground">ADNOXY</span>
        </div>
      </header>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Billboard Suggestion Form */}
        <motion.div
          initial={{ opacity: 0, translateY: 8 }}
          animate={{ opacity: 1, translateY: 0 }}
          className="fade-in"
        >
          <form 
            onSubmit={handleSubmit}
            className="bg-card p-6 md:p-8 rounded-2xl shadow-lg border border-border space-y-6"
            aria-label="Adnoxy billboard suggestion form"
            data-testid="form-billboard-suggestion"
          >
            <header className="space-y-2">
              <h1 className="text-3xl font-bold text-card-foreground">Suggest a Billboard</h1>
              <p className="text-muted-foreground">Tell us about your brand and campaign details. We'll help you find the perfect billboard location.</p>
            </header>

            {/* Brand Name Field */}
            <div className="space-y-2">
              <label htmlFor="brandName" className="block text-sm font-medium text-card-foreground">
                Brand Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="brandName"
                name="brandName"
                value={form.brandName}
                onChange={handleChange}
                disabled={analyzing}
                placeholder="e.g., Nike, Coca-Cola, Tesla"
                className="w-full px-4 py-3 border border-input rounded-lg bg-card text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="input-brand-name"
              />
              {errors.brandName && (
                <div className="text-destructive text-sm flex items-center gap-1" data-testid="error-brand-name">
                  <InfoCircledIcon className="h-3 w-3" />
                  {errors.brandName}
                </div>
              )}
            </div>

            {/* Brand URL Field */}
            <div className="space-y-2">
              <label htmlFor="brandUrl" className="block text-sm font-medium text-card-foreground">
                Brand URL <span className="text-destructive">*</span>
              </label>
              <input
                type="url"
                id="brandUrl"
                name="brandUrl"
                value={form.brandUrl}
                onChange={handleChange}
                disabled={analyzing}
                placeholder="https://your-website.com"
                className="w-full px-4 py-3 border border-input rounded-lg bg-card text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="input-brand-url"
              />
              {errors.brandUrl && (
                <div className="text-destructive text-sm flex items-center gap-1" data-testid="error-brand-url">
                  <InfoCircledIcon className="h-3 w-3" />
                  {errors.brandUrl}
                </div>
              )}
              <div className="text-sm text-muted-foreground mt-2">
                Analysis will automatically start when all fields are completed
              </div>
            </div>

            {/* Brand Analysis Status */}
            {brandAnalysis && (
              <div className="space-y-3 p-4 bg-muted/50 rounded-lg border border-border">
                <div className="flex items-center gap-2">
                  <InfoCircledIcon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-card-foreground">Brand Analysis Status</span>
                </div>
                {brandAnalysis.success ? (
                  <div className="text-green-600 text-sm flex items-center gap-1" data-testid="brand-analysis-results">
                    <CheckCircledIcon className="h-3 w-3" />
                    Analysis completed successfully - redirecting to detailed results page
                  </div>
                ) : (
                  <div className="text-destructive text-sm flex items-center gap-1" data-testid="brand-analysis-error">
                    <InfoCircledIcon className="h-3 w-3" />
                    {brandAnalysis.error || "Analysis failed"}
                  </div>
                )}
              </div>
            )}

            {/* Location Field */}
            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium text-card-foreground">
                Target Location <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={form.location}
                onChange={handleChange}
                disabled={analyzing}
                placeholder="e.g., Ahmedabad Gujarat, Mumbai Central, Singapore Downtown, Dubai Marina"
                className="w-full px-4 py-3 border border-input rounded-lg bg-card text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="input-location"
              />
              {errors.location && (
                <div className="text-destructive text-sm flex items-center gap-1" data-testid="error-location">
                  <InfoCircledIcon className="h-3 w-3" />
                  {errors.location}
                </div>
              )}
            </div>

            {/* Budget Field */}
            <div className="space-y-2">
              <label htmlFor="budgeted" className="block text-sm font-medium text-card-foreground">
                Budget (INR) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">₹</span>
                <input
                  type="number"
                  id="budgeted"
                  name="budgeted"
                  value={form.budgeted}
                  onChange={handleChange}
                  disabled={analyzing}
                  placeholder="4000000"
                  min="0"
                  className="w-full pl-8 pr-4 py-3 border border-input rounded-lg bg-card text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  data-testid="input-budget"
                />
              </div>
              {errors.budgeted && (
                <div className="text-destructive text-sm flex items-center gap-1" data-testid="error-budget">
                  <InfoCircledIcon className="h-3 w-3" />
                  {errors.budgeted}
                </div>
              )}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-card-foreground">
                Campaign Description <span className="text-destructive">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                disabled={analyzing}
                rows={4}
                maxLength={1000}
                placeholder="Describe your campaign goals, target audience, and key messaging..."
                className="w-full px-4 py-3 border border-input rounded-lg bg-card text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="textarea-description"
              />
              <div className="flex justify-between items-center text-sm">
                {errors.description && (
                  <div className="text-destructive flex items-center gap-1" data-testid="error-description">
                    <InfoCircledIcon className="h-3 w-3" />
                    {errors.description}
                  </div>
                )}
                <div className="text-muted-foreground ml-auto" data-testid="text-character-count">
                  {form.description.length}/1000
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
              {analyzing ? (
                <div className="w-full space-y-3">
                  <div className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold flex items-center justify-center gap-3">
                    <ReloadIcon className="h-4 w-4 animate-spin" />
                    <span>Analyzing Brand... {Math.round(analysisProgress)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${analysisProgress}%` }}
                    />
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    Please wait while we analyze your brand data...
                  </div>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={analyzeBrand}
                    disabled={!isFormValid || analyzing}
                    className={`px-6 py-3 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                      isFormValid 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'bg-muted hover:bg-muted/90 text-muted-foreground'
                    }`}
                    data-testid="button-analyze"
                  >
                    {isFormValid ? (
                      <>
                        <BarChartIcon className="h-4 w-4" />
                        Analyze Brand
                      </>
                    ) : (
                      <>
                        <MagnifyingGlassIcon className="h-4 w-4" />
                        Complete All Fields
                      </>
                    )}
                  </button>
                </div>
              )}

              {!analyzing && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full sm:w-auto px-4 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-200 flex items-center justify-center gap-2"
                  data-testid="button-reset"
                >
                  <ReloadIcon className="h-4 w-4" />
                  Reset
                </button>
              )}

              {submitted && !loading && (
                <div className="text-green-600 font-medium flex items-center gap-2" data-testid="message-success">
                  <CheckCircledIcon className="h-4 w-4" />
                  Suggestion submitted successfully!
                </div>
              )}
            </div>

            <footer className="text-xs text-muted-foreground border-t border-border pt-4 flex items-center gap-1">
              <LockClosedIcon className="h-3 w-3" />
              We only collect this information to suggest billboards — no spam. Make sure the URL is reachable.
            </footer>
          </form>
        </motion.div>

        {/* Billboard Preview */}
        <div className="space-y-6 slide-up">
          {/* Billboard Preview */}
          <div className="bg-card p-6 rounded-2xl shadow-lg border border-border">
            <h2 className="text-xl font-bold text-card-foreground mb-4 flex items-center gap-2">
              <EyeOpenIcon className="h-5 w-5 text-primary" />
              Preview Your Billboard
            </h2>
            <div className="space-y-4">
              {/* Mock billboard display */}
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8 text-white min-h-[200px] flex items-center justify-center">
                <div className="text-center" data-testid="preview-billboard">
                  <div className="text-2xl font-bold mb-2" data-testid="text-preview-brand">
                    {form.brandName || 'Your Brand'}
                  </div>
                  <div className="text-sm opacity-75" data-testid="text-preview-description">
                    {form.description || 'Your campaign message will appear here'}
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 text-xs opacity-50">Mock Billboard</div>
              </div>
              
              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium text-card-foreground" data-testid="text-preview-location">
                    {form.location || 'Not specified'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Budget:</span>
                  <span className="font-medium text-card-foreground" data-testid="text-preview-budget">
                    {form.budgeted ? `₹${Number(form.budgeted).toLocaleString('en-IN')}` : 'Not specified'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Information */}
          <div className="bg-card p-6 rounded-2xl shadow-lg border border-border">
            <h2 className="text-xl font-bold text-card-foreground mb-4 flex items-center gap-2">
              <InfoCircledIcon className="h-5 w-5 text-primary" />
              How It Works
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h3 className="font-semibold text-card-foreground">Submit Your Details</h3>
                  <p className="text-sm text-muted-foreground">Tell us about your brand and campaign goals.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h3 className="font-semibold text-card-foreground">Get Matched</h3>
                  <p className="text-sm text-muted-foreground">Our team finds the perfect billboard locations for your budget.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h3 className="font-semibold text-card-foreground">Launch Campaign</h3>
                  <p className="text-sm text-muted-foreground">Review options, finalize details, and go live.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-gradient-to-r from-primary to-primary/80 p-6 rounded-2xl text-primary-foreground shadow-lg">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BarChartIcon className="h-5 w-5" />
              Platform Stats
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold" data-testid="text-stat-billboards">2,500+</div>
                <div className="text-sm opacity-90">Active Billboards</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" data-testid="text-stat-impressions">150M+</div>
                <div className="text-sm opacity-90">Monthly Impressions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" data-testid="text-stat-satisfaction">95%</div>
                <div className="text-sm opacity-90">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" data-testid="text-stat-response">48hrs</div>
                <div className="text-sm opacity-90">Avg. Response Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
