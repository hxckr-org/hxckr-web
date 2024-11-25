"use client";

import { useMemo } from "react";

import { ChallengeWithProgress, Repository, Status } from "@/types";

import { useGetChallenges } from "./useGetChallenges";
import { useGetUserRepositories } from "./useGetRepo";

export const useGetCombinedChallenges = () => {
  const { data: challenges = [], isLoading: isLoadingChallenges } =
    useGetChallenges({});
  const { data: userRepos, isLoading: isLoadingRepos } = useGetUserRepositories(
    {
      status: Status.InProgress,
    }
  );

  const combinedChallenges = useMemo((): ChallengeWithProgress[] => {
    if (!challenges || !userRepos) return [];

    // Create a map of user's repositories by challenge_id for quick lookup
    const repoMap = new Map<string, Repository>();
    if (typeof userRepos === "object" && "data" in userRepos) {
      userRepos.data.forEach((repo) => {
        repoMap.set(repo.challenge_id, repo);
      });
    } else {
      repoMap.set(userRepos.challenge_id, userRepos);
    }

    // Merge challenges with user progress
    return challenges.map((challenge) => {
      const userRepo = repoMap.get(challenge.id);
      const currentStep = userRepo?.progress.progress_details.current_step ?? 0;
      const moduleCount = challenge.module_count || 1; // Prevent division by zero

      return {
        ...challenge,
        progress: {
          status: userRepo?.progress.status || Status.NotStarted,
          current_step: currentStep,
          completion_percentage:
            Math.round((currentStep / moduleCount) * 100) || 0,
        },
        repository: {
          id: userRepo?.id || "",
          repo_url: userRepo?.repo_url || "",
          soft_serve_url: userRepo?.soft_serve_url || "",
        },
      };
    });
  }, [challenges, userRepos]);

  return {
    challenges: combinedChallenges,
    isLoading: isLoadingChallenges || isLoadingRepos,
  };
};
