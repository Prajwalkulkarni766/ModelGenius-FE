import axios from "axios";
import { ApiResponse } from "../types/ApiResponse";
import { Dataset } from "../types/Dataset";

const API_URL = "http://localhost:5000/api/v1/datasets";

export const getDatasetService = async (
  projectId: string
): Promise<ApiResponse<Dataset[]> | null> => {
  try {
    if (!projectId) {
      throw new Error("Missing modelId, projectId, or file");
    }

    const token = localStorage.getItem("token");

    const response = await axios.get<ApiResponse<Dataset[]>>(
      `${API_URL}/${projectId}/datasets`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to upload dataset:", error);
    return null;
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

    const token = localStorage.getItem("token");

    const formData = new FormData();

    files.forEach(file => {
      formData.append("datasetFile", file);
    });


    const response = await axios.post<ApiResponse<Dataset>>(
      `${API_URL}/${projectId}/datasets`,
      formData,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to upload dataset:", error);
    return null;
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

    const token = localStorage.getItem("token");

    const response = await axios.delete<ApiResponse<Dataset>>(
      `${API_URL}/${projectId}/datasets/${datasetId}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to delete dataset:", error);
    return null;
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

    const token = localStorage.getItem("token");

    const response = await axios.get<ApiResponse<string[]>>(
      `${API_URL}/${projectId}/datasets/${datasetId}/columns`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch dataset columns:", error);
    return null;
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

    const token = localStorage.getItem("token");

    const response = await axios.get<ApiResponse<any[]>>(
      `${API_URL}/${projectId}/datasets/${datasetId}/preview`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to fetch dataset preview:", error);
    return null;
  }
};

