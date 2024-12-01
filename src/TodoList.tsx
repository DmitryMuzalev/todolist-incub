import { FC } from "react";
import { Filter, Task } from "./App";
import { Button } from "./Button";

type Props = {
  title: string;
  tasks: Task[];
  removeTask: (id: number) => void;
  changeFilter: (value: Filter) => void;
};

const TodoList: FC<Props> = ({ title, tasks, removeTask, changeFilter }) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <Button cb={() => {}} title="+" />
      </div>

      {!tasks.length ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            return (
              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} />
                <span>{task.title}</span>
                <button onClick={() => removeTask(task.id)}>x</button>
              </li>
            );
          })}
        </ul>
      )}

      <div>
        <Button cb={() => changeFilter("all")} title="All" />
        <Button cb={() => changeFilter("active")} title="Active" />
        <Button cb={() => changeFilter("completed")} title="Completed" />
      </div>
    </div>
  );
};
export { TodoList };
