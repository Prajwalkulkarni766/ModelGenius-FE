import apiClient from "../lib/apiClient";
import { User } from "../types/User";

const API_PATH = "/api/v1/users";

export const signupService = async (
  username: string,
  email: string,
  password: string
): Promise<boolean> => {
  try {
    const response = await apiClient.post(`${API_PATH}/register`, {
      username,
      email,
      password,
    });

    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
    }

    return true;
  } catch (error) {
    console.error("Signup failed:", error);
    return false;
  }
};

export type LoginApiResponse = {
  statusCode: number;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  success: boolean;
};


export const loginService = async (
  email: string,
  password: string
): Promise<{
  requestStatus: boolean;
  responseData: LoginApiResponse;
}> => {
  try {
    const response = await apiClient.post<LoginApiResponse>(
      `${API_PATH}/login`,
      { email, password }
    );

    localStorage.setItem("user", JSON.stringify(response.data.data.user))

    localStorage.setItem("token", response.data.data.accessToken);

    return {
      requestStatus: true,
      responseData: response.data,
    };
  } catch (error) {
    console.error("Login failed:", error);
    return {
      requestStatus: false,
      responseData: {} as LoginApiResponse,
    };
  }
};

export const logoutService = async (): Promise<void> => {
  try {
    await apiClient.post(`${API_PATH}/logout`);
  } catch (error) {
    console.error("Logout API call failed:", error);
  }
};
