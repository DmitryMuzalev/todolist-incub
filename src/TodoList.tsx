import { FC, useState, ChangeEvent, KeyboardEvent } from "react";
import { Button } from "./components/Button";
import { FilterType, TaskType } from "./types";

type Props = {
  todoListId: string;
  title: string;
  tasks: TaskType[];
  filter: FilterType;
  addTask: (todoListId: string, title: string) => void;
  removeTask: (todoListId: string, taskId: string) => void;
  changeFilter: (todoListId: string, filter: FilterType) => void;
  changeTaskStatus: (todoListId: string, taskId: string) => void;
  removeTodoList: (todoListId: string) => void;
};

const TodoList: FC<Props> = ({
  todoListId,
  title,
  tasks,
  filter,
  addTask,
  removeTask,
  changeFilter,
  changeTaskStatus,
  removeTodoList,
}) => {
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const addTaskHandler = () => {
    const newTask = taskTitle.trim();
    if (newTask) {
      addTask(todoListId, newTask);
      setTaskTitle("");
    } else {
      setError("Title is required");
    }
  };
  const addTaskOnKeyHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === "Enter") addTaskHandler();
  };

  const removeTaskHandler = (taskId: string) => removeTask(todoListId, taskId);

  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value);
  };
  const changeFilterHandler = (filter: FilterType) =>
    changeFilter(todoListId, filter);

  const changeTaskStatusHandler = (taskId: string) =>
    changeTaskStatus(todoListId, taskId);

  const removeTodoListHandler = () => {
    removeTodoList(todoListId);
  };

  return (
    <div>
      <div className={"todolist-title-container"}>
        <h3>{title}</h3>
        <Button title="x" onClick={removeTodoListHandler} />
      </div>
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
