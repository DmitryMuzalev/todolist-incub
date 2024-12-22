import { FC } from "react";
import { Button } from "./components/Button";
import { FilterType, TaskType } from "./types";
import { AddItemForm } from "./components/AddItemForm";
import { EditableSpan } from "./components/EditableSpan";

type Props = {
  todoListId: string;
  title: string;
  tasks: TaskType[];
  filter: FilterType;
  addTask: (todoListId: string, title: string) => void;
  removeTask: (todoListId: string, taskId: string) => void;
  changeFilter: (todoListId: string, filter: FilterType) => void;
  changeTaskStatus: (todoListId: string, taskId: string) => void;
  updateTaskTitle: (
    newTitle: string,
    todoListId: string,
    taskId: string
  ) => void;
  removeTodoList: (todoListId: string) => void;
  updateTodoTitle: (newTitle: string, todoListId: string) => void;
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
  updateTaskTitle,
  removeTodoList,
  updateTodoTitle,
}) => {
  const addTaskHandler = (title: string) => {
    addTask(todoListId, title);
  };

  const removeTaskHandler = (taskId: string) => removeTask(todoListId, taskId);

  const changeFilterHandler = (filter: FilterType) =>
    changeFilter(todoListId, filter);

  const changeTaskStatusHandler = (taskId: string) =>
    changeTaskStatus(todoListId, taskId);

  const updateTaskTitleHandler = (newTitle: string, taskId: string) =>
    updateTaskTitle(newTitle, todoListId, taskId);

  const removeTodoListHandler = () => {
    removeTodoList(todoListId);
  };

  const updateTodoTitleHandler = (newTitle: string) => {
    updateTodoTitle(newTitle, todoListId);
  };

  return (
    <div>
      <div className={"todolist-title-container"}>
        <h3>
          <EditableSpan value={title} onChange={updateTodoTitleHandler} />
        </h3>
        <Button title="x" onClick={removeTodoListHandler} />
      </div>
      <AddItemForm addItem={addTaskHandler} />

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
                <EditableSpan
                  value={task.title}
                  onChange={(newTitle) =>
                    updateTaskTitleHandler(newTitle, task.id)
                  }
                />
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
