import { create } from "zustand";
import { Tasks } from "@prisma/client";
interface TaskStore {
  list: Tasks[];
  queue: Tasks | null;
  completed: Tasks[];
  current: Tasks | null;
  start: boolean;
  addList: (payload: Tasks[]) => void;
  addStart: () => void;
  addTask: (payload: Tasks) => void;
  addQueue: (payload: Tasks) => void;
  addCurrent: (payload: Tasks) => void;
  addCompleted: (payload: Tasks) => void;
}
export const useTaskStore = create<TaskStore>()((set) => ({
  list: [],
  queue: null,
  completed: [],
  current: null,
  start: false,
  addList: (payload) => set({ list: payload }),
  addTask: (payload) =>
    set((state) => {
      let list = [...state.list, payload];
      return {
        ...state,
        list,
      };
    }),
  addQueue: (payload) => set({ queue: payload }),
  addCurrent: (payload) => set({ current: payload }),
  addStart: () => set((state) => ({ start: !state.start })),
  addCompleted: (payload) =>
    set((state) => {
      const completed = [...state.completed, payload];
      return {
        ...state,
        completed,
      };
    }),
}));
