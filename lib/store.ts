import { create } from "zustand";

type State = {
  id: number | undefined;
  setId: (value: number) => void;
};

export const usePassedId = create<State>(set => ({
  id: undefined,
  setId: (value: number) => set(state => ({ id: value })),
}));
