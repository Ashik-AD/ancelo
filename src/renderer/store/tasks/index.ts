import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Tasks } from "@prisma/client";
interface TasksState {
  list: Tasks[];
  completed: Tasks[];
  current: Tasks | null;
  start: boolean;
  listId: string | undefined;
}

interface TasksAction {
  addList: (payload: Tasks[]) => void;
  addCurrent: () => void;
  addStart: () => void;
  addTask: (payload: Tasks) => void;
  addNext: () => void;
  addCompleted: (payload: Tasks) => void;
  addListId: (payload: string) => void;
}
export type TaskSlice = TasksState & TasksAction;
export const taskSlice = create(immer<TaskSlice>((set) => ({
  list: [],
  completed: [],
  current: null,
  start: false,
  listId: undefined,
  addList: (payload) => set({ list: payload }),
  addTask: (payload) =>
    set((state) => {
      state.list.push(payload);
    }),
  addCurrent: () =>
    set((state) => {
      state.current = state.list[0];
      state.list = state.list.slice(1, state.list.length);
    }),
  addNext: () =>
    set((state) => {
      if (state.list.length == 0) {
        state.completed.push(state.current!!);
        state.current = null;
        state.start = false;
        return;
      }
      const currentTask = state.list.splice(0, 1);
      state.completed.push(state.current!!);
      state.current = currentTask[0];
    }),
  addStart: () =>
    set((state) => {
      state.start = !state.start;
    }),
  addCompleted: (payload) =>
    set((state) => {
      state.completed.push(payload);
    }),
  addListId: (payload) => set((state) => {
    state.listId = payload;
  })
})));

