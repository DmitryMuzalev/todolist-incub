import { FC } from "react";
import { FilterType, TaskType } from "./types";
import { AddItemForm } from "./components/AddItemForm";
import { EditableSpan } from "./components/EditableSpan";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

type Props = {
  todoId: string;
  title: string;
  tasks: TaskType[];
  filter: FilterType;
  addTask: (todoId: string, title: string) => void;
  removeTask: (todoId: string, taskId: string) => void;
  changeTodoFilter: (todoId: string, filter: FilterType) => void;
  changeTaskStatus: (todoId: string, taskId: string) => void;
  updateTaskTitle: (title: string, todoId: string, taskId: string) => void;
  removeTodoList: (todoId: string) => void;
  changeTodoTitle: (title: string, todoId: string) => void;
};

const TodoList: FC<Props> = ({
  todoId,
  title,
  tasks,
  filter,
  addTask,
  removeTask,
  changeTodoFilter,
  changeTaskStatus,
  updateTaskTitle,
  removeTodoList,
  changeTodoTitle,
}) => {
  const addTaskHandler = (title: string) => {
    addTask(todoId, title);
  };

  const removeTaskHandler = (taskId: string) => removeTask(todoId, taskId);

  const changeFilterHandler = (filter: FilterType) =>
    changeTodoFilter(todoId, filter);

  const changeTaskStatusHandler = (taskId: string) =>
    changeTaskStatus(todoId, taskId);

  const updateTaskTitleHandler = (title: string, taskId: string) =>
    updateTaskTitle(title, todoId, taskId);

  const removeTodoListHandler = () => {
    removeTodoList(todoId);
  };

  const changeTodoTitleHandler = (title: string) => {
    changeTodoTitle(title, todoId);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 2,
        border: "1px solid black",
        borderRadius: "8px",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={1}
        marginBottom={2}
        className={"todolist-title-container"}
      >
        <h3>
          <EditableSpan value={title} onChange={changeTodoTitleHandler} />
        </h3>
        <IconButton
          aria-label="delete"
          onClick={removeTodoListHandler}
          size="large"
          color="error"
          disableRipple={true}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>

      <Stack spacing={2} sx={{ flexGrow: 1 }}>
        <AddItemForm addItem={addTaskHandler} />

        <Box sx={{ flexGrow: 1 }}>
          {!tasks.length ? (
            <p
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              Тасок нет
            </p>
          ) : (
            <List>
              {tasks.map((task) => {
                return (
                  <ListItem
                    key={task.id}
                    className={task.isDone ? "is-done" : ""}
                    sx={{ gap: "5px" }}
                  >
                    <Checkbox
                      color="primary"
                      checked={task.isDone}
                      size="medium"
                      onChange={() => changeTaskStatusHandler(task.id)}
                    />
                    <EditableSpan
                      value={task.title}
                      onChange={(title) =>
                        updateTaskTitleHandler(title, task.id)
                      }
                    />
                    <IconButton
                      onClick={() => removeTaskHandler(task.id)}
                      color="error"
                    >
                      <RemoveCircleOutlineOutlinedIcon />
                    </IconButton>
                  </ListItem>
                );
              })}
            </List>
          )}
        </Box>

        <Stack direction="row" spacing={0.5} justifyContent="center">
          <Button
            variant={filter === "all" ? "contained" : "outlined"}
            size="small"
            onClick={() => changeFilterHandler("all")}
          >
            All
          </Button>
          <Button
            size="small"
            variant={filter === "active" ? "contained" : "outlined"}
            onClick={() => changeFilterHandler("active")}
          >
            Active
          </Button>
          <Button
            size="small"
            variant={filter === "completed" ? "contained" : "outlined"}
            onClick={() => changeFilterHandler("completed")}
          >
            Completed
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
export { TodoList };
