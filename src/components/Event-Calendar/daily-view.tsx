import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Event } from "@/types/Types";
import { EventItem } from "./event-item";
import { formatDate } from "@/lib/helper";
import { cn } from "@/lib/utils";

interface DailyViewProps {
  events: Event[];
  onEventClick: (event: Event) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

export function DailyView({
  events,
  onEventClick,
  currentDate,
  setCurrentDate,
}: DailyViewProps) {
  const [dayEvents, setDayEvents] = useState<Event[]>([]);

  useEffect(() => {
    const filteredEvents = getEventsForDay(currentDate);
    setDayEvents(filteredEvents);
  }, [currentDate, events]);

  const getEventsForDay = (date: Date) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const prevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const nextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const isToday =
    currentDate.getDate() === new Date().getDate() &&
    currentDate.getMonth() === new Date().getMonth() &&
    currentDate.getFullYear() === new Date().getFullYear();

  // Create time slots for the day
  const timeSlots = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="border rounded-xl shadow-md bg-white overflow-hidden">
      <div className="p-4 flex items-center justify-between border-b bg-gradient-to-r from-white to-blue-50">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold flex items-center">
            {formatDate(currentDate.toISOString())}
            {isToday && (
              <Badge className="ml-2 bg-blue-500 hover:bg-blue-600">
                Today
              </Badge>
            )}
          </h2>
          <p className="text-sm text-muted-foreground">
            {dayEvents.length} {dayEvents.length === 1 ? "event" : "events"}{" "}
            scheduled
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className={cn(
              "border-blue-200 hover:bg-blue-50 hover:text-blue-700",
              isToday && "bg-blue-100 text-blue-700 border-blue-300"
            )}
          >
            Today
          </Button>
          <div className="flex rounded-md border border-input overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevDay}
              className="rounded-none border-r h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextDay}
              className="rounded-none h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] divide-x">
        {/* All day events section */}
        <div className="p-4 bg-white">
          <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center">
            <Clock className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
            All Events
          </h3>

          {dayEvents.length > 0 ? (
            <div className="space-y-2">
              {dayEvents.map((event) => (
                <div key={event.id} className="mb-2">
                  <EventItem
                    event={event}
                    onClick={() => onEventClick(event)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-muted-foreground bg-muted/20 rounded-lg border border-dashed">
              No events scheduled for this day
            </div>
          )}
        </div>

        {/* Time slots section */}
        <div className="overflow-y-auto max-h-[600px] bg-white relative">
          <div className="sticky top-0 z-10 text-sm font-medium text-muted-foreground p-4 border-b bg-white shadow-sm">
            Daily Schedule
          </div>
          <div className="divide-y">
            {timeSlots.map((hour) => {
              const hourEvents = dayEvents.filter((event) => {
                if (!event.time) return false;
                const [eventHour] = event.time.split(":").map(Number);
                return eventHour === hour;
              });

              const isCurrentHour = new Date().getHours() === hour && isToday;

              return (
                <div
                  key={hour}
                  className={cn(
                    "flex hover:bg-muted/10 transition-colors",
                    isCurrentHour && "bg-blue-50"
                  )}
                >
                  <div
                    className={cn(
                      "w-20 text-sm font-medium py-3 px-4 text-right border-r sticky left-0 bg-white",
                      isCurrentHour && "text-blue-700 bg-blue-50"
                    )}
                  >
                    {hour === 0
                      ? "12 AM"
                      : hour < 12
                      ? `${hour} AM`
                      : hour === 12
                      ? "12 PM"
                      : `${hour - 12} PM`}
                  </div>
                  <div className="flex-1 min-h-[60px] p-2">
                    {hourEvents.map((event) => (
                      <div key={event.id} className="mb-1">
                        <EventItem
                          event={event}
                          onClick={() => onEventClick(event)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
