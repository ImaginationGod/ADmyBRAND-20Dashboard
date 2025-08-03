import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Filter,
  Calendar,
  TrendingUp,
  DollarSign,
  Users,
  X
} from "lucide-react";

export default function AdvancedFilters({ children, onFiltersChange }) {
  const [filters, setFilters] = useState({
    dateRange: "30days",
    campaign: "all",
    revenue: "all",
    conversion: "all",
    source: "all"
  });

  const [appliedFilters, setAppliedFilters] = useState([]);

  const filterOptions = {
    dateRange: [
      { value: "7days", label: "Last 7 days" },
      { value: "30days", label: "Last 30 days" },
      { value: "3months", label: "Last 3 months" },
      { value: "6months", label: "Last 6 months" },
      { value: "1year", label: "Last year" },
      { value: "custom", label: "Custom range" },
    ],
    campaign: [
      { value: "all", label: "All campaigns" },
      { value: "active", label: "Active only" },
      { value: "paused", label: "Paused only" },
      { value: "completed", label: "Completed only" },
    ],
    revenue: [
      { value: "all", label: "All revenue ranges" },
      { value: "high", label: "$50k+ revenue" },
      { value: "medium", label: "$10k - $50k revenue" },
      { value: "low", label: "Under $10k revenue" },
    ],
    conversion: [
      { value: "all", label: "All conversion rates" },
      { value: "high", label: "Above 4% CTR" },
      { value: "medium", label: "2% - 4% CTR" },
      { value: "low", label: "Under 2% CTR" },
    ],
    source: [
      { value: "all", label: "All sources" },
      { value: "organic", label: "Organic search" },
      { value: "paid", label: "Paid ads" },
      { value: "social", label: "Social media" },
      { value: "email", label: "Email marketing" },
    ]
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
  };

  const applyFilters = () => {
    const activeFilters = [];
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "all") {
        const option = filterOptions[key].find(opt => opt.value === value);
        if (option) {
          activeFilters.push({
            key,
            value,
            label: option.label
          });
        }
      }
    });
    
    setAppliedFilters(activeFilters);
    onFiltersChange?.(filters);
  };

  const removeFilter = (key) => {
    const newFilters = { ...filters, [key]: "all" };
    setFilters(newFilters);
    
    const newAppliedFilters = appliedFilters.filter(filter => filter.key !== key);
    setAppliedFilters(newAppliedFilters);
    onFiltersChange?.(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      dateRange: "30days",
      campaign: "all",
      revenue: "all",
      conversion: "all",
      source: "all"
    };
    setFilters(clearedFilters);
    setAppliedFilters([]);
    onFiltersChange?.(clearedFilters);
  };

  return (
    <div className="space-y-4">
      {/* Applied Filters */}
      {appliedFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {appliedFilters.map((filter) => (
            <div 
              key={filter.key}
              className="flex items-center gap-1 px-2 py-1 bg-brand-100 dark:bg-brand-900 text-brand-700 dark:text-brand-300 rounded-full text-xs"
            >
              <span>{filter.label}</span>
              <button
                onClick={() => removeFilter(filter.key)}
                className="hover:bg-brand-200 dark:hover:bg-brand-800 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters}
            className="text-xs"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Filter Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Advanced Filters
            </DialogTitle>
            <DialogDescription>
              Apply advanced filters to refine your analytics data view.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Date Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date Range
              </label>
              <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange("dateRange", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.dateRange.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Campaign Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Campaign Status
              </label>
              <Select value={filters.campaign} onValueChange={(value) => handleFilterChange("campaign", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.campaign.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Revenue Range */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Revenue Range
              </label>
              <Select value={filters.revenue} onValueChange={(value) => handleFilterChange("revenue", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.revenue.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Conversion Rate */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <Users className="w-4 h-4" />
                Conversion Rate
              </label>
              <Select value={filters.conversion} onValueChange={(value) => handleFilterChange("conversion", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.conversion.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Traffic Source */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Traffic Source
              </label>
              <Select value={filters.source} onValueChange={(value) => handleFilterChange("source", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.source.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Apply Button */}
            <Button onClick={applyFilters} className="w-full">
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
