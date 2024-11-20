"use client";

import { GET_CHALLENGES } from "@/config/endpoints";
import axios from "@/services/axios";
import { Challenge, ChallengeDifficulty, ChallengeMode } from "@/types";
import { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

type QueryParams = {
  id?: string;
  repo_url?: string;
  difficulty?: ChallengeDifficulty;
  mode?: ChallengeMode;
};

const fetchChallenges = async ({
  id,
  repo_url,
  difficulty,
  mode,
}: QueryParams) => {
  const params = new URLSearchParams();
  if (id) params.append("id", id);
  if (repo_url) params.append("repo_url", repo_url);
  if (difficulty) params.append("difficulty", difficulty);
  if (mode) params.append("mode", mode);

  try {
    const response = await axios.get(GET_CHALLENGES, { params });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const useGetChallenges = ({
  id,
  repo_url,
  difficulty,
  mode,
}: QueryParams): UseQueryResult<Challenge[]> => {
  return useQuery({
    queryKey: ["challenges", id, repo_url, difficulty, mode],
    queryFn: () => fetchChallenges({ id, repo_url, difficulty, mode }),
  });
};
