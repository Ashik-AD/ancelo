import { createWithEqualityFn } from "zustand/traditional";
import { SessionSlice, sessionSlice } from "./sessions";
import { TaskSlice, taskSlice } from "./tasks";
import { SettingSlice, settingSlice } from "./settings";

export interface Store {
  tasks: TaskSlice;
  sessions: SessionSlice;
  settings: SettingSlice;
}
function useStore() {
  return ({
    tasks: taskSlice,
    sessions: sessionSlice,
    settings: settingSlice,
  });
}

export const useAppStore = createWithEqualityFn(() => useStore(), Object.is);
