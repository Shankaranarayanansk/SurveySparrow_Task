import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import GlobalContext from "../context/GlobalContext";
import { getMonth } from "../util";

export default function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(
    dayjs().month()
  );
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);
  
  const {
    monthIndex,
    setSmallCalendarMonth,
    setDaySelected,
    daySelected,
  } = useContext(GlobalContext);
  
  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);
  
  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }
  
  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }
  
  function getDayClass(day) {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    
    if (nowDay === currDay) {
      return "bg-primary text-primary-foreground rounded-full font-medium";
    } else if (currDay === slcDay) {
      return "bg-primary/20 text-primary rounded-full font-medium";
    } else {
      return "hover:bg-gray-100 rounded-full";
    }
  }
  
  const isCurrentMonth = currentMonthIdx === dayjs().month();
  
  return (
    <div className="mt-1">
      <header className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-medium text-gray-700">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format(
            "MMMM YYYY"
          )}
        </h2>
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handlePrevMonth}
            className="h-6 w-6 p-0 rounded-full"
          >
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleNextMonth}
            className="h-6 w-6 p-0 rounded-full"
          >
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </Button>
        </div>
      </header>
      
      <div className="grid grid-cols-7 text-center text-xs">
        {currentMonth[0].map((day, i) => (
          <span key={i} className="py-1 text-gray-500 font-medium">
            {day.format("dd").charAt(0)}
          </span>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1 mt-1">
        {currentMonth.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => {
              const isCurrentDay = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
              const isSelected = daySelected && day.format("DD-MM-YY") === daySelected.format("DD-MM-YY");
              const isOtherMonth = day.month() !== currentMonthIdx;
              
              return (
                <Button
                  key={idx}
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSmallCalendarMonth(currentMonthIdx);
                    setDaySelected(day);
                  }}
                  className={cn(
                    "h-7 w-7 p-0 text-xs font-normal",
                    getDayClass(day),
                    isOtherMonth && "text-gray-300",
                  )}
                >
                  {day.format("D")}
                </Button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}