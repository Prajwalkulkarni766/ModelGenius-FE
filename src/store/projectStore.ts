import { create } from "zustand";
import { ProjectDetails, ProjectDetailsResponse } from "../types/Project";

type ProjectStore = {
  project: ProjectDetails | null;
  setProject: (data: ProjectDetailsResponse) => void;
  clearProject: () => void;
};

export const projectStore = create<ProjectStore>((set) => ({
  project: null,

  setProject: (data) =>
    set({
      project: data.projectDetails,
    }),

  clearProject: () =>
    set({
      project: null,
    }),
}));
