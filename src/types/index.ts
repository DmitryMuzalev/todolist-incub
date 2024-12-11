export type TodoListType = {
  id: string;
  title: string;
  filter: FilterType;
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};

export type FilterType = "all" | "active" | "completed";
