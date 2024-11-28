"use client";

import { useEffect, useMemo, useState } from "react";

import Button from "@/app/components/primitives/button";
import { ChallengeCard } from "@/app/components/primitives/challenge-card";
import { LoadingSpinner } from "@/app/components/primitives/loading-spinner";
import { SearchBar } from "@/app/components/primitives/search-bar";
import { useGetCombinedChallenges } from "@/hooks/useGetCombinedChallenges";
import { FunnelIcon } from "@/public/assets/icons";
import { useStore } from "@/contexts/store";
import { useGetUserRepositories } from "@/hooks/useGetRepo";
import { Repository, RepositoryResponse } from "@/types";

export function ChallengesUI() {
  const [searchQuery, setSearchQuery] = useState("");
  const { addRepositories } = useStore();
  const { challenges, isLoading } = useGetCombinedChallenges();
  const { data: repositories } = useGetUserRepositories({
    page: 1,
    per_page: 10,
  });

  const inProgressAndCompletedRepositories = useMemo(() => {
    const repositoriesData = repositories as RepositoryResponse;
    return repositoriesData?.data?.filter(
      (repo: Repository) =>
        repo.progress.status === "in_progress" ||
        repo.progress.status === "completed"
    ) || [];
  }, [repositories]);

  useEffect(() => {
    if (inProgressAndCompletedRepositories?.length > 0) {
      addRepositories(inProgressAndCompletedRepositories);
    }
  }, [repositories]);

  const filteredChallenges = useMemo(() => {
    return challenges.filter((challenge) =>
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [challenges, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex items-center justify-between gap-6">
        <div className="mb-8 flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-gray-900">Challenges</h1>
          <p className="mt-1 text-[#5A5B5C] font-light">
            Practice, learn, grow: Complete challenges to mastery
          </p>
        </div>

        <div className="mb-8 flex gap-4 sm:items-center">
          <div className="w-full sm:w-96 h-12">
            <SearchBar onSearch={setSearchQuery} />
          </div>
          <Button className="flex items-center py-[14px] px-6 text-white font-normal tracking-wide shadow-sm">
            <FunnelIcon className="h-5 w-5" />
            Filters
          </Button>
        </div>
      </div>

      <div
        className={`${
          isLoading
            ? "w-full h-2/3 flex items-center justify-center"
            : "grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:flex 2xl:flex-wrap "
        }`}
      >
        {isLoading ? (
          <div className="w-full flex items-center justify-center">
            <LoadingSpinner size="large" />
          </div>
        ) : (
          filteredChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={{
                ...challenge,
                progress: challenge.progress,
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
