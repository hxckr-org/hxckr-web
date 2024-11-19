"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import Button from "@/app/components/primitives/button";
import { Pagination } from "@/app/components/primitives/pagination";
import { ProgressBar } from "@/app/components/primitives/progress-bar";
import { useGetUserRepositories } from "@/hooks/useGetRepo";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  PlayIcon,
} from "@/public/assets/icons";
import { Repository } from "@/types";

export const RecentChallenges = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { data, isLoading, error, isError } = useGetUserRepositories({
    status: "InProgress",
    page: currentPage,
    per_page: 5,
  });
  const [isSeeAllVisible, setIsSeeAllVisible] = useState(false);

  return (
    <div className="relative h-full">
      <Header
        isSeeAllVisible={isSeeAllVisible}
        setIsSeeAllVisible={setIsSeeAllVisible}
        challengesCount={data?.data.length || 0}
      />
      <ChallengeBody
        recentChallenges={data?.data || []}
        isSeeAllVisible={isSeeAllVisible}
      />
      <div className="absolute bottom-0 w-full mb-2">
        <Pagination
          totalItems={data?.total || 0}
          itemsPerPage={data?.per_page || 0}
          className={`${!isSeeAllVisible && "hidden"}`}
        />
      </div>
    </div>
  );
};

const Header = ({
  isSeeAllVisible,
  setIsSeeAllVisible,
  challengesCount,
}: {
  isSeeAllVisible: boolean;
  setIsSeeAllVisible: (isSeeAllVisible: boolean) => void;
  challengesCount: number;
}) => {
  const router = useRouter();

  if (isSeeAllVisible) {
    return (
      <div className="flex flex-col items-left gap-4">
        <Button
          onClick={() => {
            setIsSeeAllVisible(false);
            router.replace("/dashboard");
          }}
          className="w-fit bg-transparent font-light text-base text-[#666666] hover:bg-transparent px-0"
        >
          <ArrowLeftIcon className="bg-white w-6 h-6 p-1 border-[1.5px] rounded-[4px] border-grey-border hover:bg-grey-border" />
          Go Back
        </Button>
        <div className="flex flex-col gap-2 mb-5">
          <h4 className="text-2xl font-semibold">Recent Challenges</h4>
          <p className="text-base text-[#5A5A5A] font-light">
            Your recently started challenges will appear here
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-[#F5F5F5] flex items-center justify-between h-[88px] border-[1.5px] border-grey-border rounded-ss-lg rounded-se-lg px-6 py-2">
      <h4 className="text-2xl font-semibold text-[#313233]">
        Recent Challenges
      </h4>
      <div className={`flex items-center h-12 `}>
        <Button
          onClick={() => setIsSeeAllVisible(true)}
          disabled={challengesCount < 1}
          className={`h-full text-white font-normal text-base ${
            challengesCount < 1
              ? "bg-[#DEDEDE] text-[#929293] disabled:cursor-not-allowed hover:bg-[#DEDEDE]"
              : ""
          }`}
        >
          See All{" "}
          <ChevronRightIcon
            className="w-4 h-4 text-[#929293]"
            fill={`${challengesCount < 1 ? "#929293" : "#ffffff"}`}
          />
        </Button>
      </div>
    </div>
  );
};

const ChallengeBody = ({
  recentChallenges,
  isSeeAllVisible,
}: {
  recentChallenges: Repository[];
  isSeeAllVisible: boolean;
}) => {
  const recentChallengeCount = recentChallenges.length;
  return (
    <div
      className={`flex flex-col overflow-hidden  ${
        isSeeAllVisible
          ? "h-[calc(68vh)]"
          : "h-[calc(467px-88px)] border-[1.5px] border-t-0 border-grey-border rounded-b-lg"
      }`}
    >
      {recentChallengeCount > 0 ? (
        recentChallenges.map((challenge) => (
          <RecentChallengeCard
            key={challenge.id}
            isSeeAllVisible={isSeeAllVisible}
            title={challenge.challenge.title}
            module_count={challenge.challenge.module_count}
            current_step={challenge.progress.progress_details.current_step}
          />
        ))
      ) : (
        <div className="flex flex-col items-center pt-10 h-full gap-4">
          <Image
            src="/assets/images/jig-block.webp"
            alt="Recent challenges"
            width={100}
            height={100}
          />
          <p className="text-sm text-[#5A5A5A] font-light">
            Your recent challenges will appear here.
          </p>
          <Link
            href="/challenges"
            className="bg-purple-primary text-white text-sm px-7 py-4 hover:bg-purple-primary/90 items-center gap-4 rounded-full"
          >
            Explore Challenges
          </Link>
        </div>
      )}
    </div>
  );
};

const RecentChallengeCard = ({
  title,
  module_count,
  current_step,
  isSeeAllVisible,
}: {
  title: string;
  module_count: number;
  current_step: number;
  isSeeAllVisible: boolean;
}) => {
  return (
    <div
      className={`flex items-center gap-4 h-[148px] px-4 py-8 group relative ${
        isSeeAllVisible
          ? "bg-white mb-5 rounded-lg border border-[#DBE2E8]"
          : "border-b-[1px] border-grey-border"
      }`}
    >
      <div className="flex items-center gap-4 rounded-lg w-[136px] h-[100px] border">
        <Image
          src="/assets/images/jig-block.webp"
          alt="Recent challenges"
          width={100}
          height={100}
          className="w-full h-full"
        />
      </div>
      <div className="flex flex-col items-left justify-between gap-y-3">
        <h4 className="text-xl text-[#313233] font-semibold capitalize">
          {title}
        </h4>
        <ProgressBar
          value={current_step}
          max={module_count}
          className="w-full h-2 bg-grey-border rounded-full"
        />
        <span className="text-sm text-[#5A5A5A] font-extralight">{`${current_step}/${module_count} stages done`}</span>
      </div>
      <div className="flex items-center gap-4 absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Button className="bg-[#F8F2FF] text-[#4C2480] text-base px-7 py-4 hover:bg-[#F8F2FF]/90 hover:cursor-pointer hover:border-[1.5px] hover:border-[#4C2480]/50 items-center gap-4 rounded-lg">
          <PlayIcon fill="#9747FF" />
          Continue
        </Button>
      </div>
    </div>
  );
};
