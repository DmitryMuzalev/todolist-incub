import "./App.css";
import { TodoList } from "./TodoList";

export type Task = {
  id: number;
  title: string;
  isDone: boolean;
};

function App() {
  const tasks1: Task[] = [
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
    { id: 4, title: "Redux", isDone: false },
    { id: 5, title: "Typescript", isDone: false },
    { id: 6, title: "RTK query", isDone: false },
  ];

  const tasks2: Task[] = [
    { id: 1, title: "Hello world", isDone: true },
    { id: 2, title: "I am Happy", isDone: false },
    { id: 3, title: "Yo", isDone: false },
  ];

  return (
    <div className="App">
      <TodoList title="What to learn" tasks={tasks1} date={"28.11.2024"} />
      <TodoList title="Songs" tasks={tasks2} />
    </div>
  );
}

export default App;
