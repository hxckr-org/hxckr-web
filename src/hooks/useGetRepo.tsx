"use client";

import { GET_USER_REPOSITORIES } from "@/config/endpoints";
import axios from "@/services/axios";
import { RepositoryResponse, Status } from "@/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

type QueryParams = {
  per_page?: number;
  page?: number;
  repo_url?: string;
  status?: Status;
};

const fetchUserRepositories = async ({
  per_page = 10,
  page = 1,
  repo_url,
  status = "NotStarted",
}: QueryParams) => {
  const params = new URLSearchParams();
  params.append("per_page", per_page.toString());
  params.append("page", page.toString());
  if (repo_url) params.append("repo_url", repo_url);
  if (status) params.append("status", status);

  try {
    const response = await axios.get(GET_USER_REPOSITORIES, { params });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useGetUserRepositories = ({
  per_page,
  page,
  repo_url,
  status,
}: QueryParams): UseQueryResult<RepositoryResponse> => {
  const queryResult = useQuery({
    queryKey: ["user-repositories"],
    queryFn: () => fetchUserRepositories({ per_page, page, repo_url, status }),
  });
  return queryResult;
};
