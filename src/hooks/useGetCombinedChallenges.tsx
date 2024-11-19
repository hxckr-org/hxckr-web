"use client";

import { useMemo } from "react";

import { ChallengeWithProgress, Repository } from "@/types";

import { useGetChallenges } from "./useGetChallenges";
import { useGetUserRepositories } from "./useGetRepo";

export const useGetCombinedChallenges = () => {
  const { data: challenges = [], isLoading: isLoadingChallenges } =
    useGetChallenges({});
  const { data: userRepos, isLoading: isLoadingRepos } = useGetUserRepositories(
    {
      status: "InProgress",
    }
  );

  const combinedChallenges = useMemo((): ChallengeWithProgress[] => {
    if (!challenges || !userRepos) return [];

    // Create a map of user's repositories by challenge_id for quick lookup
    const repoMap = new Map<string, Repository>();
    userRepos.data.forEach((repo) => {
      repoMap.set(repo.challenge_id, repo);
    });

    // Merge challenges with user progress
    return challenges.map((challenge) => {
      const userRepo = repoMap.get(challenge.id);
      const currentStep = userRepo?.progress.progress_details.current_step ?? 0;
      const moduleCount = challenge.module_count || 1; // Prevent division by zero
      
      return {
        ...challenge,
        progress: {
          status: userRepo?.progress.status || "NotStarted",
          current_step: currentStep,
          completion_percentage: Math.round((currentStep / moduleCount) * 100) || 0
        }
      };
    });
  }, [challenges, userRepos]);

  return {
    challenges: combinedChallenges,
    isLoading: isLoadingChallenges || isLoadingRepos,
  };
};
