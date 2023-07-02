import { create } from "zustand";
import { Tasks } from "@prisma/client";
interface TaskStore {
  list: Tasks[];
  queue: Tasks | null;
  completed: Tasks[];
  current: Tasks | null;
  start: boolean;
  setList: (payload: Tasks[] | Tasks) => void;
  setStart: () => void;
  addTask: (payload: Tasks) => void;
  setQueue: (payload: Tasks) => void;
  setCurrent: (payload: Tasks) => void;
  setCompleted: (payload: Tasks) => void;
}
export const useTaskStore = create<TaskStore>()((set) => ({
  list: [],
  queue: null,
  completed: [],
  current: null,
  start: false,
  setList: (payload) => set(state => ({list: state.list.concat(payload)})),
  setQueue: (payload) => set({ queue: payload }),
  setCurrent: (payload) => set({ current: payload }),
  setStart: () => set((state) => ({ start: !state.start })),
  setCompleted: (payload) =>
    set((state) => ({ completed: state.completed.push(payload) })),
  addTask: (payload) => set((state) => ({ list: state.list.push(payload) })),
}));
