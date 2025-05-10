import { useState } from "react";
import { Calendar } from "./Calender";
import { cn } from "@/lib/utils";
import Button from "../Button";
import { CalendarCheck, X } from "lucide-react";
import type { ControlledFieldProps } from "@/type";
import { useStableId } from "@/hooks";

interface DatePickerProps extends ControlledFieldProps<number> {
  position?: "right" | "bottom";
}

const DatePicker = ({
  onChange,
  value,
  label,
  required,
  placeholder = "Pick a date",
  position = "bottom",
  errorMessage,
  id: idProp,
}: DatePickerProps) => {
  const id = useStableId(idProp);
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
    <div className="relative w-full max-w-3xs">
      {label && (
        <label
          htmlFor={id}
          className="relative mb-1 block px-1 text-sm font-bold"
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      <div className="relative w-full">
        <label
          htmlFor={id}
          className="absolute top-1/2 right-2 flex -translate-y-1/2 cursor-pointer items-center gap-1"
        >
          <Button
            variant="icon"
            onClick={handleClear}
            // onMouseDown={(e) => e.preventDefault()}
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
          className={cn(
            "w-full cursor-pointer rounded-md border px-2 py-1.5 text-sm focus:ring-2 focus:outline-none",
            errorMessage && "border-destructive focus:ring-0",
          )}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      <div
        className={cn(
          "absolute z-10 scale-100 opacity-100 transition-all duration-200",
          !isExpanded && "scale-0 opacity-0",
          position === "bottom" && "top-[calc(100%_+_10px)] origin-top",
          position === "right" &&
            "bottom-0 left-[calc(100%_+_10px)] origin-bottom-left",
        )}
        onMouseDown={(e) => e.preventDefault()}
      >
        <Calendar
          date={value || new Date().valueOf()}
          onChange={handleChange}
        />
      </div>
      {errorMessage && (
        <p className="text-destructive absolute top-0 right-1 mt-1 text-xs">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default DatePicker;
