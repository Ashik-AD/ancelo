import { create } from "zustand";
import { Tasks } from "@prisma/client";
interface TaskStore {
  list: Tasks[];
  completed: Tasks[];
  current: Tasks | null;
  start: boolean;
  addList: (payload: Tasks[]) => void;
  addCurrent: () => void;
  addStart: () => void;
  addTask: (payload: Tasks) => void;
  addNext: () => void;
  addCompleted: (payload: Tasks) => void;
}
export const useTaskStore = create<TaskStore>()((set) => ({
  list: [],
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
  addCurrent: () =>
    set((state) => ({
      current: state.list[0],
      list: state.list.slice(1, state.list.length),
    })),
  addNext: () =>
    set((state) => {
      if (state.list.length == 0) {
        return {
          ...state,
          completed: [...state.completed, state.current!!],
          current: null,
        };
      }
      const currentTask = state.list.splice(0, 1);
      const completed = [...state.completed, state.current!!];
      return {
        ...state,
        list: [...state.list],
        current: currentTask[0],
        completed,
      };
    }),
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
