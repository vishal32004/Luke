import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CalendarIcon, Clock, CalendarDaysIcon as Week } from "lucide-react"

export type CalendarView = "daily" | "weekly" | "monthly"

interface ViewSelectorProps {
  currentView: CalendarView
  onViewChange: (view: CalendarView) => void
}

export function ViewSelector({ currentView, onViewChange }: ViewSelectorProps) {
  return (
    <div className="flex space-x-1 bg-muted/80 p-1 rounded-lg shadow-sm">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewChange("daily")}
        className={cn(
          "rounded-md transition-all flex items-center gap-1.5",
          currentView === "daily"
            ? "bg-white text-primary shadow-sm font-medium"
            : "hover:bg-white/50 text-muted-foreground",
        )}
      >
        <Clock className="h-3.5 w-3.5" />
        Day
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewChange("weekly")}
        className={cn(
          "rounded-md transition-all flex items-center gap-1.5",
          currentView === "weekly"
            ? "bg-white text-primary shadow-sm font-medium"
            : "hover:bg-white/50 text-muted-foreground",
        )}
      >
        <Week className="h-3.5 w-3.5" />
        Week
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onViewChange("monthly")}
        className={cn(
          "rounded-md transition-all flex items-center gap-1.5",
          currentView === "monthly"
            ? "bg-white text-primary shadow-sm font-medium"
            : "hover:bg-white/50 text-muted-foreground",
        )}
      >
        <CalendarIcon className="h-3.5 w-3.5" />
        Month
      </Button>
    </div>
  )
}
