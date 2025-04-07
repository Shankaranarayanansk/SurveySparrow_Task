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
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-6 py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg rounded-xl">
      <div className="flex items-center gap-3">
        <img src={logo} alt="calendar" className="w-10 h-10" />
        <h1 className="text-3xl font-bold text-white tracking-wide">Calendar</h1>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleReset}
          className="px-5 py-2 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-indigo-100 transition"
        >
          Today
        </button>

        <button
          onClick={handlePrevYear}
          className="p-2 rounded-lg text-white hover:bg-white/20 transition"
        >
          <span className="material-icons-outlined">keyboard_double_arrow_left</span>
        </button>

        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-lg text-white hover:bg-white/20 transition"
        >
          <span className="material-icons-outlined">chevron_left</span>
        </button>

        <span className="text-lg font-medium text-white px-2 bg-white/10 rounded-lg px-4 py-1">
          {dayjs(new Date(currentYear, monthIndex)).format("MMMM YYYY")}
        </span>

        <button
          onClick={handleNextMonth}
          className="p-2 rounded-lg text-white hover:bg-white/20 transition"
        >
          <span className="material-icons-outlined">chevron_right</span>
        </button>

        <button
          onClick={handleNextYear}
          className="p-2 rounded-lg text-white hover:bg-white/20 transition"
        >
          <span className="material-icons-outlined">keyboard_double_arrow_right</span>
        </button>
      </div>
    </header>
  );
}
