import { useState } from "react";
import "./App.css";
import { TodoList } from "./TodoList";

export type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

export type Filter = "all" | "active" | "completed";

const initialState: Task[] = [
  { id: 1, title: "HTML&CSS", isDone: true },
  { id: 2, title: "JS", isDone: true },
  { id: 3, title: "ReactJS", isDone: false },
  { id: 4, title: "Redux", isDone: false },
  { id: 5, title: "Typescript", isDone: false },
  { id: 6, title: "RTK query", isDone: false },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(initialState);
  const [filter, setFilter] = useState<Filter>("all");

  const removeTask = (id: number) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const changeFilter = (value: Filter) => setFilter(value);

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
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
}

export default App;
