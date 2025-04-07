import React from "react";
import CreateEventButton from "./CreateEventButton";
import SmallCalendar from "./SmallCalendar";
import Labels from "./Labels";

export default function Sidebar() {
  return (
    <aside className="w-full sm:w-64 bg-white border-r p-4 sm:p-5 shadow-sm sm:shadow-md rounded-none sm:rounded-xl flex flex-col gap-6 sm:gap-8 transition-all duration-300">
      <CreateEventButton />
      <div className="hidden sm:block">
        <SmallCalendar />
      </div>
      <div className="hidden sm:block">
        <Labels />
      </div>
    </aside>
  );
}
