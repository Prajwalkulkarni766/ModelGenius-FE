import api from './api';

const signupService = async (username: string, email: string, password: string) => {
  try {
    const response = await api.post('/v1/users/register', { username, email, password });

    if (response.data.statusCode === 200) {
      return true;
    }

    return false;
  } catch (error) {
    console.error('Signup failed:', error);
    throw new Error('Signup failed. Please check your details or try again later.');
  }
}

const loginService = async (email: string, password: string) => {
  try {
    const response = await api.post('/v1/users/login', { email, password });

    const { accessToken } = response.data.data;

    if (accessToken) {
      localStorage.setItem('token', accessToken);
      return { requestStatus: true, responseData: response.data.data };
    }

    return { requestStatus: false, responseData: null };
  } catch (error) {
    throw new Error('Login failed. Please check your credentials or try again later.');
  }
};

const logoutService = async () => {
  try {
    const response = await api.post('/v1/users/logout');

    if (response.status === 200) {
      return { requestStatus: true, responseData: null };
    } else {
      return { requestStatus: false, responseData: null };
    }
  } catch (error) {
    throw new Error('Login failed. Please check your credentials or try again later.');
  }
};

export {
  loginService,
  signupService,
  logoutService,
};
