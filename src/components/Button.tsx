import { ButtonHTMLAttributes, FC } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: FC<ButtonProps> = ({ title, ...props }) => {
  return <button {...props}>{title}</button>;
};

export { Button };
