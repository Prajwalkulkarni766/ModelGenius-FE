import axios from "axios";
import { User } from "../types/User";

const API_URL = "http://localhost:5000/api/v1/users";

export const signupService = async (
  username: string,
  email: string,
  password: string
): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
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
    const response = await axios.post<LoginApiResponse>(
      `${API_URL}/login`,
      { email, password }
    );

    // Save user for authenticated requests
    localStorage.setItem("user", JSON.stringify(response.data.data.user))

    // Save token for authenticated requests
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
