import React, { useContext } from "react";
import dayjs from "dayjs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdToday } from "react-icons/md";
import GlobalContext from "../context/GlobalContext";
import logo from "../assets/logo.png";

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };

  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  const handleReset = () => {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  };

  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-4 py-4 bg-white shadow-md rounded-xl">
      <div className="flex items-center gap-3">
        <img src={logo} alt="calendar" className="w-10 h-10" />
        <h1 className="text-2xl font-semibold text-gray-800">Calendar</h1>
      </div>

      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <MdToday className="text-lg" />
          Today
        </button>

        <button
          onClick={handlePrevMonth}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <FaChevronLeft className="text-gray-600" />
        </button>

        <button
          onClick={handleNextMonth}
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <FaChevronRight className="text-gray-600" />
        </button>

        <h2 className="text-xl font-medium text-gray-700">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
      </div>
    </header>
  );
}
