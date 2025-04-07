// src/context/GlobalContext.js

import { createContext } from "react";

const GlobalContext = createContext({
  monthIndex: 0,
  setMonthIndex: () => {},
  smallCalendarMonth: null,
  setSmallCalendarMonth: () => {},
  daySelected: null,
  setDaySelected: () => {},
  showEventModal: false,
  setShowEventModal: () => {},
  dispatchCalEvent: () => {},
  selectedEvent: null,
  setSelectedEvent: () => {},
  savedEvents: [],
  setLabels: () => {},
  labels: [],
  updateLabel: () => {},
  filteredEvents: [],
});

export default GlobalContext;
