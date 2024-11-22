import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_CORE_BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers["x-session-token"] = session.accessToken;
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
