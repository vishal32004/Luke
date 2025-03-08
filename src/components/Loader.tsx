import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Main spinner with gradient border */}
        <div className="relative">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-purple-500 to-primary animate-[spin_3s_linear_infinite]" />
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-background">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
          </div>
        </div>

        {/* Pulsing text */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-medium animate-pulse">
            Loading amazing content
          </h2>
          <p className="text-muted-foreground text-sm">
            Please wait a moment...
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1.5 bg-muted rounded-full overflow-hidden mt-2">
          <div className="h-full bg-primary rounded-full animate-[loading_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
