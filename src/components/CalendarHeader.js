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
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-4 py-4 bg-white dark:bg-gray-900 shadow-md rounded-xl">
      <div className="flex items-center gap-3">
        <img src={logo} alt="calendar" className="w-10 h-10" />
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Calendar
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Today
        </button>

        <button
          onClick={handlePrevYear}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <span className="material-icons-outlined text-gray-600 dark:text-gray-300">
            keyboard_double_arrow_left
          </span>
        </button>

        <button
          onClick={handlePrevMonth}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <span className="material-icons-outlined text-gray-600 dark:text-gray-300">
            chevron_left
          </span>
        </button>

        <span className="text-lg font-medium text-gray-700 dark:text-gray-200 px-2">
          {dayjs(new Date(currentYear, monthIndex)).format("MMMM YYYY")}
        </span>

        <button
          onClick={handleNextMonth}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <span className="material-icons-outlined text-gray-600 dark:text-gray-300">
            chevron_right
          </span>
        </button>

        <button
          onClick={handleNextYear}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <span className="material-icons-outlined text-gray-600 dark:text-gray-300">
            keyboard_double_arrow_right
          </span>
        </button>
      </div>
    </header>
  );
}
