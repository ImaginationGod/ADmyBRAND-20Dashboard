import { TrendingUp, TrendingDown } from "lucide-react";

export default function MetricsCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon: Icon,
  color = "brand" 
}) {
  const isPositive = changeType === "positive";
  
  const colorClasses = {
    brand: "bg-brand-500",
    success: "bg-success",
    warning: "bg-warning", 
    info: "bg-info"
  };

  return (
    <div className="bg-card rounded-xl border p-6 hover:shadow-lg transition-all duration-300 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </p>
          <p className="text-3xl font-bold text-foreground mt-2">
            {value}
          </p>
          <div className="flex items-center mt-3 space-x-2">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-success" />
            ) : (
              <TrendingDown className="w-4 h-4 text-destructive" />
            )}
            <span className={`text-sm font-medium ${
              isPositive ? "text-success" : "text-destructive"
            }`}>
              {change}
            </span>
            <span className="text-sm text-muted-foreground flex">vs last month</span>
          </div>
        </div>
        
        <div className={`${colorClasses[color]} p-3 rounded-xl`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}
