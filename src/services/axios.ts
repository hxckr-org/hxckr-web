import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import { coreBaseUrl, isBrowser } from "@/config/process";

// Create the axios instance without immediate validation
const axiosInstance = axios.create({
  baseURL: coreBaseUrl,
});

// Only validate environment variables on the client side
if (isBrowser) {
  if (!coreBaseUrl) {
    console.error("Core Base URL is not configured. Please check your environment variables.");
  }
}

axiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers["x-session-token"] = session.accessToken;
  }

  // Ensure baseURL is set for each request
  if (!config.baseURL && coreBaseUrl) {
    config.baseURL = coreBaseUrl;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      console.error("Unauthorized: ", error.response.data);
      signOut({ redirect: true, callbackUrl: "/" });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
