import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React from "react";
import Button from "@/components/Button";
import { useStableId } from "@/hooks";
import type { ControlledFieldProps, NativeInputProps } from "@/type";

interface InputProps<T = string>
  extends NativeInputProps<T>,
    ControlledFieldProps<T> {
  type?: "text" | "email" | "phone";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      className,
      errorMessage,
      label,
      id: idProp,
      value,
      required,
      onChange,
      ...props
    },
    ref,
  ) => {
    const id = useStableId(idProp);

    const handleClear = () => {
      onChange("");
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
          <input
            id={id}
            value={value ?? ""}
            ref={ref}
            type={type}
            className={cn(
              "placeholder:text-muted-foreground focus:ring-ring w-full rounded-md border px-2 py-1.5 text-sm focus:ring-2 focus:outline-none",
              errorMessage && "border-destructive focus:ring-0",
              className,
            )}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            {...props}
          />
          {value && (
            <Button
              variant="icon"
              tabIndex={-1}
              onClick={handleClear}
              className="absolute top-1/2 right-2 h-auto -translate-y-1/2 p-1"
            >
              <X />
            </Button>
          )}
        </div>
        {errorMessage && (
          <p className="text-destructive absolute top-0 right-1 mt-1 text-xs">
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
