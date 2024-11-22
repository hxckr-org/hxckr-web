import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import { coreBaseUrl, isBrowser } from "@/config/process";

// Create a base axios instance
const axiosInstance = axios.create();

// Configure baseURL dynamically for each request to ensure we always have the latest value
axiosInstance.interceptors.request.use(async (config) => {
  // Add auth token if available
  const session = await getSession();
  if (session?.accessToken) {
    config.headers["x-session-token"] = session.accessToken;
  }

  // Always set the baseURL from the current environment
  config.baseURL = process.env.NEXT_PUBLIC_APP_CORE_BASE_URL || coreBaseUrl;

  // Validate baseURL on client-side only
  if (isBrowser && !config.baseURL) {
    console.error("Core Base URL is not configured. Please check your environment variables.");
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized: ", error.response.data);
      signOut({ redirect: true, callbackUrl: "/" });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
