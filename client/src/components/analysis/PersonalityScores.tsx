import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { type PersonalityScores } from "@/lib/brandAnalysis";

interface PersonalityScoresProps {
  personalityScores: PersonalityScores;
  className?: string;
}

export function PersonalityScores({ personalityScores, className = "" }: PersonalityScoresProps) {
  const [expandedTraits, setExpandedTraits] = useState<Record<string, boolean>>({});

  const toggleTrait = (trait: string) => {
    setExpandedTraits(prev => ({
      ...prev,
      [trait]: !prev[trait]
    }));
  };

  const traits = [
    { key: "sincerity", label: "Sincerity", icon: "💙", color: "hsl(var(--primary))" },
    { key: "excitement", label: "Excitement", icon: "⚡", color: "hsl(var(--destructive))" },
    { key: "competence", label: "Competence", icon: "🎯", color: "hsl(var(--primary))" },
    { key: "sophistication", label: "Sophistication", icon: "✨", color: "hsl(var(--secondary))" },
    { key: "ruggedness", label: "Ruggedness", icon: "🏔️", color: "hsl(var(--muted))" },
  ];

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-primary">🧠</span>
          Personality Scores
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {traits.map((trait) => {
            const traitData = personalityScores[trait.key as keyof PersonalityScores];
            if (!traitData) return null;
            
            const isExpanded = expandedTraits[trait.key];
            
            return (
              <Collapsible key={trait.key}>
                <div className="space-y-2">
                  {/* Score Bar */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span>{trait.icon}</span>
                      <span className="font-medium">{trait.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">
                      {traitData.score}%
                    </span>
                  </div>
                  
                  <Progress 
                    value={traitData.score} 
                    className="h-2"
                    style={{"--progress-foreground": trait.color} as React.CSSProperties}
                  />
                  
                  {/* Expandable Justification */}
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleTrait(trait.key)}
                      className="w-full justify-between text-sm text-muted-foreground hover:text-foreground"
                    >
                      <span>View justification</span>
                      {isExpanded ? (
                        <ChevronUpIcon className="h-4 w-4" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    <div className="p-3 bg-muted/50 rounded text-sm text-muted-foreground">
                      {traitData.justification}
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            );
          })}
          
          {/* Summary */}
          <div className="pt-3 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Personality analysis based on brand communication patterns and values.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}