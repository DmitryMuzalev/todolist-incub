import "./App.css";

import { v1 } from "uuid";

import { useReducer } from "react";

import { FilterType, TasksStateType } from "./types";

import { TodoList } from "./TodoList";
import { AddItemForm } from "./components/AddItemForm";
import { Container, Stack } from "@mui/material";

import {
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  createTodolistAC,
  removeTodolistAC,
  todolistsReducer,
} from "./model/todolists-reducrer/todolists-reducer";

import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  createTaskAC,
  removeTaskAC,
  tasksReducer,
} from "./model/tasks-reducer/tasks-reducer";

function App() {
  const todoListID_1 = v1();
  const todoListID_2 = v1();

  const [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
    { id: todoListID_1, title: "What to learn", filter: "all" },
    { id: todoListID_2, title: "What to buy", filter: "all" },
  ]);

  const defaultTasks: TasksStateType = {
    [todoListID_1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
    ],
    [todoListID_2]: [
      { id: v1(), title: "Redux", isDone: false },
      { id: v1(), title: "Typescript", isDone: false },
      { id: v1(), title: "RTK query", isDone: false },
    ],
  };

  const [tasks, dispatchToTasks] = useReducer(tasksReducer, defaultTasks);

  //_Task:
  const removeTask = (todoListId: string, taskId: string) => {
    dispatchToTasks(removeTaskAC({ todoId: todoListId, taskId }));
  };

  const addTask = (todoListId: string, title: string) => {
    dispatchToTasks(createTaskAC({ title, todoId: todoListId }));
  };

  const changeTaskStatus = (todoListId: string, taskId: string) => {
    dispatchToTasks(changeTaskStatusAC({ taskId, todoId: todoListId }));
  };

  const updateTaskTitle = (
    newTitle: string,
    todoListId: string,
    taskId: string
  ) => {
    dispatchToTasks(
      changeTaskTitleAC({ taskId, title: newTitle, todoId: todoListId })
    );
  };

  //_Todo:
  const addTodoList = (title: string) => {
    const action = createTodolistAC({ title });
    dispatchToTodolists(action);
    dispatchToTasks(action);
  };

  const removeTodoList = (todoId: string) => {
    const action = removeTodolistAC({ todoId });
    dispatchToTodolists(action);
    dispatchToTasks(action);
  };

  const changeTodoTitle = (title: string, todoId: string) => {
    dispatchToTodolists(changeTodolistTitleAC({ todoId, title }));
  };

  const changeTodoFilter = (todoId: string, filter: FilterType) => {
    dispatchToTodolists(changeTodolistFilterAC({ todoId, filter }));
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
