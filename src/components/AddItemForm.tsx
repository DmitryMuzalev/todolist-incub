import { Button, Stack, TextField } from "@mui/material";
import { FC, useState, ChangeEvent, KeyboardEvent } from "react";
import AddIcon from "@mui/icons-material/Add";

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
    <Stack direction="row" spacing={1} alignItems="start">
      <TextField
        variant="outlined"
        size="small"
        onChange={changeTaskTitleHandler}
        onKeyDown={addTaskOnKeyHandler}
        value={title}
        error={!!error}
        helperText={error}
      />
      <Button
        onClick={addItemHandler}
        variant="contained"
        color="primary"
        size="large"
      >
        <AddIcon />
      </Button>
    </Stack>
  );
};

export { AddItemForm };
