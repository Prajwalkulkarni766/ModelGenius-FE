import apiClient from "../lib/apiClient";
import { ProjectDetailsResponse } from "../types/Project";
import { ProjectCardProps, NewProject } from "../types/Project";
import { ApiResponse } from "../types/ApiResponse";

const API_PATH = "/api/v1/projects";

export const newProjectService = async (
  projectData: NewProject
): Promise<boolean> => {
  try {
    const response = await apiClient.post(`${API_PATH}`, projectData);

    return response.status === 200 || response.status === 201;
  } catch (error) {
    console.error("New project creation failed:", error);
    throw error;
  }
};

export const fetchProjectDetailsService = async (
  projectId: string
): Promise<ApiResponse<ProjectDetailsResponse> | null> => {
  try {
    const response = await apiClient.get<ApiResponse<ProjectDetailsResponse>>(
      `${API_PATH}/${projectId}`
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch project details:", error);
    throw error;
  }
};


export const fetchLatestProjectsService = async (): Promise<ApiResponse<ProjectCardProps[]> | null> => {
  try {
    const response = await apiClient.get<ApiResponse<ProjectCardProps[]>>(`${API_PATH}/latest`);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch latest projects:", error);
    throw error;
  }
};

export const deleteProjectService = async (projectId: string): Promise<boolean> => {
  try {
    const response = await apiClient.delete(`${API_PATH}/${projectId}`);

    return response.status === 200 || response.status === 204;
  } catch (error) {
    console.error("Failed to delete project:", error);
    throw error;
  }
};

export const updateProjectService = async (
  projectId: string,
  updates: { projectTitle?: string; projectDescription?: string }
): Promise<ApiResponse<ProjectDetailsResponse> | null> => {
  try {
    const response = await apiClient.patch<ApiResponse<ProjectDetailsResponse>>(
      `${API_PATH}/${projectId}`,
      updates
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update project:", error);
    throw error;
  }
};

export const fetchProjectsService = async (): Promise<ApiResponse<ProjectCardProps[]> | null> => {
  try {
    const response = await apiClient.get<ApiResponse<ProjectCardProps[]>>(`${API_PATH}`);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    throw error;
  }
};
