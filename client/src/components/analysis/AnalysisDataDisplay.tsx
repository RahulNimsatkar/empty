import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { type BrandAnalysisData } from "@/lib/brandAnalysis";

interface AnalysisDataDisplayProps {
  brandAnalysis: BrandAnalysisData;
  className?: string;
}

export function AnalysisDataDisplay({ brandAnalysis, className = "" }: AnalysisDataDisplayProps) {
  const { brand_profile } = brandAnalysis;

  if (!brand_profile) {
    return (
      <div className={`space-y-6 ${className}`}>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">No analysis data available</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { keywords = [], themes = [], personality_scores = {}, inferred_target_audience } = brand_profile;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Keywords Section */}
      {keywords.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🔍 Keywords Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-3">
                {keywords.map((keyword, index) => (
                  <div key={keyword.keyword} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <span className="font-medium">{keyword.keyword}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">
                        {Math.round(keyword.score * 100)}%
                      </div>
                      <Progress value={keyword.score * 100} className="w-16 h-1 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Themes Section */}
      {themes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🎯 Brand Themes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {themes.map((theme, index) => (
                <div key={theme} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className={`w-4 h-4 rounded-full ${
                    index === 0 ? "bg-primary" : "bg-secondary"
                  }`} />
                  <span className={`${
                    index === 0 ? "font-semibold text-foreground" : "text-muted-foreground"
                  }`}>
                    {theme}
                  </span>
                  {index === 0 && (
                    <Badge variant="secondary" className="text-xs ml-auto">
                      Primary Theme
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Personality Scores Section */}
      {Object.keys(personality_scores).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🧠 Personality Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(personality_scores).map(([trait, data]) => {
                const personalityData = data as { score: number; justification: string };
                return (
                  <div key={trait} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold capitalize">{trait}</h4>
                      <span className="text-lg font-bold text-primary">{personalityData.score}%</span>
                    </div>
                    <Progress value={personalityData.score} className="h-2" />
                    <div className="p-3 bg-muted/30 rounded text-sm text-muted-foreground">
                      <strong>Analysis:</strong> {personalityData.justification}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Target Audience Section */}
      {inferred_target_audience && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              👥 Target Audience Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Demographics */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  📊 Demographics
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Age Range</p>
                    <p className="font-semibold">{inferred_target_audience.demographics.age_range}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Gender</p>
                    <p className="font-semibold">{inferred_target_audience.demographics.gender}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Income Level</p>
                    <p className="font-semibold">{inferred_target_audience.demographics.income_level}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Psychographics */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  🧭 Psychographics
                </h4>
                
                <div className="space-y-4">
                  {/* Values */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Values</p>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(inferred_target_audience.psychographics.values) ? 
                        inferred_target_audience.psychographics.values.map((value, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
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
                    <p className="text-sm font-medium text-muted-foreground mb-2">Interests</p>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(inferred_target_audience.psychographics.interests) ?
                        inferred_target_audience.psychographics.interests.map((interest, index) => (
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

                  {/* Lifestyle */}
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Lifestyle</p>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(inferred_target_audience.psychographics.lifestyle) ?
                        inferred_target_audience.psychographics.lifestyle.map((lifestyle, index) => (
                          <Badge key={index} variant="default" className="text-xs">
                            {lifestyle}
                          </Badge>
                        )) :
                        <Badge variant="default" className="text-xs">
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
      )}
    </div>
  );
}