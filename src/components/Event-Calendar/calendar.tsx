import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Event } from "@/types/Types";
import { EventItem } from "./event-item";

interface CalendarProps {
  events: Event[];
  onEventClick: (event: Event) => void;
  currentMonth: Date;
  setCurrentMonth: (date: Date) => void;
}

export function Calendar({
  events,
  onEventClick,
  currentMonth,
  setCurrentMonth,
}: CalendarProps) {
  const [calendarDays, setCalendarDays] = useState<Array<Date | null>>([]);

  useEffect(() => {
    const days = generateCalendarDays(currentMonth);
    setCalendarDays(days);
  }, [currentMonth]);

  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    // Create array for all days in the month plus empty spots for previous month
    const days: Array<Date | null> = [];

    // Add empty spots for days from previous month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days in current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    // Fill remaining spots to complete the grid (6 rows x 7 days)
    const remainingDays = 42 - days.length;
    for (let i = 0; i < remainingDays; i++) {
      days.push(null);
    }

    return days;
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const getEventsForDay = (date: Date) => {
    if (!date) return [];

    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

  // Check if current month is being displayed
  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === currentMonth.getMonth() &&
    today.getFullYear() === currentMonth.getFullYear();

  return (
    <div className="border rounded-xl shadow-md bg-white overflow-hidden">
      <div className="p-4 flex items-center justify-between border-b bg-gradient-to-r from-white to-blue-50">
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold flex items-center">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            {isCurrentMonth && (
              <Badge className="ml-2 bg-blue-500 hover:bg-blue-600">
                Current Month
              </Badge>
            )}
          </h2>
          <p className="text-sm text-muted-foreground">
            {new Date(
              currentMonth.getFullYear(),
              currentMonth.getMonth() + 1,
              0
            ).getDate()}{" "}
            days
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className={cn(
              "border-blue-200 hover:bg-blue-50 hover:text-blue-700",
              isCurrentMonth && "bg-blue-100 text-blue-700 border-blue-300"
            )}
          >
            Today
          </Button>
          <div className="flex rounded-md border border-input overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={prevMonth}
              className="rounded-none border-r h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextMonth}
              className="rounded-none h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b bg-muted/10">
        {dayNames.map((day, index) => (
          <div
            key={index}
            className="py-2 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 grid-rows-6">
        {calendarDays.map((day, index) => {
          const dayEvents = day ? getEventsForDay(day) : [];
          const isToday =
            day &&
            day.getDate() === today.getDate() &&
            day.getMonth() === today.getMonth() &&
            day.getFullYear() === today.getFullYear();

          const isCurrentMonth =
            day && day.getMonth() === currentMonth.getMonth();
          const isWeekend = day && (day.getDay() === 0 || day.getDay() === 6);

          return (
            <div
              key={index}
              className={cn(
                "min-h-[100px] p-2 border border-border/30",
                !isCurrentMonth && "bg-muted/20 opacity-60",
                isCurrentMonth && isWeekend && "bg-muted/10",
                isToday && "bg-blue-50 border-blue-200"
              )}
            >
              {day && (
                <>
                  <div
                    className={cn(
                      "flex justify-center items-center w-7 h-7 rounded-full mb-1 mx-auto",
                      isToday
                        ? "bg-blue-500 text-white font-bold"
                        : "text-sm font-medium"
                    )}
                  >
                    {day.getDate()}
                  </div>
                  <div className="space-y-1 max-h-[80px] overflow-y-auto">
                    {dayEvents.map((event) => (
                      <EventItem
                        key={event.id}
                        event={event}
                        onClick={() => onEventClick(event)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
