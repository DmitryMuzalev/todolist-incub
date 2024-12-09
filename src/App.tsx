import "./App.css";

import { v1 } from "uuid";

import { useState } from "react";

import { Filter, Task } from "./types";

import { TodoList } from "./TodoList";

const initialState: Task[] = [
  { id: v1(), title: "HTML&CSS", isDone: true },
  { id: v1(), title: "JS", isDone: true },
  { id: v1(), title: "ReactJS", isDone: false },
  { id: v1(), title: "Redux", isDone: false },
  { id: v1(), title: "Typescript", isDone: false },
  { id: v1(), title: "RTK query", isDone: false },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialState);
  const [filter, setFilter] = useState<Filter>("all");

  const removeTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const addTask = (title: string) => {
    const newTask: Task = {
      id: v1(),
      isDone: false,
      title,
    };
    setTasks([newTask, ...tasks]);
  };

  const changeFilter = (filter: Filter) => setFilter(filter);

  const changeTaskStatus = (id: string) => {
    const updateTasks = tasks.map((t) => {
      return t.id === id ? { ...t, isDone: !t.isDone } : t;
    });

    setTasks(updateTasks);
  };

  let list = tasks;

  if (filter === "completed") {
    list = tasks.filter((t) => t.isDone);
  }

  if (filter === "active") {
    list = tasks.filter((t) => !t.isDone);
  }

  return (
    <div className="App">
      <TodoList
        title="What to learn"
        tasks={list}
        filter={filter}
        removeTask={removeTask}
        addTask={addTask}
        changeFilter={changeFilter}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  );
}

export default App;
