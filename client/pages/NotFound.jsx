import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart3 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center mx-auto mb-6">
          <BarChart3 className="w-8 h-8 text-white" />
        </div>
        
        <h1 className="text-6xl font-bold text-brand-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground mb-8">
          The analytics page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/">
          <Button className="bg-brand-500 hover:bg-brand-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
