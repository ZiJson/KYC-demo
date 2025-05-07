interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "email" | "phone";
}

const Input = ({ type, ...props }: InputProps) => {
  return <input type={type} {...props} />;
};

export default Input;
