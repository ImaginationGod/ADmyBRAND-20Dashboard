import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const conversionData = [
  { name: 'Organic Search', value: 35, color: 'hsl(var(--brand-500))' },
  { name: 'Paid Ads', value: 28, color: 'hsl(var(--success))' },
  { name: 'Social Media', value: 20, color: 'hsl(var(--info))' },
  { name: 'Email', value: 12, color: 'hsl(var(--warning))' },
  { name: 'Direct', value: 5, color: 'hsl(var(--muted-foreground))' },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-card border rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium text-foreground">{data.name}</p>
        <p className="text-sm text-muted-foreground">{`${data.value}% of conversions`}</p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-col space-y-2 mt-4">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center space-x-2 text-sm">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-foreground font-medium">{entry.value}</span>
          <span className="text-muted-foreground">
            {conversionData.find(item => item.name === entry.value)?.value}%
          </span>
        </div>
      ))}
    </div>
  );
};

export default function ConversionPieChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={conversionData}
          cx="50%"
          cy="40%"
          innerRadius={40}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
        >
          {conversionData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
