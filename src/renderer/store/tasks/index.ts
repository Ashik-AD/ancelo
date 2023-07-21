import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Tasks } from "@prisma/client";
interface TasksState {
  list: Tasks[];
  completed: Tasks[];
  current: Tasks | null;
  start: boolean;
}

interface TasksAction {
  addList: (payload: Tasks[]) => void;
  addCurrent: () => void;
  addStart: () => void;
  addTask: (payload: Tasks) => void;
  addNext: () => void;
  addCompleted: (payload: Tasks) => void;
}
export const taskSlice = create(immer<TasksState & TasksAction>((set) => ({
  list: [],
  completed: [],
  current: null,
  start: false,
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
})));

