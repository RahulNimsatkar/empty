import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface BarChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  title?: string;
  className?: string;
  color?: string;
}

export function BarChart({ data, title, className = "", color = "hsl(var(--primary))" }: BarChartProps) {
  return (
    <div className={`w-full h-80 ${className}`}>
      {title && (
        <h3 className="text-lg font-semibold mb-4 text-center text-card-foreground">{title}</h3>
      )}
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="name" 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            domain={[0, 100]}
          />
          <Tooltip
            formatter={(value: number) => [`${value}%`, 'Score']}
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              color: 'hsl(var(--card-foreground))'
            }}
          />
          <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}