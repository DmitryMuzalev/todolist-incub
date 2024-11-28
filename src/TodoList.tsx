import { FC } from "react";
import { Task } from "./App";
import { Button } from "./Button";

type Props = {
  title: string;
  tasks: Task[];
  date?: string;
};

const TodoList: FC<Props> = ({ title, tasks, date }) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <Button title="+" />
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
              </li>
            );
          })}
        </ul>
      )}

      <div>
        <Button title="All" />
        <Button title="Active" />
        <Button title="Completed" />
      </div>
      {!!date && <span>{date}</span>}
    </div>
  );
};
export { TodoList };
