import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ModelState {
  model: { _id: string; } | null;
  setModel: (model: { _id: string; } | null) => void;
}

export const modelStore = create<ModelState>()(
  persist(
    (set) => ({
      model: null,
      setModel: (model) => set({ model }),
    }),
    {
      name: 'model-storage',
    }
  )
);