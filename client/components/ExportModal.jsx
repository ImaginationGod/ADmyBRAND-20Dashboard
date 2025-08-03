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
  Download,
  FileText,
  Table,
  Calendar,
  CheckCircle2
} from "lucide-react";

export default function ExportModal({ children }) {
  const [exportFormat, setExportFormat] = useState("pdf");
  const [dateRange, setDateRange] = useState("30days");
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsExporting(false);
    setExportComplete(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setExportComplete(false);
    }, 3000);
  };

  const exportFormats = [
    { value: "pdf", label: "PDF Report", icon: FileText },
    { value: "csv", label: "CSV Data", icon: Table },
    { value: "excel", label: "Excel Workbook", icon: Table },
  ];

  const dateRanges = [
    { value: "7days", label: "Last 7 days" },
    { value: "30days", label: "Last 30 days" },
    { value: "3months", label: "Last 3 months" },
    { value: "6months", label: "Last 6 months" },
    { value: "1year", label: "Last year" },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5" />
            Export Analytics Data
          </DialogTitle>
          <DialogDescription>
            Choose your export format and date range to download analytics data.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Export Format */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Export Format</label>
            <Select value={exportFormat} onValueChange={setExportFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {exportFormats.map(format => {
                  const Icon = format.icon;
                  return (
                    <SelectItem key={format.value} value={format.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {format.label}
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Date Range</label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {dateRanges.map(range => (
                  <SelectItem key={range.value} value={range.value}>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {range.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Export Button */}
          <Button 
            onClick={handleExport} 
            disabled={isExporting || exportComplete}
            className="w-full"
          >
            {isExporting ? (
              <>
                <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Exporting...
              </>
            ) : exportComplete ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Export Complete!
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </>
            )}
          </Button>

          {exportComplete && (
            <div className="text-center p-4 bg-success/10 rounded-lg">
              <p className="text-sm text-success">
                Your analytics data has been exported successfully!
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
