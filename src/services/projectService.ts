import apiClient from "../lib/apiClient";
import { ProjectDetailsResponse } from "../types/Project";
import { ProjectCardProps } from "../types/Project";
import { ApiResponse } from "../types/ApiResponse";

const API_PATH = "/api/v1/projects";

export const newProjectService = async (
  formData: FormData
): Promise<boolean> => {
  try {
    const response = await apiClient.post(`${API_PATH}`, formData);

    return response.status === 200 || response.status === 201;
  } catch (error) {
    console.error("New project creation failed:", error);
    return false;
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
    return null;
  }
};


export const fetchLatestProjectsService = async (): Promise<ApiResponse<ProjectCardProps[]> | null> => {
  try {
    const response = await apiClient.get<ApiResponse<ProjectCardProps[]>>(`${API_PATH}/latest`);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch latest projects:", error);
    return null;
  }
};

export const deleteProjectService = async (projectId: string): Promise<boolean> => {
  try {
    const response = await apiClient.delete(`${API_PATH}/${projectId}`);

    return response.status === 200 || response.status === 204;
  } catch (error) {
    console.error("Failed to delete project:", error);
    return false;
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
    return null;
  }
};

export const fetchProjectsService = async (): Promise<ApiResponse<ProjectCardProps[]> | null> => {
  try {
    const response = await apiClient.get<ApiResponse<ProjectCardProps[]>>(`${API_PATH}/projects`);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return null;
  }
};
