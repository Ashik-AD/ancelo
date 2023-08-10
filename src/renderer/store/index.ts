import { createWithEqualityFn } from "zustand/traditional";
import { SessionSlice, sessionSlice } from "./sessions";
import { TaskSlice, taskSlice } from "./tasks";
import { SettingSlice, settingSlice } from "./settings";
import routineSlice, { RoutineSlice } from "./routines";

export interface Store {
  tasks: TaskSlice;
  sessions: SessionSlice;
  routines: RoutineSlice;
  settings: SettingSlice;
}
function useStore() {
  return ({
    tasks: taskSlice,
    sessions: sessionSlice,
    routines: routineSlice,
    settings: settingSlice,
  });
}

export const useAppStore = createWithEqualityFn(() => useStore(), Object.is);
