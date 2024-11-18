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
import { Repository, RepositoryResponse } from "@/types";

const recentChallengesAttempted: RepositoryResponse = {
  data: [
    {
      id: "73b227aa-f9df-40da-91e6-1d1c684e8d30",
      user_id: "ac02c63b-ab39-4248-976f-1e2e415a8574",
      challenge_id: "0d420322-7d8a-4fbd-9a78-6636da0f3ec5",
      repo_url:
        "http://ss_5fbf467b554c93d19dbf338fe0dfebb77d103289@localhost:23232/extheo__hxckr-core.git",
      soft_serve_url: "http://localhost:23232/extheo__hxckr-core.git",
      created_at: "2024-10-18T12:03:16.007659",
      updated_at: "2024-10-18T12:03:16.007662",
      challenge: {
        title: "bitcoin transactions",
        description: "bitcoin transactions",
        repo_url: "https://github.com/extheoisah/hxckr-core",
        difficulty: "easy",
        module_count: 5,
        mode: "project",
        created_at: "2024-08-27T17:44:39.757140",
        updated_at: "2024-11-02T13:30:19.400109",
      },
      progress: {
        id: "c2c63e02-ebf6-4321-b766-83b947703210",
        status: "not_started",
        progress_details: {
          current_step: 2,
        },
        created_at: "2024-10-18T12:03:16.007668",
        updated_at: "2024-10-18T12:03:16.007668",
      },
    },
    {
      id: "53abeacf-6231-4c50-b043-a8008e641033",
      user_id: "ac02c63b-ab39-4248-976f-1e2e415a8574",
      challenge_id: "068fef8b-a6d6-4943-9e57-84bbf48a87d3",
      repo_url:
        "http://ss_6f692472389f4364aeb63abc38c4b4e6b6081544@localhost:23232/extheo__hxckr-test-repo.git",
      soft_serve_url: "http://localhost:23232/extheo__hxckr-test-repo.git",
      created_at: "2024-11-02T15:02:27.718372",
      updated_at: "2024-11-02T15:02:27.718379",
      challenge: {
        title: "hxckr test repo",
        description: "hxckr test repo",
        repo_url: "https://github.com/nully0x/hxckr-test-repo",
        difficulty: "medium",
        module_count: 3,
        mode: "functional_test",
        created_at: "2024-11-02T15:01:47.153293",
        updated_at: "2024-11-02T16:33:37.094172",
      },
      progress: {
        id: "b5fe49e4-df70-487e-a397-72b1c478892e",
        status: "in_progress",
        progress_details: {
          current_step: 1,
        },
        created_at: "2024-11-02T15:02:27.718398",
        updated_at: "2024-11-03T23:31:17.023273",
      },
    },
    {
      id: "5b0fc38c-b67f-4e39-a0d0-f40a6cbcd6dc",
      user_id: "ac02c63b-ab39-4248-976f-1e2e415a8574",
      challenge_id: "f910c56c-eeb6-4a61-aa69-b23e28cc20ef",
      repo_url:
        "http://ss_27151691c873f7db4323fb436a5f44056cd512db@localhost:23232/extheo__workshop-broken-musig-wallet-debugging--ts.git",
      soft_serve_url:
        "http://localhost:23232/extheo__workshop-broken-musig-wallet-debugging--ts.git",
      created_at: "2024-11-05T16:12:40.432565",
      updated_at: "2024-11-05T16:12:40.432569",
      challenge: {
        title: "hxckr demo test repo",
        description: "hxckr demo test repo",
        repo_url:
          "https://github.com/hxckr-org/workshop-broken-musig-wallet-debugging--ts",
        difficulty: "medium",
        module_count: 2,
        mode: "functional_test",
        created_at: "2024-11-05T16:12:19.839262",
        updated_at: "2024-11-05T16:12:19.839265",
      },
      progress: {
        id: "b0b5ed2c-658d-438b-a6a1-47c5b18885f0",
        status: "in_progress",
        progress_details: {
          current_step: 2,
        },
        created_at: "2024-11-05T16:12:40.432590",
        updated_at: "2024-11-05T16:16:30.303778",
      },
    },
    {
      id: "5b0fc38c-b67f-4e39-a0d0-f40a6cbcd6dc",
      user_id: "ac02c63b-ab39-4248-976f-1e2e415a8574",
      challenge_id: "f910c56c-eeb6-4a61-aa69-b23e28cc20ef",
      repo_url:
        "http://ss_27151691c873f7db4323fb436a5f44056cd512db@localhost:23232/extheo__workshop-broken-musig-wallet-debugging--ts.git",
      soft_serve_url:
        "http://localhost:23232/extheo__workshop-broken-musig-wallet-debugging--ts.git",
      created_at: "2024-11-05T16:12:40.432565",
      updated_at: "2024-11-05T16:12:40.432569",
      challenge: {
        title: "hxckr demo test repo",
        description: "hxckr demo test repo",
        repo_url:
          "https://github.com/hxckr-org/workshop-broken-musig-wallet-debugging--ts",
        difficulty: "medium",
        module_count: 2,
        mode: "functional_test",
        created_at: "2024-11-05T16:12:19.839262",
        updated_at: "2024-11-05T16:12:19.839265",
      },
      progress: {
        id: "b0b5ed2c-658d-438b-a6a1-47c5b18885f0",
        status: "in_progress",
        progress_details: {
          current_step: 2,
        },
        created_at: "2024-11-05T16:12:40.432590",
        updated_at: "2024-11-05T16:16:30.303778",
      },
    },
  ],
  total: 3,
  page: 1,
  per_page: 10,
  total_pages: 1,
};

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
