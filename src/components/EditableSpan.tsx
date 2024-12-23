import { TextField } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";

type Props = {
  value: string;
  onChange: (newTitle: string) => void;
};

const EditableSpan: FC<Props> = ({ value, onChange }) => {
  const [text, setText] = useState(value);
  const [editMode, setEditMode] = useState(false);

  const activateEditModeHandler = () => {
    setEditMode(true);
  };

  const deactivateEditModeHandler = () => {
    onChange(text);
    setEditMode(false);
  };

  const changeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return !editMode ? (
    <span style={{ width: "100%" }} onDoubleClick={activateEditModeHandler}>
      {text}
    </span>
  ) : (
    <TextField
      variant="standard"
      size="small"
      autoFocus
      value={text}
      onChange={changeTextHandler}
      onBlur={deactivateEditModeHandler}
    />
  );
};

export { EditableSpan };
