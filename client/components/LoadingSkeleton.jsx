export function MetricsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-card rounded-xl border p-6 animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="h-4 bg-muted rounded w-24 mb-3"></div>
              <div className="h-8 bg-muted rounded w-20 mb-3"></div>
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-12"></div>
                <div className="h-4 bg-muted rounded w-16"></div>
              </div>
            </div>
            <div className="w-12 h-12 bg-muted rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton({ height = "h-80" }) {
  return (
    <div className={`${height} bg-card rounded-xl border p-6 animate-pulse`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="h-6 bg-muted rounded w-32 mb-2"></div>
          <div className="h-4 bg-muted rounded w-48"></div>
        </div>
        <div className="h-8 bg-muted rounded w-20"></div>
      </div>
      <div className="h-full bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg relative overflow-hidden">
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="bg-card rounded-xl border p-6 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="h-6 bg-muted rounded w-40 mb-2"></div>
          <div className="h-4 bg-muted rounded w-64"></div>
        </div>
        <div className="h-8 bg-muted rounded w-20"></div>
      </div>
      
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="h-10 bg-muted rounded flex-1 max-w-sm"></div>
          <div className="h-10 bg-muted rounded w-32"></div>
        </div>
        
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="h-5 bg-muted rounded flex-1"></div>
              <div className="h-5 bg-muted rounded w-20"></div>
              <div className="h-5 bg-muted rounded w-24"></div>
              <div className="h-5 bg-muted rounded w-20"></div>
              <div className="h-5 bg-muted rounded w-16"></div>
              <div className="h-5 bg-muted rounded w-12"></div>
              <div className="h-5 bg-muted rounded w-12"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
