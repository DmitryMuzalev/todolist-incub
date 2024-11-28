import { FC } from "react";

type ButtonProps = {
  title: string;
};

const Button: FC<ButtonProps> = ({ title }) => {
  return <button>{title}</button>;
};

export { Button };
