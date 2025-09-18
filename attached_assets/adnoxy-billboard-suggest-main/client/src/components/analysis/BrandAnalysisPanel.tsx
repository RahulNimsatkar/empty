import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDownIcon, ChevronUpIcon, EyeOpenIcon, BarChartIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { type BrandAnalysisData } from "@/lib/brandAnalysis";
import { DonutChart } from "@/components/charts/DonutChart";
import { BarChart } from "@/components/charts/BarChart";
import { RadarChart } from "@/components/charts/RadarChart";
import { KeywordInsights } from "./KeywordInsights";
import { ThemesDisplay } from "./ThemesDisplay";
import { PersonalityScores } from "./PersonalityScores";
import { TargetAudienceProfile } from "./TargetAudienceProfile";

interface BrandAnalysisPanelProps {
  brandAnalysis: BrandAnalysisData;
  formData: {
    brandName: string;
    location: string;
    budgeted: string;
    description: string;
  };
  className?: string;
}

export function BrandAnalysisPanel({ brandAnalysis, formData, className = "" }: BrandAnalysisPanelProps) {
  const [isInsightsExpanded, setIsInsightsExpanded] = useState(false);
  const { brand_profile } = brandAnalysis;

  // Add safety checks for data structure
  if (!brand_profile) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="bg-card p-6 rounded-2xl shadow-lg border border-border">
          <p className="text-center text-muted-foreground">
            Brand analysis data is not available. Please try analyzing again.
          </p>
        </div>
      </div>
    );
  }

  // Safely prepare data for charts with fallbacks
  const keywords = brand_profile.keywords || [];
  const themes = brand_profile.themes || [];
  const personalityScores = brand_profile.personality_scores || {};
  const targetAudience = brand_profile.inferred_target_audience;

  const keywordChartData = keywords.slice(0, 5).map(k => ({
    name: k.keyword,
    value: Math.round(k.score * 100)
  }));

  const personalityChartData = Object.entries(personalityScores).map(([trait, data]) => ({
    trait: trait.charAt(0).toUpperCase() + trait.slice(1),
    score: data.score
  }));

  const personalityDonutData = Object.entries(personalityScores).map(([trait, data]) => ({
    name: trait.charAt(0).toUpperCase() + trait.slice(1),
    value: data.score
  }));

  // Generate audience summary
  const audienceSummary = targetAudience ? 
    `${targetAudience.demographics.age_range} individuals interested in ${targetAudience.psychographics.interests.slice(0, 2).join(" and ")}` :
    "Target audience analysis not available";

  return (
    <div className={`space-y-6 ${className}`}>
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <EyeOpenIcon className="h-4 w-4" />
            Billboard Preview
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <InfoCircledIcon className="h-4 w-4" />
            Brand Insights
          </TabsTrigger>
          <TabsTrigger value="charts" className="flex items-center gap-2">
            <BarChartIcon className="h-4 w-4" />
            Charts
          </TabsTrigger>
        </TabsList>

        {/* Billboard Preview Tab */}
        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <EyeOpenIcon className="h-5 w-5 text-primary" />
                Preview Your Billboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Mock billboard display */}
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-8 text-white min-h-[200px] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-2">
                    {formData.brandName || 'Your Brand'}
                  </div>
                  <div className="text-sm opacity-75">
                    {formData.description || 'Your campaign message will appear here'}
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 text-xs opacity-50">Mock Billboard</div>
              </div>
              
              {/* Details */}
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location:</span>
                  <span className="font-medium">{formData.location || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Budget:</span>
                  <span className="font-medium">{formData.budgeted ? `$${formData.budgeted}` : 'Not specified'}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Expandable Brand Analysis Section */}
          <Collapsible open={isInsightsExpanded} onOpenChange={setIsInsightsExpanded}>
            <Card>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full p-6 h-auto justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">🧠</span>
                    <span className="text-lg font-semibold">Brand Analysis Insights</span>
                  </div>
                  {isInsightsExpanded ? (
                    <ChevronUpIcon className="h-5 w-5" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                  )}
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Quick Insights */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Personality Overview</h4>
                        <div className="h-48">
                          <DonutChart 
                            data={personalityDonutData}
                            title=""
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Top 3 Keywords</h4>
                        <div className="space-y-2">
                          {keywords.length > 0 ? keywords.slice(0, 3).map((keyword, index) => (
                            <div key={keyword.keyword} className="flex items-center justify-between">
                              <span className="text-sm">{keyword.keyword}</span>
                              <Badge variant="secondary">
                                {Math.round(keyword.score * 100)}%
                              </Badge>
                            </div>
                          )) : (
                            <p className="text-sm text-muted-foreground">No keywords available</p>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Target Audience</h4>
                        <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                          {audienceSummary}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </TabsContent>

        {/* Brand Insights Tab */}
        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-6">
            {keywords.length > 0 && <KeywordInsights keywords={keywords} />}
            {themes.length > 0 && <ThemesDisplay themes={themes} />}
            {Object.keys(personalityScores).length > 0 && <PersonalityScores personalityScores={personalityScores} />}
            {targetAudience && (
              <TargetAudienceProfile targetAudience={targetAudience} />
            )}
            
            {/* Show message if no data available */}
            {keywords.length === 0 && themes.length === 0 && Object.keys(personalityScores).length === 0 && (
              <div className="bg-card p-6 rounded-2xl shadow-lg border border-border">
                <p className="text-center text-muted-foreground">
                  No detailed insights available. The analysis may still be processing or the website structure was not recognized.
                </p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Charts Tab */}
        <TabsContent value="charts" className="space-y-6">
          <div className="grid gap-6">
            {keywordChartData.length > 0 && (
              <Card>
                <CardContent className="pt-6">
                  <BarChart 
                    data={keywordChartData}
                    title="Keyword Relevance Distribution"
                    color="hsl(var(--primary))"
                  />
                </CardContent>
              </Card>
            )}
            
            {personalityChartData.length > 0 && (
              <>
                <Card>
                  <CardContent className="pt-6">
                    <RadarChart 
                      data={personalityChartData}
                      title="Personality Trait Strength"
                      color="hsl(var(--primary))"
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <DonutChart 
                      data={personalityDonutData}
                      title="Personality Score Distribution"
                    />
                  </CardContent>
                </Card>
              </>
            )}
            
            {/* Show message if no chart data available */}
            {keywordChartData.length === 0 && personalityChartData.length === 0 && (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    No chart data available. The analysis may not have returned the expected data structure.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}