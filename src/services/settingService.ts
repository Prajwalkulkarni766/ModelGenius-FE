import api from './api';

const getProfileService = async () => {
  try {
    const response = await api.get('/v1/users/current-user');

    if (response.data.statusCode === 200) {
      return response.data.data;
    }

    return null;
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw new Error('SFailed to fetch profile. Please try again later.');
  }
}

const updateProfileService = async (username: string, email: string) => {
  try {
    const response = await api.patch('/v1/users/update-account', { username, email });

    if (response.data.statusCode === 200) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Signup failed:', error);
    throw new Error('Signup failed. Please check your details or try again later.');
  }
}

const deleteAccountService = async (password: string) => {
  try {
    const response = await api.delete('/v1/users/delete-account', { data: { password } });

    console.log(response)

    // const { accessToken } = response.data.data;

    // if (accessToken) {
    //   localStorage.setItem('token', accessToken);
    //   return true;
    // }

    // return false;
  } catch (error) {
    console.error('Delete account failed:', error);
    throw new Error('Deleting account failed. Please check your password or try again later.');
  }
};

const fetchNotificationService = async () => {
  try {
    const response = await api.get('/v1/notifications/');

    if (response.data.statusCode === 200) {
      return response.data.data;
    }

    return null;

  } catch (error) {
    console.error('Fetching notification failed:', error);
    throw new Error('Fetching notification failed.');
  }
}


export {
  getProfileService,
  updateProfileService,
  deleteAccountService,
  fetchNotificationService,
};
