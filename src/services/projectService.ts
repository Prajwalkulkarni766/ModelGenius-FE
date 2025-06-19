import api from './api';

const newProjectService = async (formData: FormData) => {
  try {
    const response = await api.post('/v1/projects/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data.statusCode === 200) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw new Error('SFailed to fetch profile. Please try again later.');
  }
}

const fetchProjectsService = async () => {
  try {
    const response = await api.get('/v1/projects/project');

    if (response.data.statusCode === 200) {
      return response.data.data;
    }

    return false;
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw new Error('SFailed to fetch profile. Please try again later.');
  }
}

const fetchLatestProjectsService = async () => {
  try {
    const response = await api.get('/v1/projects/latest-project');

    if (response.data.statusCode === 200) {
      return response.data.data;
    }

    return false;
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw new Error('SFailed to fetch profile. Please try again later.');
  }
}

const fetchProjectDetailsService = async (projectId: string) => {
  try {
    const response = await api.get(`/v1/projects/${projectId}`);

    if (response.data.statusCode === 200) {
      return response.data.data;
    }

    return false;
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw new Error('SFailed to fetch profile. Please try again later.');
  }
}

const deleteProjectService = async (projectId: string) => {
  try {
    const response = await api.delete(`/v1/projects/${projectId}`);

    if (response.status === 204) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw new Error('SFailed to fetch profile. Please try again later.');
  }
}

export {
  newProjectService,
  fetchProjectsService,
  fetchLatestProjectsService,
  deleteProjectService,
  fetchProjectDetailsService
};
