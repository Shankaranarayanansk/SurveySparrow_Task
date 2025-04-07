import React from "react";
import Day from "./Day";
import dayjs from "dayjs";

export default function Month({ month }) {
  const currentWeek = dayjs().week();

  return (
    <div className="flex-1 grid grid-cols-7 sm:grid-rows-5 grid-rows-6 gap-[1px] bg-gray-200 overflow-hidden">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => {
            const isCurrentWeek = day.week() === currentWeek;
            return (
              <div
                key={idx}
                className={`bg-white transition-all duration-200 ${
                  isCurrentWeek ? "ring-1 ring-blue-300" : ""
                } hover:shadow-sm sm:hover:shadow-md`}
              >
                <Day day={day} rowIdx={i} />
              </div>
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
}
