import api from './api';

const createNewModel = async (projectId: string | null, modelName: string) => {
  try {
    const response = await api.post(`/v1/models/${projectId}/models`, {
      modelName: modelName
    });

    if (response.status === 201) {
      return { requestStatus: true, responseData: response.data.data };
    }

    return { requestStatus: false, responseData: null };
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw new Error('SFailed to fetch profile. Please try again later.');
  }
}

const uploadDatasetService = async (modelId: string | null, projectId: string | null, datasetFile: File) => {
  try {
    const formData = new FormData();
    formData.append('datasetFile', datasetFile);

    const response = await api.post(
      `/v1/datasets/${projectId}/models/${modelId}/datasets`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.status === 201) {
      return { requestStatus: true, responseData: response.data.data };
    }

    return { requestStatus: false, responseData: null };
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw new Error('SFailed to fetch profile. Please try again later.');
  }
}

const settingDataCleaningMethodService = async (projectId: string | null, modelId: string | null, handlingMissingValueStrategy: string, encodingCategoricalDataMethod: string, normalizationTechnique: string) => {
  try {
    const response = await api.patch(`/v1/models/${projectId}/models/${modelId}`, {
      handlingMissingValueStrategy,
      encodingCategoricalDataMethod,
      normalizationTechnique,
    });

    if (response.status === 200) {
      return { requestStatus: true, responseData: response.data.data };
    }

    return { requestStatus: false, responseData: null };
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw new Error('SFailed to fetch profile. Please try again later.');
  }
}

const setMachineLearningModelService = async (projectId: string | null, modelId: string | null, mlModelName: string) => {
  try {
    const response = await api.patch(`/v1/models/${projectId}/models/${modelId}`, {
      mlModelName
    });

    if (response.status === 200) {
      return { requestStatus: true, responseData: response.data.data };
    }

    return { requestStatus: false, responseData: null };
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw new Error('SFailed to fetch profile. Please try again later.');
  }
}

const getEvaluationMetricsService = async () => { }

const deleteModelService = async (projectId: string, modelId: string) => {
  try {
    const response = await api.delete(`/v1/models/${projectId}/models/${modelId}`);

    console.log(response)

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
  createNewModel,
  uploadDatasetService,
  settingDataCleaningMethodService,
  setMachineLearningModelService,
  getEvaluationMetricsService,
  deleteModelService
};
