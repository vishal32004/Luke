import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Event } from "@/types/Types";
import { EventItem } from "./event-item";

interface WeeklyViewProps {
  events: Event[];
  onEventClick: (event: Event) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

export function WeeklyView({
  events,
  onEventClick,
  currentDate,
  setCurrentDate,
}: WeeklyViewProps) {
  const [weekDays, setWeekDays] = useState<Date[]>([]);

  useEffect(() => {
    const days = generateWeekDays(currentDate);
    setWeekDays(days);
  }, [currentDate]);

  const generateWeekDays = (date: Date) => {
    const days: Date[] = [];
    const currentDay = date.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Calculate the first day of the week (Sunday)
    const firstDayOfWeek = new Date(date);
    firstDayOfWeek.setDate(date.getDate() - currentDay);

    // Generate all 7 days of the week
    for (let i = 0; i < 7; i++) {
      const day = new Date(firstDayOfWeek);
      day.setDate(firstDayOfWeek.getDate() + i);
      days.push(day);
    }

    return days;
  };

  const prevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

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

  // const dayNames = [
  //   "Sunday",
  //   "Monday",
  //   "Tuesday",
  //   "Wednesday",
  //   "Thursday",
  //   "Friday",
  //   "Saturday",
  // ];
  const shortDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get the month and year for the week
  const startMonth = monthNames[weekDays[0]?.getMonth()];
  const endMonth = monthNames[weekDays[6]?.getMonth()];
  const startYear = weekDays[0]?.getFullYear();
  const endYear = weekDays[6]?.getFullYear();

  // Create a proper title that uses both years if they differ
  const weekTitle =
    startMonth === endMonth
      ? `${startMonth} ${startYear}`
      : startYear === endYear
      ? `${startMonth} - ${endMonth} ${startYear}`
      : `${startMonth} ${startYear} - ${endMonth} ${endYear}`;

  // Check if current date is in this week
  const today = new Date();
  const isCurrentWeek = weekDays.some(
    (day) =>
      day.getDate() === today.getDate() &&
      day.getMonth() === today.getMonth() &&
      day.getFullYear() === today.getFullYear()
  );

  return (
    <div className="border rounded-xl shadow-md bg-white overflow-hidden">
      <div className="p-4 flex items-center justify-between border-b bg-gradient-to-r from-white to-blue-50">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold flex items-center">
            {weekTitle}
            {isCurrentWeek && (
              <Badge className="ml-2 bg-blue-500 hover:bg-blue-600">
                Current Week
              </Badge>
            )}
          </h2>
          <p className="text-sm text-muted-foreground">
            {weekDays[0]?.getDate()} - {weekDays[6]?.getDate()}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className={cn(
              "border-blue-200 hover:bg-blue-50 hover:text-blue-700",
              isCurrentWeek && "bg-blue-100 text-blue-700 border-blue-300"
            )}
          >
            Today
          </Button>
          <div className="flex rounded-md border border-input overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevWeek}
              className="rounded-none border-r h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextWeek}
              className="rounded-none h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7">
        {weekDays.map((day, index) => {
          const isToday =
            day.getDate() === new Date().getDate() &&
            day.getMonth() === new Date().getMonth() &&
            day.getFullYear() === new Date().getFullYear();

          return (
            <div
              key={index}
              className={cn(
                "text-center py-3 border-b",
                isToday
                  ? "bg-blue-50"
                  : index % 2 === 0
                  ? "bg-muted/10"
                  : "bg-white"
              )}
            >
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {shortDayNames[index]}
              </div>
              <div
                className={cn(
                  "inline-flex items-center justify-center w-8 h-8 rounded-full mt-1",
                  isToday
                    ? "bg-blue-500 text-white font-bold"
                    : "text-sm font-medium"
                )}
              >
                {day.getDate()}
              </div>
              <div className="text-xs text-muted-foreground">
                {monthNames[day.getMonth()].substring(0, 3)}
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-7 min-h-[500px] divide-x">
        {weekDays.map((day, index) => {
          const dayEvents = getEventsForDay(day);
          const isToday =
            day.getDate() === new Date().getDate() &&
            day.getMonth() === new Date().getMonth() &&
            day.getFullYear() === new Date().getFullYear();

          return (
            <div
              key={index}
              className={cn(
                "p-2 min-h-[100px] max-h-[500px] overflow-y-auto",
                isToday
                  ? "bg-blue-50"
                  : index % 2 === 0
                  ? "bg-muted/5"
                  : "bg-white"
              )}
            >
              <div className="space-y-1.5 pt-1">
                {dayEvents.length > 0 ? (
                  dayEvents.map((event) => (
                    <EventItem
                      key={event.id}
                      event={event}
                      onClick={() => onEventClick(event)}
                    />
                  ))
                ) : (
                  <div className="text-xs text-center text-muted-foreground py-4">
                    No events
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
