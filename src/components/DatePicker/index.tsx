import { useId, useState } from "react";
import { Calendar } from "./Calender";
import { cn } from "@/lib/utils";
import Button from "../Button";
import { CalendarCheck, X } from "lucide-react";

interface DatePickerProps {
  onChange: (timestamp: number) => void;
  value: number | null;
  placeholder?: string;
}

const DatePicker = ({
  onChange,
  value,
  placeholder = "Pick a date",
}: DatePickerProps) => {
  const id = useId();
  const [isExpanded, setIsExpanded] = useState(false);
  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    setIsExpanded(false);
  };

  const handleChange = (value: number) => {
    onChange(value);
  };

  const handleClear = () => {
    onChange(0);
  };
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className="absolute top-1/2 right-2 flex -translate-y-1/2 cursor-pointer items-center gap-1"
      >
        <Button
          variant="icon"
          onClick={handleClear}
          onMouseDown={(e) => e.preventDefault()}
          className={cn("h-auto p-1", !value && "hidden")}
        >
          <X />
        </Button>
        <CalendarCheck size={16} className="text-muted-foreground" />
      </label>
      <input
        id={id}
        readOnly
        value={value ? new Date(value).toLocaleDateString() : ""}
        className="w-full cursor-pointer rounded-md border px-2 py-1.5 text-sm focus:ring-2 focus:outline-none"
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <div
        className={cn(
          "absolute top-[calc(100%_+_10px)] z-10 origin-top scale-100 opacity-100 transition-all duration-200",
          !isExpanded && "scale-0 opacity-0",
        )}
        onMouseDown={(e) => e.preventDefault()}
      >
        <Calendar
          date={value || new Date().valueOf()}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default DatePicker;
