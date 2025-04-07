import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
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
      (evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center"
      : "text-gray-700";
  }

  return (
    <div className="border border-gray-200 flex flex-col hover:bg-gray-50 transition duration-200 ease-in-out px-1 py-1 sm:px-2 sm:py-2 rounded-md min-h-[100px]">
      <header className="flex flex-col items-center mb-1">
        {rowIdx === 0 && (
          <p className="text-[10px] sm:text-xs font-medium text-gray-500 mt-1">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p className={`text-xs sm:text-sm ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>

      <div
        className="flex-1 cursor-pointer overflow-hidden"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedEvent(evt);
            }}
            className={`px-1 py-0.5 sm:px-2 sm:py-1 mb-1 rounded-md text-[10px] sm:text-sm text-gray-700 font-medium truncate cursor-pointer transition-all duration-200
            bg-opacity-20 hover:bg-opacity-40 
            ${getEventBgColor(evt.label)}`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}

function getEventBgColor(label) {
  const colorMap = {
    red: "bg-red-400 text-red-800",
    blue: "bg-blue-400 text-blue-800",
    green: "bg-green-400 text-green-800",
    yellow: "bg-yellow-400 text-yellow-800",
    purple: "bg-purple-400 text-purple-800",
    pink: "bg-pink-400 text-pink-800",
  };
  return colorMap[label] || "bg-gray-300 text-gray-800";
}
