import { v1 } from "uuid";
import { FilterType, TodoListType } from "../../types";

export type CreateTodolistAction = ReturnType<typeof createTodolistAC>;
export type RemoveTodolistAction = ReturnType<typeof removeTodolistAC>;
type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>;
type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>;

type Actions =
  | CreateTodolistAction
  | RemoveTodolistAction
  | ChangeTodolistTitleAction
  | ChangeTodolistFilterAction;

//_Reducer:
export const todolistsReducer = (
  state: TodoListType[],
  action: Actions
): TodoListType[] => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TODO": {
      const { todoId, title } = payload;
      const newTodoList: TodoListType = {
        id: todoId,
        title,
        filter: "all",
      };

      return [...state, newTodoList];
    }

    case "REMOVE_TODO": {
      const { todoId } = payload;
      return state.filter((tl) => tl.id !== todoId);
    }

    case "CHANGE_TODO_TITLE": {
      const { todoId, title } = payload;
      return state.map((todo) =>
        todo.id === todoId ? { ...todo, title } : todo
      );
    }

    case "CHANGE_TODO_FILTER": {
      const { todoId, filter } = payload;
      return state.map((tl) => (tl.id === todoId ? { ...tl, filter } : tl));
    }

    default:
      return state;
  }
};

//_Action creators:

//_Create todo:
export const createTodolistAC = ({ title }: { title: string }) => {
  const payload = { todoId: v1(), title };
  return { type: "ADD_TODO", payload } as const;
};

//_Remove todo:
export const removeTodolistAC = (payload: { todoId: string }) => {
  return { type: "REMOVE_TODO", payload } as const;
};

//_Change todo title:
export const changeTodolistTitleAC = (payload: {
  title: string;
  todoId: string;
}) => {
  return { type: "CHANGE_TODO_TITLE", payload } as const;
};

//_Change todo title:
export const changeTodolistFilterAC = (payload: {
  todoId: string;
  filter: FilterType;
}) => {
  return { type: "CHANGE_TODO_FILTER", payload } as const;
};
