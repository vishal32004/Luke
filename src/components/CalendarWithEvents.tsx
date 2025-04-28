import { useState } from "react";
import { Calendar } from "@/components/Event-Calendar/calendar";
import { DailyView } from "@/components/Event-Calendar/daily-view";
import { WeeklyView } from "@/components/Event-Calendar/weekly-view";
import { EventModal } from "@/components/Event-Calendar/event-modal";
import {
  ViewSelector,
  type CalendarView,
} from "@/components/Event-Calendar/view-selector";
import type { Event } from "@/types/Types";

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Sarah's Birthday",
    date: "2025-04-15",
    type: "birthday",
    description: "Sarah's 30th birthday celebration",
    location: "Hometown Bakery",
  },
  {
    id: "2",
    title: "Team Meeting",
    date: "2025-04-16",
    time: "10:00",
    type: "meeting",
    description: "Weekly team sync meeting",
    location: "Conference Room A",
  },
  {
    id: "3",
    title: "Beach Trip",
    date: "2025-04-20",
    type: "trip",
    description: "Weekend getaway to the beach",
    location: "Sunny Beach Resort",
  },
  {
    id: "4",
    title: "Dinner with Friends",
    date: "2025-04-18",
    time: "19:00",
    type: "dinner",
    description: "Catching up with old friends",
    location: "Italian Restaurant",
  },
  {
    id: "5",
    title: "Project Deadline",
    date: "2025-04-30",
    type: "meeting",
    description: "Final submission for the Q2 project",
  },
  {
    id: "6",
    title: "Summer Party",
    date: "2025-04-25",
    time: "18:00",
    type: "party",
    description: "Annual summer kickoff party",
    location: "Rooftop Garden",
  },
  {
    id: "7",
    title: "Doctor Appointment",
    date: "2025-04-22",
    time: "14:30",
    type: "other",
    description: "Annual checkup",
    location: "Medical Center",
  },
  {
    id: "8",
    title: "Flight to Paris",
    date: "2025-05-01",
    time: "08:45",
    type: "trip",
    description: "Vacation in Paris",
    location: "International Airport",
  },
  {
    id: "9",
    title: "Mom's Birthday",
    date: "2025-05-05",
    type: "birthday",
    description: "Don't forget to buy a gift!",
  },
  {
    id: "10",
    title: "Memorial Day",
    date: "2025-05-26",
    type: "holiday",
    description: "National holiday",
  },
  {
    id: "11",
    title: "Conference",
    date: "2025-05-15",
    type: "meeting",
    description: "Annual industry conference",
    location: "Convention Center",
  },
  {
    id: "12",
    title: "Anniversary Dinner",
    date: "2025-05-20",
    time: "19:30",
    type: "dinner",
    description: "5 year anniversary celebration",
    location: "Fancy Restaurant",
  },
];

export default function CalendarPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<CalendarView>("monthly");

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div className="container mx-auto py-10 px-4 bg-gradient-to-b from-white to-blue-50/30 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Event Calendar
        </h1>
        <ViewSelector currentView={currentView} onViewChange={setCurrentView} />
      </div>

      {currentView === "monthly" && (
        <Calendar
          events={sampleEvents}
          onEventClick={handleEventClick}
          currentMonth={currentDate}
          setCurrentMonth={setCurrentDate}
        />
      )}

      {currentView === "weekly" && (
        <WeeklyView
          events={sampleEvents}
          onEventClick={handleEventClick}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
      )}

      {currentView === "daily" && (
        <DailyView
          events={sampleEvents}
          onEventClick={handleEventClick}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
      )}

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
