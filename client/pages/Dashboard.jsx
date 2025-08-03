import { useState, useEffect } from "react";
import MetricsCard from "@/components/MetricsCard";
import RevenueLineChart from "@/components/charts/LineChart";
import ConversionPieChart from "@/components/charts/PieChart";
import CampaignBarChart from "@/components/charts/BarChart";
import {
  DollarSign,
  Users,
  TrendingUp,
  Target,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for the dashboard
const generateMockData = () => ({
  metrics: {
    revenue: {
      value: "$284,350",
      change: "+12.5%",
      changeType: "positive",
      raw: 284350
    },
    users: {
      value: "12,847",
      change: "+8.2%", 
      changeType: "positive",
      raw: 12847
    },
    conversions: {
      value: "2,456",
      change: "+15.3%",
      changeType: "positive", 
      raw: 2456
    },
    growth: {
      value: "23.8%",
      change: "+2.1%",
      changeType: "positive",
      raw: 23.8
    }
  },
  lastUpdated: new Date().toLocaleTimeString()
});

export default function Dashboard() {
  const [data, setData] = useState(generateMockData());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateMockData());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setData(generateMockData());
    setIsRefreshing(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Analytics Overview
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with your campaigns today.
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Last 30 days
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Revenue"
          value={data.metrics.revenue.value}
          change={data.metrics.revenue.change}
          changeType={data.metrics.revenue.changeType}
          icon={DollarSign}
          color="success"
        />
        <MetricsCard
          title="Active Users"
          value={data.metrics.users.value}
          change={data.metrics.users.change}
          changeType={data.metrics.users.changeType}
          icon={Users}
          color="info"
        />
        <MetricsCard
          title="Conversions"
          value={data.metrics.conversions.value}
          change={data.metrics.conversions.change}
          changeType={data.metrics.conversions.changeType}
          icon={Target}
          color="warning"
        />
        <MetricsCard
          title="Growth Rate"
          value={data.metrics.growth.value}
          change={data.metrics.growth.change}
          changeType={data.metrics.growth.changeType}
          icon={TrendingUp}
          color="brand"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-card rounded-xl border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Revenue Trends</h3>
              <p className="text-sm text-muted-foreground">Monthly revenue performance</p>
            </div>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
          
          {/* Revenue Line Chart */}
          <div className="h-80">
            <RevenueLineChart />
          </div>
        </div>

        {/* Conversion Chart */}
        <div className="bg-card rounded-xl border p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Conversions</h3>
              <p className="text-sm text-muted-foreground">By source</p>
            </div>
          </div>
          
          {/* Conversion Pie Chart */}
          <div className="h-80">
            <ConversionPieChart />
          </div>
        </div>
      </div>

      {/* Performance Bar Chart */}
      <div className="bg-card rounded-xl border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Campaign Performance</h3>
            <p className="text-sm text-muted-foreground">Compare campaign effectiveness</p>
          </div>
          <Button variant="outline" size="sm">
            Customize
          </Button>
        </div>
        
        {/* Placeholder for bar chart */}
        <div className="h-64 bg-gradient-to-r from-warning/10 via-brand/10 to-info/10 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <TrendingUp className="w-12 h-12 text-brand-500 mx-auto mb-3" />
            <p className="text-muted-foreground">Bar Chart Component</p>
            <p className="text-sm text-muted-foreground">Will be implemented next</p>
          </div>
        </div>
      </div>

      {/* Data Table Section */}
      <div className="bg-card rounded-xl border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Recent Campaigns</h3>
            <p className="text-sm text-muted-foreground">Latest campaign data and metrics</p>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
        
        {/* Placeholder for data table */}
        <div className="h-64 bg-gradient-to-br from-muted/50 to-accent/50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Data Table Component</p>
            <p className="text-sm text-muted-foreground">Will be implemented next</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4">
        <p className="text-sm text-muted-foreground">
          Last updated: {data.lastUpdated} • Data refreshes automatically every 30 seconds
        </p>
      </div>
    </div>
  );
}
