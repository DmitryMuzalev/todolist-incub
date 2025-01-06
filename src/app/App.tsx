import "./App.css";

import { FilterType, TasksStateType, TodoListType } from "../types";

import { TodoList } from "../TodoList";
import { AddItemForm } from "../components/AddItemForm";
import { Container, Stack } from "@mui/material";

import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  removeTodolistAC,
} from "../model/todolists-reducrer/todolists-reducer";

import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTaskAC,
  removeTaskAC,
} from "../model/tasks-reducer/tasks-reducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";

function App() {
  const todolists = useSelector<RootState, TodoListType[]>(
    (store) => store.todolists
  );
  const tasks = useSelector<RootState, TasksStateType>((store) => store.tasks);

  const dispatch = useDispatch();

  //_Task:
  const removeTask = (todoListId: string, taskId: string) => {
    dispatch(removeTaskAC({ todoId: todoListId, taskId }));
  };

  const addTask = (todoListId: string, title: string) => {
    dispatch(createTaskAC({ title, todoId: todoListId }));
  };

  const changeTaskStatus = (todoListId: string, taskId: string) => {
    dispatch(changeTaskStatusAC({ taskId, todoId: todoListId }));
  };

  const updateTaskTitle = (
    newTitle: string,
    todoListId: string,
    taskId: string
  ) => {
    dispatch(
      changeTaskTitleAC({ taskId, title: newTitle, todoId: todoListId })
    );
  };

  //_Todo:
  const addTodoList = (title: string) => {
    dispatch(createTodolistAC(title));
  };

  const removeTodoList = (todoId: string) => {
    dispatch(removeTodolistAC({ todoId }));
  };

  const changeTodoTitle = (title: string, todoId: string) => {
    dispatch(changeTodolistTitleAC({ todoId, title }));
  };

  const changeTodoFilter = (todoId: string, filter: FilterType) => {
    dispatch(changeTodolistFilterAC({ todoId, filter }));
  };

  return (
    <Container className="App">
      <Stack direction="column" spacing={7}>
        <AddItemForm addItem={addTodoList} />

        <Stack direction="row" gap={5} flexWrap="wrap">
          {todolists.map((tl) => {
            let list = tasks[tl.id];

            if (tl.filter === "completed") {
              list = tasks[tl.id].filter((t) => t.isDone);
            }

            if (tl.filter === "active") {
              list = tasks[tl.id].filter((t) => !t.isDone);
            }

            return (
              <TodoList
                key={tl.id}
                todoId={tl.id}
                title={tl.title}
                tasks={list}
                filter={tl.filter}
                removeTask={removeTask}
                addTask={addTask}
                changeTodoFilter={changeTodoFilter}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
                updateTaskTitle={updateTaskTitle}
                changeTodoTitle={changeTodoTitle}
              />
            );
          })}
        </Stack>
      </Stack>
    </Container>
  );
}

export default App;
