import apiClient from "../lib/apiClient";
import { UpdateProfileUser } from "../types/User";
import { ApiResponse } from "../types/ApiResponse";

const API_PATH = "/api/v1/users";

export const deleteAccountService = async (
  password: string
): Promise<boolean> => {
  try {
    const response = await apiClient.delete(`${API_PATH}/delete-account`, {
      data: {
        password,
      },
    });

    localStorage.removeItem("token");

    return response.status === 200 || response.status === 204;
  } catch (error) {
    console.error("Delete account failed:", error);
    throw error;
  }
};


export const getProfileService = async (): Promise<ApiResponse<UpdateProfileUser> | null> => {
  try {
    const response = await apiClient.get<ApiResponse<UpdateProfileUser>>(`${API_PATH}/profile`);

    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    throw error;
  }
};

export const updateProfileService = async (
  username: string,
  email: string
): Promise<boolean> => {
  try {
    const response = await apiClient.patch<ApiResponse<UpdateProfileUser>>(`${API_PATH}/update-account`, { username, email });

    return response.status === 200;
  } catch (error) {
    console.error("Failed to update profile:", error);
    throw error;
  }
};
