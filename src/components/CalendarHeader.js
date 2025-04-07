import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import GlobalContext from "../context/GlobalContext";

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const [currentYear, setCurrentYear] = useState(dayjs().year());

  function handlePrevMonth() {
    if (monthIndex === 0) {
      setMonthIndex(11);
      setCurrentYear(currentYear - 1);
    } else {
      setMonthIndex(monthIndex - 1);
    }
  }

  function handleNextMonth() {
    if (monthIndex === 11) {
      setMonthIndex(0);
      setCurrentYear(currentYear + 1);
    } else {
      setMonthIndex(monthIndex + 1);
    }
  }

  function handlePrevYear() {
    setCurrentYear(currentYear - 1);
  }

  function handleNextYear() {
    setCurrentYear(currentYear + 1);
  }

  function handleReset() {
    const currentMonth = dayjs().month();
    setMonthIndex(currentMonth);
    setCurrentYear(dayjs().year());
  }

  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-6 py-4 bg-black text-white shadow-lg font-poppins">
      <div className="flex items-center gap-3">
        <img src={logo} alt="calendar" className="w-10 h-10" />
        <h1 className="text-2xl font-bold tracking-wide">SurveySparrow Calendar</h1>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleReset}
          className="px-5 py-2 bg-white text-black font-semibold shadow hover:bg-gray-200 transition"
        >
          Today
        </button>

        <button
          onClick={handlePrevYear}
          className="p-2 hover:bg-white hover:text-black transition"
        >
          <span className="material-icons-outlined">keyboard_double_arrow_left</span>
        </button>

        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-white hover:text-black transition"
        >
          <span className="material-icons-outlined">chevron_left</span>
        </button>

        <span className="text-lg font-medium px-4 py-1 bg-white/10">
          {dayjs(new Date(currentYear, monthIndex)).format("MMMM YYYY")}
        </span>

        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-white hover:text-black transition"
        >
          <span className="material-icons-outlined">chevron_right</span>
        </button>

        <button
          onClick={handleNextYear}
          className="p-2 hover:bg-white hover:text-black transition"
        >
          <span className="material-icons-outlined">keyboard_double_arrow_right</span>
        </button>
      </div>
    </header>
  );
}
