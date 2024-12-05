import { FC } from "react";

type ButtonProps = {
  title: string;
  onClick: () => void;
};

const Button: FC<ButtonProps> = ({ title, onClick }) => {
  const clickHandler = () => onClick();

  return <button onClick={clickHandler}>{title}</button>;
};

export { Button };
