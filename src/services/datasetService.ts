import apiClient from "../lib/apiClient";
import { ApiResponse } from "../types/ApiResponse";
import { Dataset } from "../types/Dataset";

const API_PATH = "/api/v1/datasets";

export const getDatasetService = async (
  projectId: string
): Promise<ApiResponse<Dataset[]> | null> => {
  try {
    if (!projectId) {
      throw new Error("Missing modelId, projectId, or file");
    }

    const response = await apiClient.get<ApiResponse<Dataset[]>>(
      `${API_PATH}/${projectId}/datasets`
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch dataset:", error);
    throw error;
  }
};

export const uploadDatasetService = async (
  projectId: string,
  files: File[]
): Promise<ApiResponse<Dataset> | null> => {
  try {
    if (!projectId || !files) {
      throw new Error("Missing modelId, projectId, or file");
    }

    const formData = new FormData();

    files.forEach(file => {
      formData.append("datasetFile", file);
    });


    const response = await apiClient.post<ApiResponse<Dataset>>(
      `${API_PATH}/${projectId}/datasets`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to upload dataset:", error);
    throw error;
  }
};

export const deleteDatasetService = async (
  projectId: string,
  datasetId: string
): Promise<ApiResponse<Dataset> | null> => {
  try {
    if (!projectId || !datasetId) {
      throw new Error("Missing projectId or datasetId");
    }

    const response = await apiClient.delete<ApiResponse<Dataset>>(
      `${API_PATH}/${projectId}/datasets/${datasetId}`
    );

    return response.data;
  } catch (error) {
    console.error("Failed to delete dataset:", error);
    throw error;
  }
};

export const getDatasetColumnsService = async (
  projectId: string,
  datasetId: string
): Promise<ApiResponse<string[]> | null> => {
  try {
    if (!projectId || !datasetId) {
      throw new Error("Missing projectId or datasetId");
    }

    const response = await apiClient.get<ApiResponse<string[]>>(
      `${API_PATH}/${projectId}/datasets/${datasetId}/columns`
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch dataset columns:", error);
    throw error;
  }
};

export const getDatasetPreviewService = async (
  projectId: string,
  datasetId: string
): Promise<ApiResponse<any[]> | null> => {
  try {
    if (!projectId || !datasetId) {
      throw new Error("Missing projectId or datasetId");
    }

    const response = await apiClient.get<ApiResponse<any[]>>(
      `${API_PATH}/${projectId}/datasets/${datasetId}/preview`
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch dataset preview:", error);
    throw error;
  }
};
