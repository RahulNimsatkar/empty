import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type KeywordInsight } from "@/lib/brandAnalysis";

interface KeywordInsightsProps {
  keywords: KeywordInsight[];
  className?: string;
}

export function KeywordInsights({ keywords, className = "" }: KeywordInsightsProps) {
  // Sort keywords by score descending
  const sortedKeywords = [...keywords].sort((a, b) => b.score - a.score);
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-primary">🔍</span>
          Keyword Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Tag Cloud Style Display */}
          <div className="flex flex-wrap gap-2">
            {sortedKeywords.map((item, index) => {
              const scorePercentage = Math.round(item.score * 100);
              const isTopKeyword = index < 3;
              
              return (
                <Badge
                  key={item.keyword}
                  variant={isTopKeyword ? "default" : "secondary"}
                  className={`text-sm py-2 px-3 ${
                    isTopKeyword 
                      ? "bg-primary text-primary-foreground font-semibold" 
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {item.keyword} ({scorePercentage}%)
                </Badge>
              );
            })}
          </div>
          
          {/* Top 3 Keywords List */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Top Keywords</h4>
            {sortedKeywords.slice(0, 3).map((item, index) => (
              <div key={item.keyword} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <span className="font-medium">{item.keyword}</span>
                </div>
                <span className="text-sm font-semibold text-primary">
                  {Math.round(item.score * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}