import "./App.css";
import { ChangeEvent, useState } from "react";
import { TodoList } from "./TodoList";
import { v1 } from "uuid";

export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type Filter = "all" | "active" | "completed";

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
  const [taskTitle, setTaskTitle] = useState<string>("");

  const removeTaskHandler = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const addTaskHandler = () => {
    const newTask: Task = {
      id: v1(),
      isDone: false,
      title: taskTitle,
    };
    setTasks([newTask, ...tasks]);
    setTaskTitle("");
  };

  const changeFilterHandler = (value: Filter) => setFilter(value);

  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
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
        removeTask={removeTaskHandler}
        addTask={addTaskHandler}
        changeFilter={changeFilterHandler}
        changeTaskTitle={changeTaskTitleHandler}
        taskTitle={taskTitle}
      />
    </div>
  );
}

export default App;
