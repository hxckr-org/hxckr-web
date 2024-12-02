"use client";

import { redirect } from "next/navigation";
import { DashboardLayout } from "@/app/components/layout/dashboard";
import Image from "next/image";
import {
  FirstPlaceIcon,
  SecondPlaceIcon,
  ThirdPlaceIcon,
} from "@/public/assets/icons/place-icons";
import { useGetLeaderboard } from "@/hooks/useGetLeaderboard";
import { useSession } from "next-auth/react";

export default function LeaderboardPage() {
  const session = useSession();
  if (!session.data) {
    redirect("/signin");
  }

  const { data: leaderboard } = useGetLeaderboard();
  const sortedLeaderboard = leaderboard?.sort(
    (a, b) => b?.completed_challenge_count - a?.completed_challenge_count
  );

  return (
    <DashboardLayout session={session.data}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Leaderboard</h1>
            <p className="text-gray-600">
              Hey!!! No pressure, its just a leaderboard really
            </p>
          </div>
          <div className="flex gap-4"></div>
        </div>

        <div className="flex justify-center mb-6">
          <div className="inline-flex">
            <button className="px-6 py-2 bg-white text-purple-600 border-[1.5px] border-[#DBE1E7] rounded-l-lg">
              Challenge
            </button>
            <button
              title="Streak"
              className="px-6 py-2 text-gray-500 border-[1.5px] border-[#DBE1E7] border-l-0 rounded-r-lg"
            >
              Streak
              <span className="text-[8px] ml-1 text-gray-400">coming soon</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#DBE1E7]">
          <div className="grid grid-cols-[80px_2fr_1fr_1fr] p-4 bg-[#F5F5F5] border-b border-[#DBE1E7] items-center">
            <div className="text-gray-600">
              <b>Username</b>
            </div>
            <div></div>
            <div className="text-gray-600 text-center">
              <b>Challenges Completed</b>
            </div>
            <div className="text-gray-600 text-right">
              <b>Points</b>
            </div>
          </div>

          {sortedLeaderboard?.length ? (
            sortedLeaderboard?.map((leader, index) => {
              const rank = index + 1;
              const isCurrentUser =
                leader?.github_username.toLowerCase() ===
                session.data.user.github_username.toLowerCase();

              return (
                <div
                  key={rank}
                  className={`grid grid-cols-[80px_2fr_1fr_1fr] p-4 items-center border-b border-[#DBE1E7]
                  ${
                    isCurrentUser
                      ? "bg-purple-600 text-white"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="w-[80px] flex justify-center">
                    {rank === 1 ? (
                      <FirstPlaceIcon className="w-8 h-8" />
                    ) : rank === 2 ? (
                      <SecondPlaceIcon className="w-8 h-8" />
                    ) : rank === 3 ? (
                      <ThirdPlaceIcon className="w-8 h-8" />
                    ) : (
                      <span className="w-8 h-8 flex items-center justify-center">
                        <b>{rank}</b>
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src={session.data.user.image || ""}
                      alt="User avatar"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <span>
                      <b>{leader?.github_username}</b>
                    </span>
                  </div>
                  <div className="text-center">
                    {leader?.completed_challenge_count}
                  </div>
                  <div className="text-right">
                    <span
                      className={
                        isCurrentUser ? "text-white" : "text-[#DAA520]"
                      }
                    >
                      {leader?.score}
                    </span>
                    <span
                      className={`text-sm ml-1 ${
                        isCurrentUser ? "text-white" : "text-[#DAA520]"
                      }`}
                    >
                      pts
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500">
              No data available at the moment
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
