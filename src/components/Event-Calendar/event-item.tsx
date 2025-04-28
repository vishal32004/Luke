import {
  Cake,
  Plane,
  Calendar,
  Briefcase,
  PartyPopper,
  Utensils,
  Landmark,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Event, EventType } from "@/types/Types";

interface EventItemProps {
  event: Event;
  onClick: () => void;
}

export function EventItem({ event, onClick }: EventItemProps) {
  const getEventIcon = (type: EventType) => {
    switch (type) {
      case "birthday":
        return <Cake className="h-3 w-3" />;
      case "trip":
        return <Plane className="h-3 w-3" />;
      case "meeting":
        return <Briefcase className="h-3 w-3" />;
      case "party":
        return <PartyPopper className="h-3 w-3" />;
      case "dinner":
        return <Utensils className="h-3 w-3" />;
      case "holiday":
        return <Landmark className="h-3 w-3" />;
      default:
        return <Calendar className="h-3 w-3" />;
    }
  };

  const getEventColor = (type: EventType) => {
    switch (type) {
      case "birthday":
        return "bg-gradient-to-r from-pink-100 to-pink-50 text-pink-800 border-pink-200 hover:from-pink-200 hover:to-pink-100";
      case "trip":
        return "bg-gradient-to-r from-purple-100 to-purple-50 text-purple-800 border-purple-200 hover:from-purple-200 hover:to-purple-100";
      case "meeting":
        return "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 border-blue-200 hover:from-blue-200 hover:to-blue-100";
      case "party":
        return "bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 border-yellow-200 hover:from-yellow-200 hover:to-yellow-100";
      case "dinner":
        return "bg-gradient-to-r from-orange-100 to-orange-50 text-orange-800 border-orange-200 hover:from-orange-200 hover:to-orange-100";
      case "holiday":
        return "bg-gradient-to-r from-green-100 to-green-50 text-green-800 border-green-200 hover:from-green-200 hover:to-green-100";
      default:
        return "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800 border-gray-200 hover:from-gray-200 hover:to-gray-100";
    }
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-2 py-1 rounded-md border text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm",
        getEventColor(event.type)
      )}
    >
      {getEventIcon(event.type)}
      <span className="truncate">{event.title}</span>
      {event.time && (
        <span className="ml-auto flex items-center text-[10px] opacity-80 whitespace-nowrap">
          <Clock className="h-2.5 w-2.5 mr-0.5" />
          {event.time}
        </span>
      )}
    </button>
  );
}
