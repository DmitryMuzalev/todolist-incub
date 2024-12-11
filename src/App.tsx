import "./App.css";

import { v1 } from "uuid";

import { useState } from "react";

import { FilterType, TasksStateType, TaskType, TodoListType } from "./types";

import { TodoList } from "./TodoList";

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

  const changeFilter = (todoListId: string, filter: FilterType) => {
    const newTodoLists = todoLists.map((tl) =>
      tl.id === todoListId ? { ...tl, filter } : tl
    );
    setTodoLists(newTodoLists);
  };

  const changeTaskStatus = (todoListId: string, taskId: string) => {
    setTasks({
      ...tasks,
      [todoListId]: tasks[todoListId].map((t) => {
        return t.id === taskId ? { ...t, isDone: !t.isDone } : t;
      }),
    });
  };

  const removeTodoList = (todoListId: string) => {
    setTodoLists(todoLists.filter((tl) => tl.id !== todoListId));

    delete tasks[todoListId];
    setTasks({ ...tasks });
  };

  return (
    <div className="App">
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
          />
        );
      })}
    </div>
  );
}

export default App;
