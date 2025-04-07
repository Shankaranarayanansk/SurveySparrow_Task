import React from "react";
import { cn } from "@/lib/utils";
import Day from "./Day";

export default function Month({ month }) {
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5 border border-gray-200 rounded-lg overflow-hidden shadow-sm bg-white">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day 
              day={day} 
              key={idx} 
              rowIdx={i} 
              className={cn(
                idx === 0 && "border-l-0",
                i === 0 && "border-t-0"
              )}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}