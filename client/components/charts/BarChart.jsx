import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const campaignData = [
  { campaign: 'Summer Sale', impressions: 45000, clicks: 2800, conversions: 340 },
  { campaign: 'Black Friday', impressions: 72000, clicks: 4200, conversions: 520 },
  { campaign: 'New Year', impressions: 38000, clicks: 2100, conversions: 280 },
  { campaign: 'Spring Launch', impressions: 55000, clicks: 3400, conversions: 410 },
  { campaign: 'Back to School', impressions: 48000, clicks: 2900, conversions: 360 },
  { campaign: 'Holiday Special', impressions: 63000, clicks: 3800, conversions: 470 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm flex justify-between" style={{ color: entry.color }}>
            <span>{entry.name}:</span>
            <span className="ml-2 font-medium">{entry.value.toLocaleString()}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function CampaignBarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={campaignData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis 
          dataKey="campaign" 
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value / 1000}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="impressions" 
          fill="hsl(var(--brand-400))" 
          radius={[4, 4, 0, 0]}
          name="Impressions"
        />
        <Bar 
          dataKey="clicks" 
          fill="hsl(var(--success))" 
          radius={[4, 4, 0, 0]}
          name="Clicks"
        />
        <Bar 
          dataKey="conversions" 
          fill="hsl(var(--warning))" 
          radius={[4, 4, 0, 0]}
          name="Conversions"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
