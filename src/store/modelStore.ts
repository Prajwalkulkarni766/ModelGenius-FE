import { create } from "zustand";

export type ModelState = {
  _id: string;
  modelName?: string;
  status?: string;
};

type ModelStore = {
  model: ModelState | null;
  setModel: (model: ModelState) => void;
  clearModel: () => void;
};

export const modelStore = create<ModelStore>((set) => ({
  model: null,

  setModel: (model) =>
    set({
      model,
    }),

  clearModel: () =>
    set({
      model: null,
    }),
}));
