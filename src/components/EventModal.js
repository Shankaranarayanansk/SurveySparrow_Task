import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";

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
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }
    setShowEventModal(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50 px-2 sm:px-4">
      <form className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg overflow-hidden">
        <header className="bg-gray-100 px-4 sm:px-5 py-3 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400 text-sm sm:text-base">drag_handle</span>
          <div className="flex gap-3 sm:gap-4 items-center">
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({ type: "delete", payload: selectedEvent });
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-red-400 cursor-pointer hover:text-red-600 transition text-base"
              >
                delete
              </span>
            )}
            <button type="button" onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-500 hover:text-gray-700 transition text-base">
                close
              </span>
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
            className="w-full text-lg sm:text-xl font-semibold text-gray-800 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 placeholder-gray-400 pb-1 sm:pb-2"
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex items-center gap-2 sm:gap-3 text-gray-500">
            <span className="material-icons-outlined text-base sm:text-lg">schedule</span>
            <p className="text-xs sm:text-sm">{daySelected.format("dddd, MMMM DD")}</p>
          </div>

          <div className="flex items-start gap-2 sm:gap-3">
            <span className="material-icons-outlined text-gray-400 pt-1 sm:pt-2 text-base">segment</span>
            <textarea
              name="description"
              rows="3"
              placeholder="Add a description"
              value={description}
              required
              className="w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 text-gray-700 placeholder-gray-400 text-sm sm:text-base resize-none"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="material-icons-outlined text-gray-400 text-base">bookmark_border</span>
            <div className="flex gap-2 sm:gap-3">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-${lblClass}-500 cursor-pointer flex items-center justify-center hover:ring-2 hover:ring-offset-1 hover:ring-${lblClass}-300 transition`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-[12px] sm:text-sm">
                      check
                    </span>
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
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 py-2 rounded-full font-medium transition text-sm sm:text-base"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
