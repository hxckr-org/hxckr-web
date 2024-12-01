"use client";

import { getChallengeDocument } from "@/helpers";
import { useGetUserRepositories } from "@/hooks/useGetRepo";
import { RepositoryResponse } from "@/types";
import Link from "next/link";
import { useState } from "react";

const ProfileChallenges = () => {
  const { data } = useGetUserRepositories({
    page: 1,
    per_page: 3,
  });
  const repositories = data as RepositoryResponse;
  const onGoingRepositories = repositories?.data.filter(
    (repo) =>
      repo.progress.status === "in_progress" ||
      repo.progress.status === "not_started"
  );
  const completedRepositories = repositories?.data.filter(
    (repo) => repo.progress.status === "completed"
  );
  const [activeTab, setActiveTab] = useState("ongoing");

  return (
    <div className="bg-white rounded-lg border border-[#DBE2E8]">
      <div className="p-6 bg-[#F5F5F5] rounded-t-lg">
        <h2 className="text-xl font-semibold text-[#313233]">Challenge</h2>
      </div>
      <div className="p-6">
        <div className="flex gap-6 border-b mb-6">
          <button
            onClick={() => setActiveTab("ongoing")}
            className={`pb-2 ${
              activeTab === "ongoing"
                ? "text-purple-600 border-b-2 border-purple-600 font-medium"
                : "text-[#5A5A5A] font-normal"
            }`}
          >
            Ongoing Challenges
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`pb-2 ${
              activeTab === "completed"
                ? "text-purple-600 border-b-2 border-purple-600 font-medium"
                : "text-[#5A5A5A] font-normal"
            }`}
          >
            Completed Challenges
          </button>
        </div>
        <ul className="space-y-4">
          {activeTab === "ongoing" ? (
            <>
              {onGoingRepositories?.length > 0 ? (
                onGoingRepositories?.map((repo) => {
                  const document = getChallengeDocument({
                    title: repo.challenge.title,
                  });
                  const currentModule =
                    repo.progress.progress_details.current_step + 1;
                  const url = document?.url.replace("/instructions", "");
                  const challengeUrl = `/challenges${url}/module-${currentModule}/instructions?rid=${repo.id}&started=true`;
                  return (
                    <Link
                      href={challengeUrl}
                      key={repo.id}
                      className="flex items-center justify-between hover:underline hover:text-purple-primary"
                    >
                      <li className="text-[#313233] hover:text-purple-primary capitalize list-disc list-inside">
                        {repo.challenge.title}
                      </li>
                    </Link>
                  );
                })
              ) : (
                <p className="text-[#5A5A5A]">
                  You have not started any challenges
                </p>
              )}
            </>
          ) : (
            <>
              {completedRepositories?.length > 0 ? (
                completedRepositories?.map((repo) => {
                  const document = getChallengeDocument({
                    title: repo.challenge.title,
                  });
                  const url = document?.url.replace("/instructions", "");
                  const currentModule =
                    repo.progress.progress_details.current_step + 1;
                  const challengeUrl = `/challenges${url}/module-${currentModule}?rid=${repo.id}&started=true`;
                  return (
                    <Link
                      href={challengeUrl}
                      key={repo.id}
                      className="flex items-center justify-between hover:underline hover:text-purple-primary"
                    >
                      <li className="text-[#313233] capitalize list-disc list-inside">
                        {repo.challenge.title}
                      </li>
                    </Link>
                  );
                })
              ) : (
                <p className="text-[#5A5A5A]">
                  You have not completed any challenges
                </p>
              )}
            </>
          )}
        </ul>
        <Link
          href="/dashboard?all=true"
          className="text-purple-600 mt-6 font-medium flex items-center gap-2"
        >
          View All
        </Link>
      </div>
    </div>
  );
};

export default ProfileChallenges;
