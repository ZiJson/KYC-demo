import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "icon" | "goast";
}

const defaultClassName =
  "h-9 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
const variants = {
  primary: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
  secondary:
    "bg-secondary text-secondary-foreground shadow hover:bg-secondary/80",
  icon: "bg-transparent text-muted-foreground hover:bg-muted aspect-square h-7 p-1 focus:ring-0",
  goast: "bg-transparent hover:bg-muted",
};

const Button = ({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={cn(defaultClassName, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
