import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProjectState {
  project: { _id: string; } | null;
  setProject: (project: { _id: string; } | null) => void;
}

export const projectStore = create<ProjectState>()(
  persist(
    (set) => ({
      project: null,
      setProject: (project) => set({ project }),
    }),
    {
      name: 'project-storage',
    }
  )
);