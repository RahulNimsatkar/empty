import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ThemesDisplayProps {
  themes: string[];
  className?: string;
}

export function ThemesDisplay({ themes, className = "" }: ThemesDisplayProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-primary">🎯</span>
          Brand Themes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Main Themes List */}
          <div className="space-y-2">
            {themes.map((theme, index) => (
              <div key={theme} className="flex w-full items-center">
                <span className={`flex-grow ${
                  index === 0 
                    ? "font-semibold text-foreground" 
                    : "text-muted-foreground"
                }`}>
                  {theme}
                </span>
                <Badge variant={index === 0 ? "default" : "secondary"} className="text-xs ml-auto min-w-[100px] text-center">
                  {index === 0 ? "[Primary Theme]" : "[Theme]"}
                </Badge>
              </div>
            ))}
          </div>
          
          {/* Summary */}
          <div className="pt-3 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Identified <strong>{themes.length}</strong> key brand themes that define your brand identity.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
