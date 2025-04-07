import React, { useContext, useState } from "react";
import { MdClose, MdDelete, MdDragHandle, MdSchedule, MdSegment, MdBookmarkBorder, MdCheck } from "react-icons/md";
import GlobalContext from "../context/GlobalContext";
import Swal from "sweetalert2"; // Import SweetAlert

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
      // Show update confirmation
      Swal.fire({
        icon: 'success',
        title: 'Event Updated',
        text: `"${title}" has been updated successfully!`,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
      // Show creation confirmation
      Swal.fire({
        icon: 'success',
        title: 'Event Created',
        text: `"${title}" has been added to your calendar!`,
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false
      });
    }
    
    setShowEventModal(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 px-2 sm:px-4">
      <form className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg overflow-hidden">
        <header className="bg-gradient-to-r from-indigo-500 to-blue-500 px-4 sm:px-5 py-3 flex justify-between items-center">
          <MdDragHandle className="text-white text-lg sm:text-xl" />
          <div className="flex gap-3 sm:gap-4 items-center">
            {selectedEvent && (
              <MdDelete
                onClick={() => {
                  dispatchCalEvent({ type: "delete", payload: selectedEvent });
                  setShowEventModal(false);
                  // Show delete confirmation
                  Swal.fire({
                    icon: 'info',
                    title: 'Event Deleted',
                    text: 'The event has been removed from your calendar',
                    timer: 2000,
                    timerProgressBar: true,
                    showConfirmButton: false
                  });
                }}
                className="text-red-200 hover:text-white cursor-pointer text-lg transition"
              />
            )}
            <button type="button" onClick={() => setShowEventModal(false)}>
              <MdClose className="text-white hover:text-gray-200 transition text-lg" />
            </button>
          </div>
        </header>

        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
          <input
            type="text"
            name="title"
            placeholder="Add title"
            value={title}
            required
            className="w-full text-lg sm:text-xl font-semibold text-gray-800 border-b-2 border-gray-200 focus:outline-none focus:border-indigo-500 placeholder-gray-400 pb-1 sm:pb-2"
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex items-center gap-2 sm:gap-3 text-gray-600">
            <MdSchedule className="text-base sm:text-lg" />
            <p className="text-xs sm:text-sm">{daySelected.format("dddd, MMMM DD")}</p>
          </div>

          <div className="flex items-start gap-2 sm:gap-3">
            <MdSegment className="text-gray-400 pt-1 sm:pt-2 text-base" />
            <textarea
              name="description"
              rows="3"
              placeholder="Add a description"
              value={description}
              required
              className="w-full border-b-2 border-gray-200 focus:outline-none focus:border-indigo-500 text-gray-700 placeholder-gray-400 text-sm sm:text-base resize-none"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <MdBookmarkBorder className="text-gray-500 text-base" />
            <div className="flex gap-2 sm:gap-3">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-${lblClass}-500 cursor-pointer flex items-center justify-center hover:ring-2 hover:ring-offset-1 hover:ring-${lblClass}-300 transition`}
                >
                  {selectedLabel === lblClass && (
                    <MdCheck className="text-white text-xs sm:text-sm" />
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>

        <footer className="flex justify-end border-t p-3 sm:p-4 bg-gray-50">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 sm:px-6 py-2 rounded-full font-medium transition text-sm sm:text-base"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}