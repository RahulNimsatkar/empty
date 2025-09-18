import { Radar, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts";

interface RadarChartProps {
  data: Array<{
    trait: string;
    score: number;
  }>;
  title?: string;
  className?: string;
  color?: string;
}

export function RadarChart({ data, title, className = "", color = "hsl(var(--primary))" }: RadarChartProps) {
  return (
    <div className={`w-full h-80 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-center text-card-foreground">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis 
            dataKey="trait" 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
          />
          <PolarRadiusAxis 
            domain={[0, 100]} 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
            tickCount={5}
          />
          <Radar
            name="Personality Score"
            dataKey="score"
            stroke={color}
            fill={color}
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Legend
            formatter={() => <span style={{ color: 'hsl(var(--card-foreground))' }}>Personality Traits</span>}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}