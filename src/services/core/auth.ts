import { AxiosError } from "axios";

import { SIGNIN, SIGNUP } from "@/config/endpoints";
import { AUTH_PROVIDER, USER_ROLE } from "@/config/primitives";

import axiosInstance from "../axios";

type SignUpParams = {
  username: string;
  github_username: string;
  email: string;
  profile_pic_url: string;
  role: (typeof USER_ROLE)[keyof typeof USER_ROLE];
  provider: (typeof AUTH_PROVIDER)[keyof typeof AUTH_PROVIDER];
};

type SignInParams = {
  username: string;
  provider: (typeof AUTH_PROVIDER)[keyof typeof AUTH_PROVIDER];
};

type AuthResponse = {
  session_token: string;
  user_id: string;
};

export const signUp = async (params: SignUpParams): Promise<AuthResponse> => {
  let data = JSON.stringify({
    username: params.username.toLowerCase(),
    github_username: params.github_username.toLowerCase(),
    email: params.email.toLowerCase(),
    role: params.role,
    profile_pic_url: params.profile_pic_url,
    provider: params.provider.toLowerCase(),
  });

  let config = {
    method: "post",
    url: SIGNUP,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  try {
    const response = await axiosInstance.request(config);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 409) {
      console.log("user already exists, signing in");
      // Given that we're using oauth, we can assume that the user already exists
      // if we get a 409 response from the backend.
      // The auth flow always sign in with <oauth_provider> for both signin and signup
      // So we can just sign in with the same params and return the response
      const signInResponse = await signIn({
        username: params.username,
        provider: params.provider,
      });
      return signInResponse;
    }
    console.error("sign up error", error);
    throw error;
  }
};

export const signIn = async (params: SignInParams): Promise<AuthResponse> => {
  let data = JSON.stringify({
    username: params.username.toLowerCase(),
    provider: params.provider.toLowerCase(),
  });

  let config = {
    method: "post",
    url: SIGNIN,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  try {
    const response = await axiosInstance.request(config);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 404) {
      throw new Error("User not found");
    }
    console.error("sign in error", error);
    throw error;
  }
};
