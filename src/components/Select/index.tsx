import { cn } from "@/lib/utils";
import { Check, ChevronDown, X } from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import Button from "../Button";
import { useStableId } from "@/hooks";
import type { ControlledFieldProps } from "@/type";

type Option = { value: string; label: string };

interface SelectProps<T = string> extends ControlledFieldProps<T> {
  options?: Option[];
  className?: string;
}

const Select = ({
  onChange,
  value = "",
  className,
  options = [],
  placeholder = "Select ...",
  required,
  onBlur,
  label,
  errorMessage,
  id: idProp,
}: SelectProps) => {
  const id = useStableId(idProp);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [highlightIndex, setHighlightIndex] = useState(0);

  const optionsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Scroll to the highlighted option automatically
    if (isExpanded) {
      optionsRef.current?.children[highlightIndex]?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [highlightIndex, isExpanded]);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleFocus = () => {
    setIsExpanded(true);
    setSearchTerm("");
    setHighlightIndex(options.findIndex((i) => i.value === value) || 0);
  };

  const handleBlur = () => {
    setIsExpanded(false);
    setSearchTerm("");
    onBlur?.();
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setHighlightIndex(0);
  };

  const handleSelect = (val: string) => {
    onChange(val);
    setIsExpanded(false);
    setSearchTerm("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isExpanded || filteredOptions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        Math.min(prev + 1, filteredOptions.length - 1),
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSelect(filteredOptions[highlightIndex].value);
      (e.target as HTMLInputElement).blur();
    }
  };
  const handleClear = () => {
    onChange(null);
  };

  const selectedLabel = options.find((i) => i.value === value)?.label || "";

  return (
    <div className={cn("relative w-full max-w-3xs", className)}>
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
        <input
          id={id}
          type="text"
          className={cn(
            "text-muted-foreground w-full cursor-pointer rounded-md border px-2 py-1.5 text-sm focus:ring-2 focus:outline-none",
            (searchTerm || value) &&
              "text-foreground placeholder:text-foreground",
            errorMessage && !isExpanded && "border-destructive focus:ring-0",
          )}
          placeholder={selectedLabel || placeholder}
          onChange={handleSearch}
          value={searchTerm}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
        />
        <label
          htmlFor={id}
          className="absolute top-1/2 right-2 flex -translate-y-1/2 items-center gap-1"
        >
          {value && (
            <Button variant="icon" onClick={handleClear} className="h-auto p-1">
              <X />
            </Button>
          )}
          <ChevronDown size={16} className="text-muted-foreground" />
        </label>
      </div>
      <div
        className={cn(
          "absolute inset-x-0 top-[calc(100%_+_10px)] z-10 max-h-50 origin-top scale-100 overflow-y-auto rounded-md border bg-white p-1 text-sm opacity-100 shadow-lg transition-all duration-200",
          !isExpanded && "scale-0 opacity-0",
        )}
        ref={optionsRef}
      >
        {filteredOptions.length > 0 ? (
          filteredOptions.map((item, idx) => (
            <div
              key={item.value}
              className={cn(
                "relative cursor-pointer rounded-sm px-3 py-1",
                item.value === value && "bg-muted/30",
                idx === highlightIndex ? "bg-muted" : "hover:bg-muted",
              )}
              onMouseDown={() => handleSelect(item.value)}
            >
              {item.label}
              {value === item.value && (
                <Check
                  size={16}
                  className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2"
                />
              )}
            </div>
          ))
        ) : (
          <p className="text-muted-foreground px-3 py-1">No results</p>
        )}
      </div>
      {errorMessage && !isExpanded && (
        <p className="text-destructive absolute top-0 right-1 mt-1 text-xs">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default memo(Select);
