import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <div className="h-screen flex flex-col dark:bg-gray-900">
      {showEventModal && <EventModal />}
      <CalendarHeader />
      <div className="flex flex-1 flex-col md:flex-row overflow-auto">
        <Sidebar />
        <Month month={currentMonth} />
      </div>
    </div>
  );
}

export default App;