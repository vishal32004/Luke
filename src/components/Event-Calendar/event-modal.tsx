import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Cake,
  Plane,
  Calendar,
  Briefcase,
  PartyPopper,
  Utensils,
  Landmark,
  Clock,
  MapPin,
} from "lucide-react";
import type { Event, EventType } from "@/types/Types";
import { formatDate, formatTime } from "@/lib/helper";

interface EventModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

export function EventModal({ event, isOpen, onClose }: EventModalProps) {
  const getEventIcon = (type: EventType) => {
    switch (type) {
      case "birthday":
        return <Cake className="h-5 w-5" />;
      case "trip":
        return <Plane className="h-5 w-5" />;
      case "meeting":
        return <Briefcase className="h-5 w-5" />;
      case "party":
        return <PartyPopper className="h-5 w-5" />;
      case "dinner":
        return <Utensils className="h-5 w-5" />;
      case "holiday":
        return <Landmark className="h-5 w-5" />;
      default:
        return <Calendar className="h-5 w-5" />;
    }
  };

  const getEventColor = (type: EventType) => {
    switch (type) {
      case "birthday":
        return "bg-pink-100 text-pink-800 border-pink-300";
      case "trip":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "meeting":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "party":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "dinner":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "holiday":
        return "bg-green-100 text-green-800 border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getEventTypeLabel = (type: EventType) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div
              className={`p-3 rounded-full ${getEventColor(
                event.type
              )} shadow-sm`}
            >
              {getEventIcon(event.type)}
            </div>
            <div>
              <span className="text-xs font-medium uppercase text-muted-foreground tracking-wider">
                {getEventTypeLabel(event.type)}
              </span>
              <DialogTitle className="text-xl">{event.title}</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <div className="font-medium">Date</div>
              <div className="text-muted-foreground">
                {formatDate(event.date)}
              </div>
            </div>
          </div>

          {event.time && (
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium">Time</div>
                <div className="text-muted-foreground">
                  {formatTime(event.time)}
                </div>
              </div>
            </div>
          )}

          {event.location && (
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <div className="font-medium">Location</div>
                <div className="text-muted-foreground">{event.location}</div>
              </div>
            </div>
          )}

          {event.description && (
            <div className="pt-2 border-t">
              <div className="font-medium mb-1">Description</div>
              <div className="text-muted-foreground bg-muted/20 p-3 rounded-md">
                {event.description}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="bg-blue-600 hover:bg-blue-700">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
