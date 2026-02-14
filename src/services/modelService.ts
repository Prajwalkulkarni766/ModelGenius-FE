import axios from "axios";
import { Model } from "../types/Model";
import { ApiResponse } from "../types/ApiResponse";

const API_URL = "http://localhost:5000/api/v1/models";

export const setMachineLearningModelService = async (
  projectId: string | null,
  modelId: string,
  selectedModel: string
): Promise<{ requestStatus: boolean }> => {
  try {
    if (!projectId || !modelId) {
      throw new Error("Missing projectId or modelId");
    }

    const token = localStorage.getItem("token");

    const response = await axios.patch(
      `${API_URL}/${projectId}/models/${modelId}`,
      {
        algorithm: selectedModel,
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    return {
      requestStatus: response.status === 200 || response.status === 201,
    };
  } catch (error) {
    console.error("Failed to set machine learning model:", error);
    return { requestStatus: false };
  }
};

export const deleteModelService = async (
  projectId: string,
  modelId: string
): Promise<{ requestStatus: boolean }> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(
      `${API_URL}/${projectId}/models/${modelId}`,
      {
        data: { projectId }, // important: DELETE body goes in `data`
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    return {
      requestStatus: response.status === 200 || response.status === 204,
    };
  } catch (error) {
    console.error("Failed to delete model:", error);
    return { requestStatus: false };
  }
};

export const createNewModel = async (
  projectId: string,
  modelName: string
): Promise<ApiResponse<Model> | null> => {
  try {
    if (!projectId) {
      throw new Error("Missing projectId");
    }

    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/${projectId}/models`,
      {
        modelName,
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to create model:", error);
    return null;
  }
};

export const settingDataCleaningMethodService = async (
  projectId: string | null,
  modelId: string | null,
  handlingMissingValueStrategy: string,
  encodingCategoricalMethod: string,
  normalizationTechnique: string,
): Promise<ApiResponse<{
  cleaningStrategy: string;
  encodingMethod: string;
  normalizationTechnique: string;
}> | null> => {
  try {
    if (!projectId || !modelId) {
      throw new Error("Missing projectId or modelId");
    }

    const token = localStorage.getItem("token");

    const response = await axios.patch<ApiResponse<{
      cleaningStrategy: string;
      encodingMethod: string;
      normalizationTechnique: string;
    }>>(
      `${API_URL}/${projectId}/models/${modelId}`,
      {
        handlingMissingValueStrategy,
        encodingCategoricalMethod,
        normalizationTechnique,
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to save preprocessing settings:", error);
    return null;
  }
};

export const setModelDatasetsService = async (
  projectId: string,
  modelId: string,
  datasetId: string
): Promise<ApiResponse<{ datasetId: string[] }> | null> => {
  try {
    if (!projectId || !modelId) {
      throw new Error("Missing projectId or modelId");
    }

    if (!datasetId.length) {
      throw new Error("No datasetId provided");
    }

    const token = localStorage.getItem("token");

    const response = await axios.patch<
      ApiResponse<{ datasetId: string[] }>
    >(
      `${API_URL}/${projectId}/models/${modelId}`,
      {
        datasetId: datasetId,
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to set model datasets:", error);
    return null;
  }
};

export const setTargetColumnService = async (
  projectId: string,
  modelId: string,
  targetColumn: string
): Promise<ApiResponse<{ targetColumn: string }> | null> => {
  try {
    if (!projectId || !modelId) {
      throw new Error("Missing projectId or modelId");
    }
    if (!targetColumn) {
      throw new Error("Missing targetColumn");
    }

    const token = localStorage.getItem("token");

    const response = await axios.patch<ApiResponse<{ targetColumn: string }>>(
      `${API_URL}/${projectId}/models/${modelId}`,
      {
        targetColumn,
      },
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to set target column:", error);
    return null;
  }
};

export const trainModelService = async (
  projectId: string,
  modelId: string
): Promise<ApiResponse<{ accuracy: number; precision: number; recall: number; f1: number }> | null> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post<ApiResponse<{ accuracy: number; precision: number; recall: number; f1: number }>>(
      `${API_URL}/${projectId}/models/${modelId}/train`,
      {},
      {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to train model:", error);
    return null;
  }
};

export const trainDryRunService = async (
  projectId: string,
  modelId: string,
  data: {
    algorithm?: string;
    handlingMissingValueStrategy?: string;
    encodingCategoricalMethod?: string;
    normalizationTechnique?: string;
    targetColumn?: string;
  }
): Promise<ApiResponse<{ accuracy?: number; precision?: number; recall?: number; f1?: number; mse?: number; rmse?: number; r2_score?: number }> | null> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.post(
      `${API_URL}/${projectId}/models/${modelId}/train-dry-run`,
      data,
      {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to dry run train model:", error);
    return null;
  }
};

export const getModelService = async (
  projectId: string,
  modelId: string
): Promise<ApiResponse<Model> | null> => {
  const token = localStorage.getItem("token");

  const response = await axios.get<ApiResponse<Model>>(
    `${API_URL}/${projectId}/models/${modelId}`,
    {
      headers: { Authorization: token ? `Bearer ${token}` : "" },
    }
  );

  return response.data;
}

export const updateModelService = async (
  projectId: string,
  modelId: string,
  updates: Partial<Model>
): Promise<ApiResponse<Model> | null> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.patch<ApiResponse<Model>>(
      `${API_URL}/${projectId}/models/${modelId}`,
      updates,
      {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to update model:", error);
    return null;
  }
};

export const exportModelService = async (
  projectId: string,
  modelId: string,
  modelName: string
): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${API_URL}/${projectId}/models/${modelId}/export`,
      {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
        responseType: 'blob'
      }
    );

    // Create href link and trigger download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;

    // Try to guess extension from content-type or just default to .pkl or .h5 based on response, 
    // or just let backend content-disposition handle it if we visited URL directly.
    // But since we use axios (for header), we need to set name manually or extract from header.
    // For simplicity, let's use a generic name or append .pkl if not present.
    // Ideally we should look at 'content-disposition' header.

    const contentDisposition = response.headers['content-disposition'];
    let fileName = `${modelName}_model.pkl`; // Default
    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
      if (fileNameMatch && fileNameMatch.length === 2)
        fileName = fileNameMatch[1];
    }

    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (error) {
    console.error("Failed to export model:", error);
    return false;
  }
};

export const exportModelCodeService = async (
  projectId: string,
  modelId: string,
  modelName: string
): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${API_URL}/${projectId}/models/${modelId}/export-code`,
      {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
        responseType: 'blob'
      }
    );

    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/x-python' }));
    const link = document.createElement('a');
    link.href = url;

    const contentDisposition = response.headers['content-disposition'];
    let fileName = `${modelName}_training_code.py`;
    if (contentDisposition) {
      const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
      if (fileNameMatch && fileNameMatch.length === 2)
        fileName = fileNameMatch[1];
    }

    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    return true;
  } catch (error) {
    console.error("Failed to export model code:", error);
    return false;
  }
};

export const getModelCodeService = async (
  projectId: string,
  modelId: string
): Promise<string | null> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${API_URL}/${projectId}/models/${modelId}/export-code`,
      {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
        responseType: 'text'
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to get model code:", error);
    return null;
  }
};

export const aiChatService = async (
  projectId: string,
  modelId: string,
  message: string,
  chatHistory: { role: string; content: string }[]
): Promise<{ reply: string } | null> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/${projectId}/models/${modelId}/ai-chat`,
      { message, chatHistory },
      { headers: { Authorization: token ? `Bearer ${token}` : "" } }
    );
    return response.data?.data;
  } catch (error) {
    console.error("AI chat failed:", error);
    return null;
  }
};