import axios from "axios";
import { UpdateProfileUser } from "../types/User";
import { ApiResponse } from "../types/ApiResponse";

const API_URL = "http://localhost:5000/api/v1/users"; // adjust if needed

export const deleteAccountService = async (
  password: string
): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${API_URL}/delete-account`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      data: {
        password, // axios allows body in DELETE via `data`
      },
    });

    // Clear local auth data after successful deletion
    localStorage.removeItem("token");

    return response.status === 200 || response.status === 204;
  } catch (error) {
    console.error("Delete account failed:", error);
    return false;
  }
};


// Get current user profile
export const getProfileService = async (): Promise<ApiResponse<UpdateProfileUser> | null> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get<ApiResponse<UpdateProfileUser>>(`${API_URL}/profile`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return null;
  }
};

// Update user profile
export const updateProfileService = async (
  username: string,
  email: string
): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.patch<ApiResponse<UpdateProfileUser>>(`${API_URL}/update-account`, { username, email }, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return response.status === 200;
  } catch (error) {
    console.error("Failed to update profile:", error);
    return false;
  }
};
