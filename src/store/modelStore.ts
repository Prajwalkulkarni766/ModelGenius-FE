import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ModelState = {
  _id: string;
  modelName?: string;
  status?: string;
};

type ModelStore = {
  model: ModelState | null;
  currentStep: string;
  setModel: (model: ModelState) => void;
  setCurrentStep: (step: string) => void;
  clearModel: () => void;
};

export const modelStore = create<ModelStore>()(
  persist(
    (set) => ({
      model: null,
      currentStep: "step1",

      setModel: (model) =>
        set({
          model,
        }),

      setCurrentStep: (step) =>
        set({
          currentStep: step,
        }),

      clearModel: () =>
        set({
          model: null,
          currentStep: "step1",
        }),
    }),
    {
      name: "wizard-model-state",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
