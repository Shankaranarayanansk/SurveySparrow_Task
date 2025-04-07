import React, { useContext } from "react";
import plusImg from "../assets/plus.svg";
import GlobalContext from "../context/GlobalContext";

export default function CreateEventButton() {
  const { setShowEventModal } = useContext(GlobalContext);

  return (
    <button
      onClick={() => setShowEventModal(true)}
      className="flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 bg-blue-600 text-white rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-200 ease-in-out text-sm sm:text-base"
    >
      <img src={plusImg} alt="create_event" className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="font-medium">Create Event</span>
    </button>
  );
}
