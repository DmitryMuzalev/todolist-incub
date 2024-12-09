import { FC, useState, ChangeEvent, KeyboardEvent } from "react";
import { Button } from "./components/Button";
import { Filter, Task } from "./types";

type Props = {
  title: string;
  tasks: Task[];
  filter: Filter;
  addTask: (title: string) => void;
  removeTask: (id: string) => void;
  changeFilter: (filter: Filter) => void;
  changeTaskStatus: (id: string) => void;
};

const TodoList: FC<Props> = ({
  title,
  tasks,
  filter,
  addTask,
  removeTask,
  changeFilter,
  changeTaskStatus,
}) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const addTaskHandler = () => {
    const newTask = taskTitle.trim();
    if (newTask) {
      addTask(newTask);
      setTaskTitle("");
    } else {
      setError("Title is required");
    }
  };
  const addTaskOnKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") addTaskHandler();
  };

  const removeTaskHandler = (taskId: string) => removeTask(taskId);

  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
  };
  const changeFilterHandler = (filter: Filter) => changeFilter(filter);

  const changeTaskStatusHandler = (id: string) => changeTaskStatus(id);

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          onChange={changeTaskTitleHandler}
          onKeyDown={addTaskOnKeyHandler}
          value={taskTitle}
          className={error ? "error" : ""}
        />
        <Button onClick={addTaskHandler} title="+" />
        {error && <div className="error-message">{error}</div>}
      </div>

      {!tasks.length ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map((task) => {
            return (
              <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={() => changeTaskStatusHandler(task.id)}
                />
                <span>{task.title}</span>
                <Button onClick={() => removeTaskHandler(task.id)} title="x" />
              </li>
            );
          })}
        </ul>
      )}

      <div>
        <Button
          className={filter === "all" ? "active-filter" : ""}
          title="All"
          onClick={() => changeFilterHandler("all")}
        />
        <Button
          className={filter === "active" ? "active-filter" : ""}
          title="Active"
          onClick={() => changeFilterHandler("active")}
        />
        <Button
          className={filter === "completed" ? "active-filter" : ""}
          title="Completed"
          onClick={() => changeFilterHandler("completed")}
        />
      </div>
    </div>
  );
};
export { TodoList };
