import React, { useContext } from "react";
import { FaPlusCircle } from "react-icons/fa";
import GlobalContext from "../context/GlobalContext";

export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);

  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 
                 bg-gradient-to-r from-blue-600 to-indigo-600 text-white 
                 rounded-full shadow-md hover:from-blue-700 hover:to-indigo-700 
                 hover:shadow-lg transition duration-200 ease-in-out 
                 text-sm sm:text-base"
    >
      <FaPlusCircle className="text-white text-lg sm:text-xl" />
      <span className="font-semibold tracking-wide">Create Event</span>
    </button>
  );
}
