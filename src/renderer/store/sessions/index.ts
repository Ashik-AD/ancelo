import { Sessions } from "@prisma/client";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type State = {
  lists: Sessions[];
  active: Sessions | null;
};

type Action = {
  addLists: (payload: Sessions[]) => void;
  setActive: (payload: Sessions) => void;
};

export type SessionSlice = State & Action;

export const sessionSlice = create(immer<SessionSlice>((set) => ({
  lists: [],
  active: null,
  addLists: (payload) =>
    set((state) => {
      state.lists = payload;
    }),
  setActive: (payload) =>
    set((state) => {
      state.active = payload;
    }),
})));
