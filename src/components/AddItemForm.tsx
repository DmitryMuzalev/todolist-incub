import { FC, useState, ChangeEvent, KeyboardEvent } from "react";
import { Button } from "./Button";

type Props = {
  addItem: (title: string) => void;
};

const AddItemForm: FC<Props> = ({ addItem }) => {
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const addItemHandler = () => {
    const newTitle = title.trim();
    if (newTitle) {
      addItem(newTitle);
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const addTaskOnKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") addItemHandler();
  };

  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <div>
      <input
        onChange={changeTaskTitleHandler}
        onKeyDown={addTaskOnKeyHandler}
        value={title}
        className={error ? "error" : ""}
      />
      <Button onClick={addItemHandler} title="+" />
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export { AddItemForm };
