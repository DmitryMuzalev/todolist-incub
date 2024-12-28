import "./App.css";

import { v1 } from "uuid";

import { useState } from "react";

import { FilterType, TasksStateType, TaskType, TodoListType } from "./types";

import { TodoList } from "./TodoList";
import { AddItemForm } from "./components/AddItemForm";
import { Container, Stack } from "@mui/material";

function App() {
  const todoListID_1 = v1();
  const todoListID_2 = v1();

  const [todoLists, setTodoLists] = useState<TodoListType[]>([
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

  const [tasks, setTasks] = useState<TasksStateType>(defaultTasks);

  //_Task:
  const removeTask = (todoListId: string, taskId: string) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].filter((t) => t.id !== taskId),
    });
  };

  const addTask = (todoListId: string, title: string) => {
    const newTask: TaskType = {
      id: v1(),
      isDone: false,
      title,
    };

    setTasks({ ...tasks, [todoListId]: [newTask, ...tasks[todoListId]] });
  };

  const changeTaskStatus = (todoListId: string, taskId: string) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((t) => {
        return t.id === taskId ? { ...t, isDone: !t.isDone } : t;
      }),
    });
  };

  const updateTaskTitle = (
    newTitle: string,
    todoListId: string,
    taskId: string
  ) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((t) => {
        return t.id === taskId ? { ...t, title: newTitle } : t;
      }),
    });
  };

  //_Todo:
  const addTodoList = (title: string) => {
    const newTodoListId = v1();
    const newTodoList: TodoListType = {
      id: newTodoListId,
      title,
      filter: "all",
    };

    setTodoLists([newTodoList, ...todoLists]);
    setTasks({ ...tasks, [newTodoListId]: [] });
  };

  const removeTodoList = (todoListId: string) => {
    setTodoLists(todoLists.filter((tl) => tl.id !== todoListId));

    delete tasks[todoListId];
    setTasks({ ...tasks });
  };

  const updateTodoTitle = (newTitle: string, todoListId: string) => {
    const newTodoLists = todoLists.map((todo) => {
      if (todo.id === todoListId) {
        return { ...todo, title: newTitle };
      } else {
        return todo;
      }
    });
    setTodoLists(newTodoLists);
  };

  const changeFilter = (todoListId: string, filter: FilterType) => {
    const newTodoLists = todoLists.map((tl) =>
      tl.id === todoListId ? { ...tl, filter } : tl
    );
    setTodoLists(newTodoLists);
  };

  return (
    <Container className="App">
      <Stack direction="column" spacing={7}>
        <AddItemForm addItem={addTodoList} />

        <Stack direction="row" gap={5} flexWrap="wrap">
          {todoLists.map((tl) => {
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
                todoListId={tl.id}
                title={tl.title}
                tasks={list}
                filter={tl.filter}
                removeTask={removeTask}
                addTask={addTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
                updateTaskTitle={updateTaskTitle}
                updateTodoTitle={updateTodoTitle}
              />
            );
          })}
        </Stack>
      </Stack>
    </Container>
  );
}

export default App;
