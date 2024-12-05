import { FC, useState, ChangeEvent, KeyboardEvent } from "react";
import { Button } from "./components/Button";
import { Filter, Task } from "./types";

type Props = {
  title: string;
  tasks: Task[];
  addTask: (title: string) => void;
  removeTask: (id: string) => void;
  changeFilter: (filter: Filter) => void;
};

const TodoList: FC<Props> = ({
  title,
  tasks,
  addTask,
  removeTask,
  changeFilter,
}) => {
  const [taskTitle, setTaskTitle] = useState<string>("");

  const addTaskHandler = () => {
    if (taskTitle.trim()) {
      addTask(taskTitle);
      setTaskTitle("");
    }
  };
  const addTaskOnKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addTaskHandler();
  };

  const removeTaskHandler = (taskId: string) => removeTask(taskId);

  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
  };
  const changeFilterHandler = (filter: Filter) => changeFilter(filter);

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          onChange={changeTaskTitleHandler}
          onKeyDown={addTaskOnKeyHandler}
          value={taskTitle}
        />
        <Button onClick={addTaskHandler} title="+" />
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
                <Button onClick={() => removeTaskHandler(task.id)} title="x" />
              </li>
            );
          })}
        </ul>
      )}

      <div>
        <Button title="All" onClick={() => changeFilterHandler("all")} />
        <Button title="Active" onClick={() => changeFilterHandler("active")} />
        <Button
          title="Completed"
          onClick={() => changeFilterHandler("completed")}
        />
      </div>
    </div>
  );
};
export { TodoList };
