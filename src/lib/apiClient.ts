import axios from "axios";
import { clearAuthAndRedirect } from "./tokenUtils";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const REQUEST_TIMEOUT_MS = 15_000;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const MAX_RETRIES = 3;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    if (error.response?.status === 401) {
      clearAuthAndRedirect();
      return Promise.reject(error);
    }

    config.__retryCount = config.__retryCount || 0;

    const isRetryable =
      !error.response ||
      (error.response.status >= 500) ||
      error.code === "ECONNABORTED";

    if (!isRetryable || config.__retryCount >= MAX_RETRIES) {
      return Promise.reject(error);
    }

    config.__retryCount += 1;
    const delay = 1000 * Math.pow(2, config.__retryCount - 1);
    await new Promise((res) => setTimeout(res, delay));
    return apiClient(config);
  }
);

export default apiClient;
