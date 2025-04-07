import React, { useContext } from "react";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import GlobalContext from "../context/GlobalContext";

export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  
  return (
    <Card className="border-b rounded-b-none shadow-sm">
      <header className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Calendar className="w-8 h-8 text-primary mr-2" />
          <h1 className="mr-6 text-xl font-semibold">
            Calendar
          </h1>
          <Button 
            variant="outline" 
            onClick={handleReset}
            className="mr-4"
          >
            Today
          </Button>
          <div className="flex items-center space-x-1">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handlePrevMonth}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleNextMonth}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <h2 className="text-lg font-medium">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
      </header>
    </Card>
  );
}