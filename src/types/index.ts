export type Task = {
  id: string;
  title: string;
  isDone: boolean;
};

export type Filter = "all" | "active" | "completed";
