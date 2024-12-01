import { FC } from "react";

type ButtonProps = {
  title: string;
  cb: () => void;
};

const Button: FC<ButtonProps> = ({ title, cb }) => {
  return <button onClick={cb}>{title}</button>;
};

export { Button };
