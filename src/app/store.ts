import { combineReducers, legacy_createStore } from "redux";
import { todolistsReducer } from "../model/todolists-reducrer/todolists-reducer";
import { tasksReducer } from "../model/tasks-reducer/tasks-reducer";

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
});

export const store = legacy_createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
