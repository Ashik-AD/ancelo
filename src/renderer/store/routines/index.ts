import { create } from "zustand";
import { Routines } from "@prisma/client";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type RoutineState = {
  list: Routines[];
};

export type RoutineAction = {
  setRoutine: (payload: Routines | Routines[]) => void;
  updateRoutine: (payload: Routines) => void;
};

export type RoutineSlice = RoutineState & RoutineAction;
const routineSlice = create(devtools(immer<RoutineSlice>((set) => ({
  list: [],

  setRoutine: (payload) =>
    set((state) => {
      if (Array.isArray(payload)) {
        state.list = payload;
      } else {
        state.list.push(payload);
      }
    }),
  updateRoutine: (payload) =>
    set((state) => {
      var indexOfItem = state.list.findIndex((routine) =>
        payload.id == routine.id
      );
      if (indexOfItem < 0) {
        return;
      }
      state.list.splice(indexOfItem, 1, payload);
    }),
}))));
export default routineSlice;
