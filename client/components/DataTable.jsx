import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight,
  Search,
  Filter,
  ArrowUpDown
} from "lucide-react";

// Mock campaign data
const campaignData = [
  { id: 1, name: "Summer Sale 2024", status: "Active", budget: 15000, spent: 12400, conversions: 340, ctr: 3.2, roas: 4.8 },
  { id: 2, name: "Black Friday Mega Sale", status: "Active", budget: 25000, spent: 22100, conversions: 520, ctr: 4.1, roas: 5.2 },
  { id: 3, name: "New Year Campaign", status: "Paused", budget: 8000, spent: 7200, conversions: 180, ctr: 2.8, roas: 3.9 },
  { id: 4, name: "Spring Launch", status: "Active", budget: 18000, spent: 15600, conversions: 410, ctr: 3.7, roas: 4.3 },
  { id: 5, name: "Back to School", status: "Completed", budget: 12000, spent: 11800, conversions: 290, ctr: 3.1, roas: 4.1 },
  { id: 6, name: "Holiday Special", status: "Active", budget: 20000, spent: 18200, conversions: 470, ctr: 3.9, roas: 4.7 },
  { id: 7, name: "Valentine's Day", status: "Completed", budget: 5000, spent: 4800, conversions: 85, ctr: 2.9, roas: 3.5 },
  { id: 8, name: "Mother's Day Special", status: "Active", budget: 7500, spent: 6200, conversions: 150, ctr: 3.3, roas: 4.0 },
  { id: 9, name: "Father's Day Sale", status: "Paused", budget: 6000, spent: 4500, conversions: 120, ctr: 2.7, roas: 3.8 },
  { id: 10, name: "End of Year Clearance", status: "Draft", budget: 30000, spent: 0, conversions: 0, ctr: 0, roas: 0 },
];

const statusColors = {
  Active: "bg-success text-success-foreground",
  Paused: "bg-warning text-warning-foreground", 
  Completed: "bg-muted text-muted-foreground",
  Draft: "bg-secondary text-secondary-foreground"
};

export default function DataTable() {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Filter and search data
  const filteredData = useMemo(() => {
    let filtered = campaignData;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    // Apply sorting
    if (sortColumn) {
      filtered.sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        
        if (typeof aVal === "string") {
          return sortDirection === "asc" 
            ? aVal.localeCompare(bVal)
            : bVal.localeCompare(aVal);
        } else {
          return sortDirection === "asc" 
            ? aVal - bVal 
            : bVal - aVal;
        }
      });
    }

    return filtered;
  }, [searchTerm, statusFilter, sortColumn, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (column) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="w-4 h-4 opacity-50" />;
    }
    return sortDirection === "asc" 
      ? <ChevronUp className="w-4 h-4" />
      : <ChevronDown className="w-4 h-4" />;
  };

  const uniqueStatuses = [...new Set(campaignData.map(item => item.status))];

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-background border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
          >
            <option value="All">All Status</option>
            {uniqueStatuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th 
                  className="text-left p-4 font-medium text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => handleSort("name")}
                >
                  <div className="flex items-center gap-2">
                    Campaign Name
                    {getSortIcon("name")}
                  </div>
                </th>
                <th 
                  className="text-left p-4 font-medium text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => handleSort("status")}
                >
                  <div className="flex items-center gap-2">
                    Status
                    {getSortIcon("status")}
                  </div>
                </th>
                <th 
                  className="text-left p-4 font-medium text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => handleSort("budget")}
                >
                  <div className="flex items-center gap-2">
                    Budget
                    {getSortIcon("budget")}
                  </div>
                </th>
                <th 
                  className="text-left p-4 font-medium text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => handleSort("spent")}
                >
                  <div className="flex items-center gap-2">
                    Spent
                    {getSortIcon("spent")}
                  </div>
                </th>
                <th 
                  className="text-left p-4 font-medium text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => handleSort("conversions")}
                >
                  <div className="flex items-center gap-2">
                    Conversions
                    {getSortIcon("conversions")}
                  </div>
                </th>
                <th 
                  className="text-left p-4 font-medium text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => handleSort("ctr")}
                >
                  <div className="flex items-center gap-2">
                    CTR
                    {getSortIcon("ctr")}
                  </div>
                </th>
                <th 
                  className="text-left p-4 font-medium text-sm cursor-pointer hover:bg-muted/80 transition-colors"
                  onClick={() => handleSort("roas")}
                >
                  <div className="flex items-center gap-2">
                    ROAS
                    {getSortIcon("roas")}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((campaign, index) => (
                <tr 
                  key={campaign.id} 
                  className="border-t hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4">
                    <div className="font-medium text-foreground">{campaign.name}</div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[campaign.status]}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="p-4 text-foreground">
                    ${campaign.budget.toLocaleString()}
                  </td>
                  <td className="p-4 text-foreground">
                    ${campaign.spent.toLocaleString()}
                  </td>
                  <td className="p-4 text-foreground">
                    {campaign.conversions}
                  </td>
                  <td className="p-4 text-foreground">
                    {campaign.ctr}%
                  </td>
                  <td className="p-4 text-foreground">
                    {campaign.roas}x
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t bg-muted/20">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} results
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8"
                >
                  {page}
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
