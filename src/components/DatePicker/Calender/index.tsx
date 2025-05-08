import Button from "@/components/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import DateMode from "./DateMode";
import MonthMode from "./MonthMode";
import YearMode from "./YearMode";

enum DisplayMode {
  DATE,
  MONTH,
  YEAR,
}

type CalendarProps = {
  date: number; // timestamp
  onChange: (timestamp: number) => void;
};

export const Calendar: React.FC<CalendarProps> = ({ date, onChange }) => {
  const selectedDate = new Date(date);
  const [displayMode, setDisplayMode] = useState(DisplayMode.DATE);
  const [currentDate, setCurrentDate] = useState(selectedDate); // to show the current month

  const handlePrev = () => {
    if (displayMode === DisplayMode.YEAR) {
      setCurrentDate(
        new Date(currentDate.getFullYear() - 12, currentDate.getMonth(), 1),
      );
      return;
    }
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    if (displayMode !== DisplayMode.YEAR) {
      setCurrentDate(
        new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
      );
      return;
    } else if (new Date().getFullYear() - currentDate.getFullYear() > 12) {
      setCurrentDate(
        new Date(currentDate.getFullYear() + 12, currentDate.getMonth(), 1),
      );
    }
  };

  const handleChangeMode = () => {
    if (displayMode === DisplayMode.DATE) {
      setDisplayMode(DisplayMode.MONTH);
    } else if (displayMode === DisplayMode.MONTH) {
      setDisplayMode(DisplayMode.YEAR);
    } else {
      setDisplayMode(DisplayMode.DATE);
    }
  };

  const handleMonthChange = (month: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), month, 1));
    setDisplayMode(DisplayMode.DATE);
  };

  const handleYearChange = (year: number) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setDisplayMode(DisplayMode.MONTH);
  };

  const renderMode = () => {
    switch (displayMode) {
      case DisplayMode.DATE:
        return (
          <DateMode
            currentDate={currentDate}
            selectedDate={selectedDate}
            onChange={onChange}
          />
        );
      case DisplayMode.MONTH:
        return (
          <MonthMode
            currentMonth={currentDate.getMonth()}
            onChange={handleMonthChange}
          />
        );
      case DisplayMode.YEAR:
        return (
          <YearMode
            seletedYear={selectedDate.getFullYear()}
            currentYear={currentDate.getFullYear()}
            onChange={handleYearChange}
          />
        );
    }
  };

  return (
    <div className="w-70 rounded-lg bg-white p-4 text-sm shadow-md">
      <div className="mb-2 flex items-center justify-between">
        <Button variant="icon" onClick={handlePrev}>
          <ArrowLeft />
        </Button>
        <Button
          variant="goast"
          className="hover:bg-muted rounded px-2 py-1 font-semibold"
          onClick={handleChangeMode}
        >
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
          }).format(currentDate)}
        </Button>
        <Button variant="icon" onClick={handleNextMonth}>
          <ArrowRight />
        </Button>
      </div>
      {renderMode()}
    </div>
  );
};
