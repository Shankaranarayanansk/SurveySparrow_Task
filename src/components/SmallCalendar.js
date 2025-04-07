import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";
import { getMonth } from "../util";

export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const [currentMonth, setCurrentMonth] = useState(getMonth(currentMonthIdx, currentYear));

  const {
    monthIndex,
    setSmallCalendarMonth,
    setDaySelected,
    daySelected,
  } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx, currentYear));
  }, [currentMonthIdx, currentYear]);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function handlePrevMonth() {
    if (currentMonthIdx === 0) {
      setCurrentMonthIdx(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonthIdx(currentMonthIdx - 1);
    }
  }

  function handleNextMonth() {
    if (currentMonthIdx === 11) {
      setCurrentMonthIdx(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonthIdx(currentMonthIdx + 1);
    }
  }

  function handlePrevYear() {
    setCurrentYear(currentYear - 1);
  }

  function handleNextYear() {
    setCurrentYear(currentYear + 1);
  }

  function getDayClass(day) {
    const format = "DD-MM-YY";
    const now = dayjs().format(format);
    const curr = day.format(format);
    const selected = daySelected && daySelected.format(format);

    if (curr === now) return "bg-blue-600 text-white font-semibold rounded-full";
    if (curr === selected) return "bg-blue-100 text-blue-700 font-semibold rounded-full";
    return "";
  }

  return (
    <div className="mt-10 text-sm">
      <header className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-1">
          <button onClick={handlePrevYear} className="text-gray-500 hover:text-gray-700 transition">
            <span className="material-icons text-base">keyboard_double_arrow_left</span>
          </button>
          <button onClick={handlePrevMonth} className="text-gray-500 hover:text-gray-700 transition">
            <span className="material-icons text-base">chevron_left</span>
          </button>
        </div>
        <p className="text-gray-800 font-semibold text-base">
          {dayjs(new Date(currentYear, currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <div className="flex items-center gap-1">
          <button onClick={handleNextMonth} className="text-gray-500 hover:text-gray-700 transition">
            <span className="material-icons text-base">chevron_right</span>
          </button>
          <button onClick={handleNextYear} className="text-gray-500 hover:text-gray-700 transition">
            <span className="material-icons text-base">keyboard_double_arrow_right</span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-7 text-center font-medium text-gray-500 mb-2">
        {currentMonth[0].map((day, i) => (
          <div key={i}>{day.format("dd").charAt(0)}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center gap-y-1">
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIdx);
                  setDaySelected(day);
                }}
                className={`py-1 w-full transition-all duration-150 ease-in-out hover:bg-gray-200 rounded-full ${getDayClass(day)}`}
              >
                {day.format("D")}
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
