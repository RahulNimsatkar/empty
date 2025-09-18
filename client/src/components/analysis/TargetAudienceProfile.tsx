import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { type TargetAudience } from "@/lib/brandAnalysis";

interface TargetAudienceProfileProps {
  targetAudience: TargetAudience;
  className?: string;
}

export function TargetAudienceProfile({ targetAudience, className = "" }: TargetAudienceProfileProps) {
  const { demographics, psychographics } = targetAudience;

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-primary">👥</span>
          Target Audience Profile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Demographics */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              📊 Demographics
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Age Range</p>
                <p className="font-medium">{demographics.age_range}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Gender</p>
                <p className="font-medium">{demographics.gender}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Income Level</p>
                <p className="font-medium">{demographics.income_level}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Psychographics */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              🧭 Psychographics
            </h4>
            
            {/* Values */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Values</p>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(psychographics.values) ? 
                  psychographics.values.map((value, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {value}
                    </Badge>
                  )) :
                  <Badge variant="outline" className="text-xs">
                    {String(psychographics.values)}
                  </Badge>
                }
              </div>
            </div>

            {/* Interests */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Interests</p>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(psychographics.interests) ?
                  psychographics.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  )) :
                  <Badge variant="secondary" className="text-xs">
                    {String(psychographics.interests)}
                  </Badge>
                }
              </div>
            </div>

            {/* Lifestyle */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Lifestyle</p>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(psychographics.lifestyle) ?
                  psychographics.lifestyle.map((lifestyle, index) => (
                    <Badge key={index} variant="default" className="text-xs">
                      {lifestyle}
                    </Badge>
                  )) :
                  <Badge variant="default" className="text-xs">
                    {String(psychographics.lifestyle)}
                  </Badge>
                }
              </div>
            </div>
          </div>

          {/* Audience Summary */}
          <div className="pt-3 border-t border-border">
            <div className="p-3 bg-primary/10 rounded-lg">
              <h5 className="font-medium mb-2">Audience Summary</h5>
              <p className="text-sm text-muted-foreground">
                Your target audience consists of <strong>{demographics.age_range}</strong> individuals 
                with <strong>{demographics.income_level}</strong> income levels who value{" "}
                <strong>{Array.isArray(psychographics.values) ? 
                  psychographics.values.slice(0, 2).join(" and ") : 
                  String(psychographics.values)}</strong> and are interested in{" "}
                <strong>{Array.isArray(psychographics.interests) ? 
                  psychographics.interests.slice(0, 2).join(" and ") : 
                  String(psychographics.interests)}</strong>.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}