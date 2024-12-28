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
      const { id, title } = payload;
      const newTodoList: TodoListType = {
        id,
        title,
        filter: "all",
      };

      return [...state, newTodoList];
    }

    case "REMOVE_TODO": {
      const { id } = payload;
      return state.filter((tl) => tl.id !== id);
    }

    case "CHANGE_TODO_TITLE": {
      const { id, title } = payload;
      return state.map((todo) => (todo.id === id ? { ...todo, title } : todo));
    }

    case "CHANGE_TODO_FILTER": {
      const { id, filter } = payload;
      return state.map((tl) => (tl.id === id ? { ...tl, filter } : tl));
    }

    default:
      return state;
  }
};

//_Action creators:

//_Create todo:
export const createTodolistAC = (payload: { id: string; title: string }) => {
  return { type: "ADD_TODO", payload } as const;
};

//_Remove todo:
export const removeTodolistAC = (payload: { id: string }) => {
  return { type: "REMOVE_TODO", payload } as const;
};

//_Change todo title:
export const changeTodolistTitleAC = (payload: {
  title: string;
  id: string;
}) => {
  return { type: "CHANGE_TODO_TITLE", payload } as const;
};

//_Change todo title:
export const changeTodolistFilterAC = (payload: {
  id: string;
  filter: FilterType;
}) => {
  return { type: "CHANGE_TODO_FILTER", payload } as const;
};
