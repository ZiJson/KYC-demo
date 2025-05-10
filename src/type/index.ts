export interface ControlledFieldProps<T> {
  id?: string;
  value: T | null;
  onChange: (value: T | null) => void;
  onBlur?: () => void;
  name: string;
  errorMessage?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
}

// React input props, with conflicting keys removed
export type NativeInputProps<T> = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  keyof ControlledFieldProps<T>
>;
