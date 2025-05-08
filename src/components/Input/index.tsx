import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React, { useRef, useImperativeHandle } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "email" | "phone";
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, className, errorMessage, onChange, ...props }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => internalRef.current!);

    const handleClear = () => {
      if (internalRef.current) {
        internalRef.current.value = "";
        internalRef.current.dispatchEvent(
          new Event("input", { bubbles: true }),
        );
      }
    };

    return (
      <div>
        <div className="relative">
          <input
            ref={internalRef}
            type={type}
            className={cn(
              "placeholder:text-muted-foreground focus:ring-ring rounded-md border px-2 py-1.5 text-sm focus:ring-2 focus:outline-none",
              errorMessage && "border-destructive focus:ring-0",
              className,
            )}
            onChange={onChange}
            {...props}
          />
          <X
            size={17}
            onClick={handleClear}
            className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer"
          />
        </div>
        {errorMessage && (
          <p className="text-destructive mt-1 pl-1 text-xs">{errorMessage}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
