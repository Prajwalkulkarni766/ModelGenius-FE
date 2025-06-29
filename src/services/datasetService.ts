import api from './api';

const deleteDatasetService = async (datasetId: string | null, modelId: string | null, projectId: string | null) => {
  try {

    const response = await api.delete(
      `/v1/datasets/${projectId}/models/${modelId}/datasets/${datasetId}`
    );

    if (response.status === 204) {
      return { requestStatus: true, responseData: response.data.data };
    }

    return { requestStatus: false, responseData: null };
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw new Error('SFailed to fetch profile. Please try again later.');
  }
}

export {
  deleteDatasetService
};  