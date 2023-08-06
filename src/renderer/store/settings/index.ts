import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

type Theme = "dark" | "default";

type State = {
  theme: Theme;
  interval: number;
};

type Action = {
  setTheme: (payload: Theme) => void;
  setInterval: (payload: number) => void;
};

export type SettingSlice = State & Action;

export const settingSlice = create(immer<SettingSlice>((set) => ({
  theme: "default",
  interval: 3000,

  setTheme: (payload) =>
    set((state) => {
      state.theme = payload;
    }),

  setInterval: (payload) =>
    set((state) => {
      if (!payload || typeof payload != "number") {
        throw new Error("Payload is not passed or invalid type");
      }
      state.interval = payload;
    }),
})));
