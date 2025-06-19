import { Model } from "./Model";
import { Dataset } from "./Dataset";

export interface ProjectCardProps {
    _id: string;
    projectTitle: string;
    updatedAt: Date;
    projectFile: string;
}

export interface ProjectListProps {
    projects: ProjectCardProps[];
}

export interface NewProject {
    projectTitle: string;
    projectDescription: string;
}

export interface Project {
    _id: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    projectTitle: string;
    projectDescription: string;
}

export interface ProjectDetailsResponse {
    projectDetails: Project;
    modelsRealtedToThisProject: Model[] | null;
    datasetRelatedToThisProject: Dataset[] | null;
}
