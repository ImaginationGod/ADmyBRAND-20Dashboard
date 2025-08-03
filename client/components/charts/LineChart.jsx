import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockRevenueData = [
  { month: 'Jan', revenue: 45000, users: 1200 },
  { month: 'Feb', revenue: 52000, users: 1350 },
  { month: 'Mar', revenue: 48000, users: 1280 },
  { month: 'Apr', revenue: 61000, users: 1520 },
  { month: 'May', revenue: 55000, users: 1450 },
  { month: 'Jun', revenue: 67000, users: 1680 },
  { month: 'Jul', revenue: 72000, users: 1820 },
  { month: 'Aug', revenue: 69000, users: 1750 },
  { month: 'Sep', revenue: 78000, users: 1950 },
  { month: 'Oct', revenue: 84000, users: 2100 },
  { month: 'Nov', revenue: 91000, users: 2280 },
  { month: 'Dec', revenue: 96000, users: 2400 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium text-foreground">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: $${entry.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function RevenueLineChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={mockRevenueData}>
        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
        <XAxis 
          dataKey="month" 
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value / 1000}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke="hsl(var(--brand-500))"
          strokeWidth={3}
          dot={{ fill: "hsl(var(--brand-500))", strokeWidth: 0, r: 4 }}
          activeDot={{ r: 6, stroke: "hsl(var(--brand-500))", strokeWidth: 2, fill: "hsl(var(--background))" }}
          name="Revenue"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
