import React, { useState, useEffect, useContext } from "react";
import dayjs from "dayjs";
import GlobalContext from "../context/GlobalContext";
import { getMonth } from "../util";

export default function SmallCalendar() {
  const monthOptions = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from({ length: 20 }, (_, i) => dayjs().year() - 10 + i);

  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentYear, setCurrentYear] = useState(dayjs().year());
  const [currentMonth, setCurrentMonth] = useState(
    getMonth(currentMonthIdx, currentYear)
  );

  const { setSmallCalendarMonth, setDaySelected, daySelected } =
    useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx, currentYear));
  }, [currentMonthIdx, currentYear]);

  const getDayClass = (day) => {
    const format = "DD-MM-YY";
    const now = dayjs().format(format);
    const curr = day.format(format);
    const selected = daySelected && daySelected.format(format);

    if (curr === now) return "bg-blue-600 text-white font-semibold";
    if (curr === selected) return "bg-blue-100 text-blue-700 font-semibold";
    return "text-gray-800 dark:text-gray-200";
  };

  return (
    <div className="mt-4 text-sm w-full">
      <header className="flex justify-between items-center mb-4 space-x-2">
        <select
          value={currentMonthIdx}
          onChange={(e) => setCurrentMonthIdx(Number(e.target.value))}
          className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {monthOptions.map((month, idx) => (
            <option key={idx} value={idx}>
              {month}
            </option>
          ))}
        </select>

        <select
          value={currentYear}
          onChange={(e) => setCurrentYear(Number(e.target.value))}
          className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </header>

      <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
        {currentMonth[0].map((day, i) => (
          <div key={i}>{day.format("dd").charAt(0)}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <div key={idx}>
                <button
                  onClick={() => {
                    setSmallCalendarMonth(currentMonthIdx);
                    setDaySelected(day);
                  }}
                  className={`h-8 w-8 mx-auto rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center ${getDayClass(
                    day
                  )}`}
                >
                  {day.format("D")}
                </button>
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
