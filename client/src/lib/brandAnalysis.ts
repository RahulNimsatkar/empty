import { Client } from "@gradio/client";

export interface KeywordInsight {
  keyword: string;
  score: number;
}

export interface PersonalityTraitScore {
  score: number;
  justification: string;
}

export interface PersonalityScores {
  sincerity: PersonalityTraitScore;
  excitement: PersonalityTraitScore;
  competence: PersonalityTraitScore;
  sophistication: PersonalityTraitScore;
  ruggedness: PersonalityTraitScore;
}

export interface Demographics {
  age_range: string;
  gender: string;
  income_level: string;
}

export interface Psychographics {
  values: string[];
  interests: string[];
  lifestyle: string[];
}

export interface TargetAudience {
  demographics: Demographics;
  psychographics: Psychographics;
}

export interface BrandProfile {
  keywords: KeywordInsight[];
  themes: string[];
  personality_scores: PersonalityScores;
  inferred_target_audience?: TargetAudience;
}

export interface BrandAnalysisData {
  brand_profile: BrandProfile;
}

export interface BrandAnalysisResult {
  success: boolean;
  data?: BrandAnalysisData;
  error?: string;
}

export class BrandAnalysisService {
  private client: Client | null = null;
  private readonly HF_TOKEN = import.meta.env.VITE_HF_TOKEN;

  async initializeClient(): Promise<void> {
    if (!this.client) {
      try {
        this.client = await Client.connect(
          "magz3l/brand-identity",
          { hf_token: this.HF_TOKEN }
        );
      } catch (error) {
        console.error("Failed to initialize Gradio client:", error);
        throw new Error("Failed to connect to brand analysis service");
      }
    }
  }

