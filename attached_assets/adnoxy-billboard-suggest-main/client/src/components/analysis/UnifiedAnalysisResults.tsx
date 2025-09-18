import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  EyeOpenIcon, 
  BarChartIcon, 
  PersonIcon, 
  TargetIcon,
  LightningBoltIcon,
  PieChartIcon
} from "@radix-ui/react-icons";
import { type BrandAnalysisData } from "@/lib/brandAnalysis";
import { DonutChart } from "@/components/charts/DonutChart";
import { BarChart } from "@/components/charts/BarChart";
import { RadarChart } from "@/components/charts/RadarChart";

interface UnifiedAnalysisResultsProps {
  brandAnalysis: BrandAnalysisData;
  formData: {
    brandName: string;
    location: string;
    budgeted: string;
    description: string;
  };
}

export function UnifiedAnalysisResults({ brandAnalysis, formData }: UnifiedAnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const { brand_profile } = brandAnalysis;

  if (!brand_profile) {
    return (
      <div className="flex items-center justify-center p-12">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">
              Brand analysis data is not available. Please try analyzing again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { keywords = [], themes = [], personality_scores = {}, inferred_target_audience } = brand_profile;

  // Prepare chart data
  const keywordChartData = keywords.slice(0, 8).map(k => ({
    name: k.keyword,
    value: Math.round(k.score * 100)
  }));

  const personalityChartData = Object.entries(personality_scores).map(([trait, data]) => {
    const personalityData = data as { score: number; justification: string };
    return {
      trait: trait.charAt(0).toUpperCase() + trait.slice(1),
      score: personalityData.score * 10
    };
  });

  // Define specific colors for each personality trait
  const traitColors: Record<string, string> = {
    sincerity: '#3b82f6',      // Blue
    excitement: '#f59e0b',     // Orange  
    competence: '#10b981',     // Green
    sophistication: '#8b5cf6', // Purple
    ruggedness: '#ef4444',     // Red
    openness: '#06b6d4',       // Cyan
    conscientiousness: '#84cc16', // Lime
    extraversion: '#f97316',   // Orange-red
    agreeableness: '#22c55e',  // Green-light
    neuroticism: '#ec4899'     // Pink
  };

  const personalityDonutData = Object.entries(personality_scores).map(([trait, data]) => {
    const personalityData = data as { score: number; justification: string };
    return {
      name: `${trait.charAt(0).toUpperCase() + trait.slice(1)} (${Math.round(personalityData.score * 10)}%)`,
      value: personalityData.score * 10,
      color: traitColors[trait.toLowerCase()] || '#6b7280'
    };
  });

  const topKeywords = keywords.slice(0, 5);
  const topPersonalityTraits = Object.entries(personality_scores)
    .sort(([,a], [,b]) => {
      const aData = a as { score: number; justification: string };
      const bData = b as { score: number; justification: string };
      return bData.score - aData.score;
    })
    .slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Campaign Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <Card>
          <CardContent className="p-8 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Campaign Overview</h3>
              <p className="text-muted-foreground">Your billboard campaign details and AI-powered insights</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Brand Name</p>
                <p className="font-semibold text-base sm:text-lg break-words">{formData.brandName || 'Not specified'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Target Location</p>
                <p className="font-semibold text-base sm:text-lg break-words">{formData.location || 'Not specified'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Budget</p>
                <p className="font-semibold text-base sm:text-lg">{formData.budgeted ? `₹${parseInt(formData.budgeted).toLocaleString('en-IN')}` : 'Not specified'}</p>
              </div>
            </div>

            {/* Quick Insights */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Top Brand Keywords</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {topKeywords.slice(0, 3).map((keyword, index) => (
                  <div key={keyword.keyword} className="p-3 bg-muted/30 rounded-lg border border-muted/50 hover:bg-muted/40 transition-colors">
                    <span className="text-sm font-medium">
                      {keyword.keyword} ({Math.round(keyword.score * 100)}%)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Analysis Sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3">
            <LightningBoltIcon className="h-4 w-4" />
            <span className="text-xs sm:text-sm font-medium">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="personality" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3">
            <PersonIcon className="h-4 w-4" />
            <span className="text-xs sm:text-sm font-medium">Personality</span>
          </TabsTrigger>
          <TabsTrigger value="audience" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3">
            <TargetIcon className="h-4 w-4" />
            <span className="text-xs sm:text-sm font-medium">Audience</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3">
            <PieChartIcon className="h-4 w-4" />
            <span className="text-xs sm:text-sm font-medium">Analytics</span>
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Keywords Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🔍 Top Keywords
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {keywords.map((keyword, index) => {
                    const score = Math.round(keyword.score * 100);
                    const isTopKeyword = index < 3; // Top 3 keywords get blue styling
                    
                    return (
                      <motion.div
                        key={keyword.keyword}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all hover:scale-105 whitespace-nowrap ${
                          isTopKeyword 
                            ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600' 
                            : 'bg-muted/70 text-muted-foreground hover:bg-muted'
                        }`}
                      >
                        {keyword.keyword} ({score}%)
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Brand Themes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎯 Brand Themes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {themes.slice(0, 6).map((theme, index) => (
                    <motion.div
                      key={theme}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex w-full items-center p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                    >
                      <span className={`flex-grow ${
                        index === 0 ? "font-semibold text-foreground" : 
                        index === 1 ? "font-medium text-foreground" : "text-muted-foreground"
                      }`}>
                        {theme}
                      </span>
                      <Badge variant={index === 0 ? "default" : "secondary"} className="text-xs ml-auto min-w-[100px] text-center">
                        {index === 0 ? "[Primary Theme]" : "[Theme]"}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Personality Tab */}
        <TabsContent value="personality" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Personality Scores */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    🧠 Personality Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {Object.entries(personality_scores).map(([trait, data], index) => {
                      const personalityData = data as { score: number; justification: string };
                      return (
                        <motion.div
                          key={trait}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="space-y-3"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold capitalize text-lg">{trait}</h4>
                            <span className="text-2xl font-bold text-primary">{Math.round(personalityData.score * 10)}%</span>
                          </div>
                          <Progress value={personalityData.score * 10} className="h-3" />
                          <div className="p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-lg border-l-4 border-primary/20">
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              <span className="font-medium text-foreground">Analysis:</span> {personalityData.justification}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Personality Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Personality Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <DonutChart 
                    data={personalityDonutData}
                    title=""
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Audience Tab */}
        <TabsContent value="audience" className="space-y-6">
          {inferred_target_audience && (
            <>
              {/* Audience Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    📋 Audience Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-6 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-lg border border-primary/20">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-lg mb-3 text-primary">Primary Target</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            <span className="font-medium text-foreground">Age:</span> {inferred_target_audience.demographics.age_range}
                          </p>
                          <p className="text-sm text-muted-foreground mb-2">
                            <span className="font-medium text-foreground">Gender:</span> {inferred_target_audience.demographics.gender}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">Income:</span> {inferred_target_audience.demographics.income_level}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg mb-3 text-primary">Key Characteristics</h4>
                          <div className="space-y-2">
                            <div className="flex flex-wrap gap-1">
                              <span className="text-sm text-muted-foreground">Values:</span>
                              {Array.isArray(inferred_target_audience.psychographics.values) ? 
                                inferred_target_audience.psychographics.values.slice(0, 3).map((value, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {value}
                                  </Badge>
                                )) :
                                <Badge variant="outline" className="text-xs">
                                  {String(inferred_target_audience.psychographics.values)}
                                </Badge>
                              }
                            </div>
                            <div className="flex flex-wrap gap-1">
                              <span className="text-sm text-muted-foreground">Interests:</span>
                              {Array.isArray(inferred_target_audience.psychographics.interests) ?
                                inferred_target_audience.psychographics.interests.slice(0, 3).map((interest, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {interest}
                                  </Badge>
                                )) :
                                <Badge variant="secondary" className="text-xs">
                                  {String(inferred_target_audience.psychographics.interests)}
                                </Badge>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Campaign Alignment */}
                    <div className="p-4 bg-muted/30 rounded-lg border">
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        🎯 Campaign Alignment
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Based on your campaign description and brand analysis, this audience profile aligns well with your {formData.location} billboard placement. 
                        The target demographic matches the foot traffic patterns typical for this location, and their interests align with your brand's core messaging themes.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Target Audience Profile */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    👥 Detailed Audience Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {/* Demographics */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      📊 Demographics
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800"
                      >
                        <p className="text-sm text-muted-foreground mb-1">Age Range</p>
                        <p className="text-xl font-bold text-blue-700 dark:text-blue-300">{inferred_target_audience.demographics.age_range}</p>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-800"
                      >
                        <p className="text-sm text-muted-foreground mb-1">Gender</p>
                        <p className="text-xl font-bold text-purple-700 dark:text-purple-300">{inferred_target_audience.demographics.gender}</p>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-800"
                      >
                        <p className="text-sm text-muted-foreground mb-1">Income Level</p>
                        <p className="text-xl font-bold text-green-700 dark:text-green-300">{inferred_target_audience.demographics.income_level}</p>
                      </motion.div>
                    </div>
                  </div>

                  <Separator />

                  {/* Psychographics */}
                  <div>
                    <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      🧭 Psychographics
                    </h4>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Values */}
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-3">Core Values</p>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(inferred_target_audience.psychographics.values) ? 
                            inferred_target_audience.psychographics.values.map((value, index) => (
                              <Badge key={index} variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                                {value}
                              </Badge>
                            )) :
                            <Badge variant="outline" className="text-xs">
                              {String(inferred_target_audience.psychographics.values)}
                            </Badge>
                          }
                        </div>
                      </div>

                      {/* Interests */}
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-3">Interests</p>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(inferred_target_audience.psychographics.interests) ?
                            inferred_target_audience.psychographics.interests.map((interest, index) => (
                              <Badge key={index} variant="secondary" className="text-xs bg-purple-50 dark:bg-purple-900/20">
                                {interest}
                              </Badge>
                            )) :
                            <Badge variant="secondary" className="text-xs">
                              {String(inferred_target_audience.psychographics.interests)}
                            </Badge>
                          }
                        </div>
                      </div>

                      {/* Lifestyle */}
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-3">Lifestyle</p>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(inferred_target_audience.psychographics.lifestyle) ?
                            inferred_target_audience.psychographics.lifestyle.map((lifestyle, index) => (
                              <Badge key={index} className="text-xs bg-white dark:bg-gray-100 text-foreground border border-input">
                                {lifestyle}
                              </Badge>
                            )) :
                            <Badge className="text-xs bg-white dark:bg-gray-100 text-foreground border border-input">
                              {String(inferred_target_audience.psychographics.lifestyle)}
                            </Badge>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </>
          )}
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Keyword Chart */}
            {keywordChartData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Keyword Relevance Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <BarChart 
                      data={keywordChartData}
                      title=""
                      color="hsl(var(--primary))"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Personality Radar */}
            {personalityChartData.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Personality Radar</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <RadarChart 
                      data={personalityChartData}
                      title=""
                      color="hsl(var(--primary))"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
