import { v1 } from "uuid";
import { TasksStateType, TaskType } from "../../types";
import {
  CreateTodolistAction,
  RemoveTodolistAction,
} from "../todolists-reducrer/todolists-reducer";

type CreateTaskAction = ReturnType<typeof createTaskAC>;
type RemoveTaskAction = ReturnType<typeof removeTaskAC>;
type ChangeTaskTilteAction = ReturnType<typeof changeTaskTitleAC>;
type ChangeTaskStatusACAction = ReturnType<typeof changeTaskStatusAC>;

type Actions =
  | CreateTodolistAction
  | RemoveTodolistAction
  | CreateTaskAction
  | RemoveTaskAction
  | ChangeTaskTilteAction
  | ChangeTaskStatusACAction;

export const tasksReducer = (state: TasksStateType, action: Actions) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD_TODO": {
      const { id } = payload;
      return { ...state, [id]: [] };
    }

    case "REMOVE_TODO": {
      const { id } = payload;
      delete state[id];
      return { ...state };
    }

    case "ADD_TASK": {
      const { todoId, title } = payload;
      const newTask: TaskType = {
        id: v1(),
        isDone: false,
        title,
      };
      return { ...state, [todoId]: [newTask, ...state[todoId]] };
    }

    case "REMOVE_TASK": {
      const { todoId, taskId } = payload;
      return {
        ...state,
        [todoId]: state[todoId].filter((t) => t.id !== taskId),
      };
    }

    case "CHANGE_TASK_STATUS": {
      const { todoId, taskId } = payload;
      return {
        ...state,
        [todoId]: state[todoId].map((t) => {
          return t.id === taskId ? { ...t, isDone: !t.isDone } : t;
        }),
      };
    }

    case "CHANGE_TASK_TITLE": {
      const { title, todoId, taskId } = payload;
      return {
        ...state,
        [todoId]: state[todoId].map((t) => {
          return t.id === taskId ? { ...t, title } : t;
        }),
      };
    }

    default:
      return state;
  }
};

//_Action creators:

//_Create task:
export const createTaskAC = (payload: { todoId: string; title: string }) => {
  return { type: "ADD_TASK", payload } as const;
};

//_Remove task:
export const removeTaskAC = (payload: { todoId: string; taskId: string }) => {
  return { type: "REMOVE_TASK", payload } as const;
};

//_Change task title:
export const changeTaskStatusAC = (payload: {
  todoId: string;
  taskId: string;
}) => {
  return { type: "CHANGE_TASK_STATUS", payload } as const;
};

//_Change task title:
export const changeTaskTitleAC = (payload: {
  title: string;
  todoId: string;
  taskId: string;
}) => {
  return { type: "CHANGE_TASK_TITLE", payload } as const;
};
