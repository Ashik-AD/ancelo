import { create } from "zustand";
import { SessionSlice, sessionSlice } from "./sessions";
import { TaskSlice, taskSlice } from "./tasks";

export interface Store {
  tasks: TaskSlice;
  sessions: SessionSlice;
}
function useStore() {
  return ({
    tasks: taskSlice,
    sessions: sessionSlice,
  });
}

export const useAppStore = create(() => useStore());