  async analyzeBrand(brandUrl: string): Promise<BrandAnalysisResult> {
    try {
      if (!brandUrl || !this.isValidUrl(brandUrl)) {
        return {
          success: false,
          error: "Please provide a valid URL"
        };
      }

      if (!this.HF_TOKEN) {
        return {
          success: false,
          error: "API token not configured"
        };
      }

      await this.initializeClient();

      if (!this.client) {
        return {
          success: false,
          error: "Failed to initialize analysis service"
        };
      }

      // Add timeout to prevent hanging requests (increased to 90 seconds for complex websites)
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error("Analysis request timed out after 90 seconds. The website might be complex or the AI model is busy.")), 90000)
      );

      const analysisPromise = this.client.predict("/predict", {
        brand_input: brandUrl,
      });

      const result = await Promise.race([analysisPromise, timeoutPromise]) as { data: any[] };

      // Gradio API returns data in result.data array, so we need the first element
      const analysisData = result.data?.[0];
      
      if (!analysisData) {
        return {
          success: false,
          error: "No analysis data returned from the AI model"
        };
      }

      // Try to parse if it's a JSON string
      let parsedData: BrandAnalysisData;
      try {
        if (typeof analysisData === 'string') {
          parsedData = JSON.parse(analysisData);
        } else {
          parsedData = analysisData;
        }
      } catch (parseError) {
        console.error("Failed to parse analysis data:", parseError);
        return {
          success: false,
          error: "Failed to parse analysis results. The AI model returned invalid data."
        };
      }

      // Normalize the data to ensure it fits our schema
      const normalizedData = this.normalizeAnalysisData(parsedData);

      return {
        success: true,
        data: normalizedData
      };

    } catch (error) {
      console.error("Brand analysis failed:", error);
      
      // Handle specific error types
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return {
            success: false,
            error: "Analysis was cancelled. The request may have taken too long."
          };
        }
        if (error.message.includes('timeout') || error.message.includes('timed out')) {
          return {
            success: false,
            error: "Analysis timed out after 90 seconds. The AI model may be busy processing your request. Please try again in a few moments."
          };
        }
        if (error.message.includes('network') || error.message.includes('fetch')) {
          return {
            success: false,
            error: "Network error. Please check your connection and try again."
          };
        }
        return {
          success: false,
          error: `Analysis failed: ${error.message}`
        };
      }

      return {
        success: false,
        error: "Analysis failed due to an unexpected error. Please try again."
      };
    }
  }

  private normalizeAnalysisData(data: BrandAnalysisData): BrandAnalysisData {
    // Create a deep copy to avoid mutating the original data
    const normalized: BrandAnalysisData = JSON.parse(JSON.stringify(data));
    
    // Deep clean undefined values and replace with appropriate defaults
    const cleanUndefined = (obj: any): any => {
      if (obj === null || obj === undefined) return null;
      if (typeof obj !== 'object') return obj;
      if (Array.isArray(obj)) return obj.map(cleanUndefined);
      
      const cleaned: any = {};
      for (const [key, value] of Object.entries(obj)) {
        if (value !== undefined) {
          cleaned[key] = cleanUndefined(value);
        }
      }
      return cleaned;
    };
    
    // Normalize personality scores to 1-10 range
    if (normalized.brand_profile?.personality_scores) {
      const personality = normalized.brand_profile.personality_scores;
      
      // Helper function to normalize a score to 1-10 range
      const normalizeScore = (score: any): number => {
        // Convert to number and handle invalid values
        const numScore = Number(score);
        if (!isFinite(numScore)) return 5; // Default to middle score for invalid values
        
        // If score is already in 1-10 range, keep it
        if (numScore >= 1 && numScore <= 10) return Math.round(numScore * 100) / 100;
        
        // If score is in 0-1 range, scale to 1-10
        if (numScore >= 0 && numScore <= 1) return Math.round((numScore * 9 + 1) * 100) / 100;
        
        // If score is in 0-100 range, scale to 1-10
        if (numScore >= 0 && numScore <= 100) return Math.round((numScore * 9 / 100 + 1) * 100) / 100;
        
        // For any other range, clamp to 1-10
        return Math.max(1, Math.min(10, Math.round(numScore * 100) / 100));
      };

      // Normalize each personality trait score and ensure justification exists
      ['sincerity', 'excitement', 'competence', 'sophistication', 'ruggedness'].forEach(trait => {
        const traitData = personality[trait as keyof PersonalityScores];
        if (traitData) {
          // Normalize score (always do this, even for 0 or undefined)
          traitData.score = normalizeScore(traitData.score);
          
          // Ensure justification exists and is a non-empty string
          if (!traitData.justification || typeof traitData.justification !== 'string' || traitData.justification.trim() === '') {
            traitData.justification = `Analysis indicates a ${trait} score of ${traitData.score} based on brand characteristics.`;
          }
        } else {
          // Create trait data if missing
          personality[trait as keyof PersonalityScores] = {
            score: 5,
            justification: `Default ${trait} score assigned during normalization.`
          };
        }
      });
    }
    
    // Normalize keyword scores to 0-1 range and ensure valid data
    if (normalized.brand_profile?.keywords) {
      normalized.brand_profile.keywords = normalized.brand_profile.keywords
        .filter(keyword => keyword && keyword.keyword && typeof keyword.keyword === 'string')
        .map(keyword => ({
          keyword: keyword.keyword.trim(),
          score: Math.max(0, Math.min(1, 
            isFinite(keyword.score) ? 
              (keyword.score > 1 ? keyword.score / 100 : keyword.score) : 
              0.5
          ))
        }));
    }
    
    // Ensure themes array is valid
    if (normalized.brand_profile?.themes) {
      normalized.brand_profile.themes = normalized.brand_profile.themes
        .filter(theme => theme && typeof theme === 'string' && theme.trim() !== '')
        .map(theme => theme.trim());
    }
    
    // Clean up any remaining undefined values
    return cleanUndefined(normalized);
  }

  private isValidUrl(url: string): boolean {
    try {
      const urlObject = new URL(url);
      return ["http:", "https:"].includes(urlObject.protocol);
    } catch {
      return false;
    }
  }
}

export const brandAnalysisService = new BrandAnalysisService();