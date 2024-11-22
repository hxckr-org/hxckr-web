"use client";

import { GET_USER_REPOSITORIES } from "@/config/endpoints";
import axios from "@/services/axios";
import {
  ChallengeStatus,
  Repository,
  RepositoryResponse,
  Status,
} from "@/types";
import { useQuery, UseQueryResult, UseQueryOptions } from "@tanstack/react-query";

type QueryParams = {
  id?: string;
  per_page?: number;
  page?: number;
  repo_url?: string;
  softServeUrl?: string;
  status?: ChallengeStatus;
};

const fetchUserRepositories = async ({
  per_page = 5,
  page = 1,
  repo_url,
  status = Status.NotStarted,
  id,
  softServeUrl,
}: QueryParams) => {
  const params = new URLSearchParams();
  params.append("per_page", per_page.toString());
  params.append("page", page.toString());
  if (id) {
    params.append("id", id);
    try {
      const response = await axios.get(GET_USER_REPOSITORIES, { params });
      return response.data as Repository;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  if (repo_url) params.append("repo_url", repo_url);
  if (softServeUrl) params.append("soft_serve_url", softServeUrl);
  if (status) params.append("status", status);

  try {
    const response = await axios.get(GET_USER_REPOSITORIES, { params });
    return response.data as RepositoryResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useGetUserRepositories = (
  { per_page, page, repo_url, status, id, softServeUrl }: QueryParams,
  options?: Partial<UseQueryOptions<RepositoryResponse | Repository, Error>>
): UseQueryResult<RepositoryResponse | Repository> => {
  const queryResult = useQuery<RepositoryResponse | Repository, Error>({
    queryKey: ["user-repositories", status, { per_page, page, repo_url, id }],
    queryFn: () =>
      fetchUserRepositories({
        per_page,
        page,
        repo_url,
        status,
        id,
        softServeUrl,
      }),
    ...options
  });
  return queryResult;
};
