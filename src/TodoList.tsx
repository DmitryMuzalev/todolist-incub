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
  todoListId: string;
  title: string;
  tasks: TaskType[];
  filter: FilterType;
  addTask: (todoListId: string, title: string) => void;
  removeTask: (todoListId: string, taskId: string) => void;
  changeFilter: (todoListId: string, filter: FilterType) => void;
  changeTaskStatus: (todoListId: string, taskId: string) => void;
  updateTaskTitle: (
    newTitle: string,
    todoListId: string,
    taskId: string
  ) => void;
  removeTodoList: (todoListId: string) => void;
  updateTodoTitle: (newTitle: string, todoListId: string) => void;
};

const TodoList: FC<Props> = ({
  todoListId,
  title,
  tasks,
  filter,
  addTask,
  removeTask,
  changeFilter,
  changeTaskStatus,
  updateTaskTitle,
  removeTodoList,
  updateTodoTitle,
}) => {
  const addTaskHandler = (title: string) => {
    addTask(todoListId, title);
  };

  const removeTaskHandler = (taskId: string) => removeTask(todoListId, taskId);

  const changeFilterHandler = (filter: FilterType) =>
    changeFilter(todoListId, filter);

  const changeTaskStatusHandler = (taskId: string) =>
    changeTaskStatus(todoListId, taskId);

  const updateTaskTitleHandler = (newTitle: string, taskId: string) =>
    updateTaskTitle(newTitle, todoListId, taskId);

  const removeTodoListHandler = () => {
    removeTodoList(todoListId);
  };

  const updateTodoTitleHandler = (newTitle: string) => {
    updateTodoTitle(newTitle, todoListId);
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
          <EditableSpan value={title} onChange={updateTodoTitleHandler} />
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
                      onChange={(newTitle) =>
                        updateTaskTitleHandler(newTitle, task.id)
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
