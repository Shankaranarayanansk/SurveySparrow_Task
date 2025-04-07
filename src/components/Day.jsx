import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import GlobalContext from "../context/GlobalContext";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) =>
        dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  const isCurrentDay = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
  const isWeekend = day.day() === 0 || day.day() === 6;

  // Get color variant based on label
  const getEventColorClass = (label) => {
    const colorMap = {
      blue: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      green: "bg-green-100 text-green-800 hover:bg-green-200",
      red: "bg-red-100 text-red-800 hover:bg-red-200",
      purple: "bg-purple-100 text-purple-800 hover:bg-purple-200",
      yellow: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      indigo: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
      pink: "bg-pink-100 text-pink-800 hover:bg-pink-200",
      gray: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    };
    
    return colorMap[label] || "bg-gray-100 text-gray-800 hover:bg-gray-200";
  };

  return (
    <div className={cn(
      "border border-gray-200 flex flex-col min-h-28",
      isWeekend && "bg-gray-50/50"
    )}>
      <header className="flex flex-col items-center p-1">
        {rowIdx === 0 && (
          <p className="text-xs font-medium text-gray-500 mb-1">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={cn(
            "text-sm h-7 w-7 flex items-center justify-center rounded-full transition-colors",
            isCurrentDay && "bg-primary text-primary-foreground font-medium",
            !isCurrentDay && "hover:bg-gray-100"
          )}
        >
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer p-1 overflow-y-auto max-h-32"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setDaySelected(day);
            setShowEventModal(true);
          }
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedEvent(evt);
              setShowEventModal(true);
            }}
            className={cn(
              "p-1 mb-1 text-xs rounded truncate transition-colors",
              getEventColorClass(evt.label)
            )}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}