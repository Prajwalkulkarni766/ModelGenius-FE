import axios from "axios";
import { ProjectDetailsResponse } from "../types/Project";
import { ProjectCardProps } from "../types/Project";
import { ApiResponse } from "../types/ApiResponse";

const API_URL = "http://localhost:5000/api/v1/projects";

export const newProjectService = async (
  formData: FormData
): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(`${API_URL}`, formData, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

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

    const token = localStorage.getItem("token");

    const response = await axios.get<ApiResponse<ProjectDetailsResponse>>(
      `${API_URL}/${projectId}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch project details:", error);
    return null;
  }
};


export const fetchLatestProjectsService = async (): Promise<ApiResponse<ProjectCardProps[]> | null> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get<ApiResponse<ProjectCardProps[]>>(`${API_URL}/latest`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch latest projects:", error);
    return null;
  }
};

export const deleteProjectService = async (projectId: string): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${API_URL}/${projectId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return response.status === 200 || response.status === 204;
  } catch (error) {
    console.error("Failed to delete project:", error);
    return false;
  }
};

export const fetchProjectsService = async (): Promise<ApiResponse<ProjectCardProps[]> | null> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get<ApiResponse<ProjectCardProps[]>>(`${API_URL}/projects`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return null;
  }
};
