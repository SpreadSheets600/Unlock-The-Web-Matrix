import { Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

export function LoadingSpinner({ className, ...props }) {
  return (
    <Loader2 
      className={cn("h-4 w-4 animate-spin", className)} 
      {...props} 
    />
  );
}

export function LoadingPage() {
  return (
    <div className="flex items-center justify-center min-h-[500px] animate-fade-in">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center shadow-lg">
          <LoadingSpinner className="h-8 w-8 text-primary" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Loading amazing content...</h3>
          <p className="text-muted-foreground">Please wait while we fetch the latest posts</p>
        </div>
      </div>
    </div>
  );
}
