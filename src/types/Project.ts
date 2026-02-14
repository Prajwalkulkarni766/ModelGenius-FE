import { Dataset } from "./Dataset";
import { Model } from "./Model";

export type NewProject = {
  projectTitle: string;
  projectDescription: string;
};

export type ProjectDetails = {
  _id: string;
  projectTitle: string;
  projectDescription: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ProjectDetailsResponse = {
  projectDetails: ProjectDetails;
  modelsRealtedToThisProject: Model[];
  datasetRelatedToThisProject: Dataset[];
};

export type ProjectCardProps = {
  _id: string;
  projectTitle: string;
  projectDescription: string;
  userId: string;
  projectFile?: string;
  createdAt?: string;
  updatedAt?: string;
};
