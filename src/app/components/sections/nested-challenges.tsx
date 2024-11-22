"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MDXLayoutRenderer } from "pliny/mdx-components.js";
import React, { useEffect, useState } from "react";

import Button from "@/app/components/primitives/button";
import useGetChallengeAttempts from "@/hooks/useGetChallengeAttempts";
import { useGetUserRepositories } from "@/hooks/useGetRepo";
import { PadlockIcon } from "@/public/assets/icons/padlock";
import { RoundedCheckIcon } from "@/public/assets/icons/rounded-check-icon";
import { ChallengeAttempt, ChallengePeriod, ChallengeWithProgress, Period, Repository, Status } from "@/types";
import { ArrowLeftIcon, ArrowRightIcon, CaretRightIcon } from "@radix-ui/react-icons";

import { Course } from "../../../../.contentlayer/generated/types";
import { mdxComponents } from "../mdxComponents";
import { LoadingSpinner } from "../primitives/loading-spinner";
import SelectDropdown from "../primitives/select-dropdown";

const NestedChallenges = ({ challenge, challengeModules }: { challenge: Course; challengeModules: Course[] }) => {
  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams(searchParams);
  const [isActive, setIsActive] = useState(false);
  const [challengeDetails, setChallengeDetails] = useState<ChallengeWithProgress>({} as ChallengeWithProgress);
  const [period, setPeriod] = useState<ChallengePeriod>(Period.AllTime);

  const repo_id = searchParams.get("rid") || challengeDetails.repository_id;
  const { data: repo, isLoading, error } = useGetUserRepositories({ id: repo_id });
  const { data: attempts, isLoading: attemptsLoading } = useGetChallengeAttempts({
    challenge_id: challengeDetails.id,
    period,
  });

  const repoDetails = repo as Repository;
  const hasStarted =
    repoDetails?.progress?.status === Status.InProgress ||
    repoDetails?.progress?.status === Status.Completed ||
    repoDetails?.progress?.progress_details.current_step > 0;

  useEffect(() => {
    const storedChallenge = window.localStorage.getItem("challenge");
    if (storedChallenge) {
      setChallengeDetails(JSON.parse(storedChallenge));
    }
  }, []);

  const hasUserStarted = urlParams.get("started") === "true" || hasStarted;

  return (
    <div className='flex h-full'>
      <ContentSideBar userStarted={hasUserStarted} isActive={isActive} challenge={challenge} challengeModules={challengeModules} />
      {/* content */}
      {hasUserStarted ? (
        <StagesContentSection
          isLoading={isLoading}
          challenge={challenge}
          attempts={attempts}
          attemptsLoading={attemptsLoading}
          period={period}
          setPeriod={setPeriod}
          repoDetails={repoDetails}
        />
      ) : (
        <IntroductionContentSection
          isLoading={isLoading}
          challenge={challenge}
          attempts={attempts}
          attemptsLoading={attemptsLoading}
          period={period}
          setPeriod={setPeriod}
        />
      )}
    </div>
  );
};

const ContentListItem = ({ isActive, text, url }: { isActive: boolean; text: string; url: string }) => {
  const searchParams = useSearchParams();
  const urlParams = new URLSearchParams(searchParams);

  return (
    <Link
      href={`/challenges${url + "?" + urlParams.toString()}`}
      className={`${isActive ? "border border-purple-secondary bg-purple-quaternary" : ""} flex gap-2 items-center p-3 rounded`}
    >
      {isActive ? <ArrowRightIcon className='h-5 w-5 text-purple-primary' /> : <PadlockIcon />}
      <p className={`${isActive ? "text-purple-primary font-medium" : "text-grey-secondary-text font-normal"} text-sm leading-[22px]  line-clamp-1`}>
        Stage {text}
      </p>
    </Link>
  );
};

const NavigationBlock = () => {
  const router = useRouter();
  return (
    <div className='flex justify-between max-h-12'>
      <section className='flex items-center border border-grey-accent rounded bg-white hover:bg-purple-quaternary'>
        <button onClick={() => router.back()} className='flex items-center gap-1 p-3 px-2.5'>
          <ArrowLeftIcon className='w-6 h-6 text-purple-primary' />
          <p className='text-purple-primary'>Back</p>
        </button>
      </section>
    </div>
  );
};

const IntroductionContentSection = ({
  isLoading,
  challenge,
  attempts,
  attemptsLoading,
  period,
  setPeriod,
}: {
  isLoading: boolean;
  challenge: Course;
  attempts: ChallengeAttempt[];
  attemptsLoading: boolean;
  period: ChallengePeriod;
  setPeriod: React.Dispatch<React.SetStateAction<ChallengePeriod>>;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const started = searchParams.get("started");
  const urlParams = new URLSearchParams(searchParams);

  const moduleUrl = `/challenges/${challenge.sourceAsParams[0]}/module-1/${challenge.slugAsParams.slice(1).join("/")}${
    urlParams.toString() ? "?" + urlParams.toString() + "&started=true" : ""
  }`;

  return (
    <div className={`flex-col gap-3 p-8 pb-6 ${started === "true" ? "hidden" : "flex"}`}>
      <div className={`justify-center items-center h-full ${isLoading ? "flex" : "hidden"}`}>
        <LoadingSpinner size='large' />
      </div>

      <div className={`${isLoading ? "hidden" : "block"} flex flex-col h-full`}>
        {/* top block */}
        <div className=' pb-4'>
          <Button
            onClick={() => {
              router.replace("/challenges");
            }}
            className='w-fit bg-transparent font-light text-base text-[#666666] hover:bg-transparent p-0'
          >
            <ArrowLeftIcon className='bg-white w-6 h-6 p-1 border-[1.5px] rounded-[4px] border-grey-border hover:bg-grey-border' />
            Go Back
          </Button>

          <div className='flex justify-between pt-4 pb-6'>
            <section className='flex flex-col gap-1'>
              <p className='text-black text-2xl leading-[36px]'>{challenge?.title}</p>
              <p className='text-grey-secondary-text font-light'>{challenge.description}</p>
            </section>

            <Link
              href={moduleUrl}
              className=' bg-purple-primary text-sm px-5 py-3 flex items-center gap-2 rounded-full font-normal hover:bg-purple-primary/90 text-white w-fit'
            >
              <p>Start Challenge</p>
              <CaretRightIcon className='w-6 h-6' />
            </Link>
          </div>

          <section>
            {challenge.languages?.map((lang) => (
              <p
                key={lang}
                className='text-purple-primary font-p22mackinac italic font-medium border border-purple-secondary rounded-full w-fit text-base px-[18px] py-1.5 capitalize bg-purple-quaternary'
              >
                {lang}
              </p>
            ))}
          </section>
        </div>

        {/* body section */}
        <div className='flex justify-between w-full h-full flex-1 gap-6 pt-3 overflow-scroll'>
          {/* left */}
          <section className={`border-[1.5px] border-grey-accent bg-white w-full rounded-lg p-5 overflow-scroll`}>
            <MDXLayoutRenderer code={challenge.body.code} components={mdxComponents} />
          </section>

          <AttemptsBoard attempts={attempts} attemptsLoading={attemptsLoading} period={period} setPeriod={setPeriod} />
        </div>
      </div>
    </div>
  );
};

const AttemptsBoard = ({
  attempts,
  attemptsLoading,
  period,
  setPeriod,
}: {
  attempts: ChallengeAttempt[];
  attemptsLoading: boolean;
  period: ChallengePeriod;
  setPeriod: React.Dispatch<React.SetStateAction<ChallengePeriod>>;
}) => {
  const periodOptions = {
    [Period.AllTime]: "All time",
    [Period.ThisWeek]: "This week",
    [Period.ThisMonth]: "This month",
    [Period.Today]: "Today",
  };
  return (
    <section className='border-[1.5px] border-grey-accent bg-white w-full max-w-[30%] rounded-lg overflow-hidden'>
      <section className='flex justify-between items-center p-5 bg-grey-card-border rounded-t-lg'>
        <div className='flex items-center gap-2'>
          <p className='text-xl text-[#000000] font-semibold'>Recent Attempts</p>
          <p className='text-xs text-grey-secondary-text'></p>
        </div>
        <div className='flex items-center h-12 rounded'>
          <div className='flex items-center gap-2'>
            <SelectDropdown
              options={Object.entries(periodOptions).map(([key, value]) => ({
                label: value,
                value: key,
              }))}
              defaultSelected={periodOptions[period]}
              onChange={(value) => setPeriod(value as ChallengePeriod)}
              className='md:w-32 w-24 gap-x-2 py-4'
            />
          </div>
        </div>
      </section>
      <section className={`flex gap-2 p-5 w-full ${attemptsLoading || attempts?.length === 0 ? "h-[calc(100%-150px)]" : "h-fit"} overflow-scroll`}>
        <div className={`w-full h-full flex justify-center items-center ${attemptsLoading ? "flex" : "hidden"}`}>
          <LoadingSpinner size='small' />
        </div>

        {attempts?.length > 0 ? (
          attempts?.map((attempt, index) => (
            <div key={index} className={`items-center justify-between gap-1 w-full ${attemptsLoading ? "hidden" : "flex"}`}>
              <div className='flex items-center gap-x-2 font-light text-sm w-1/2'>
                <div className='flex h-6 w-6 items-center justify-center rounded-full bg-black text-white text-sm font-semibold'>
                  {attempt.username.charAt(0)}
                </div>
                <p>{attempt.username}</p>
              </div>
              <div className='flex items-center font-normal text-sm gap-x-2 w-1/3'>
                <p>
                  <span className='text-purple-primary'>{attempt.total_score}</span>/{attempt.module_count}
                </p>
                <div className='border h-3 w-full overflow-hidden rounded-full bg-[#F8F2FF]'>
                  <div
                    className='h-full rounded-full bg-[#7762FF] transition-all duration-500'
                    style={{
                      width: `${Math.min(100, (1 * 100) / Math.max(1, attempt.module_count))}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={`flex justify-center items-center h-full text-black font-light text-center ${attemptsLoading ? "hidden" : "block"}`}>
            <p>No attempts found. Be the first to attempt this challenge!</p>
          </div>
        )}
      </section>
    </section>
  );
};

const ContentSideBar = ({
  userStarted,
  isActive,
  challenge,
  challengeModules,
}: {
  userStarted: boolean;
  isActive: boolean;
  challenge: Course;
  challengeModules: Course[];
}) => {
  return (
    <div className={`bg-white text-black h-full min-w-[266px] px-5 py-8 border-r border-r-grey-accent flex-col ${userStarted ? "flex-1" : "hidden"}`}>
      <div className='py-2 border-b border-b-grey-accent'>
        <p className='text-black text-xl leading-[30px] font-semibold capitalize'>{challenge.title}</p>
        <p className='text-xs leading-[18px] text-grey-secondary-text line-clamp-2'>{challenge.description}</p>
      </div>

      <div className='pt-3 flex flex-col gap-3 flex-1'>
        <section className='flex gap-2 items-center p-3'>
          <RoundedCheckIcon className='h-6 w-6' fill='#28A745' />
          <p className='text-sm leading-[22px] text-grey-tertiary-text'>Introductions</p>
        </section>

        {challengeModules.map((module, index) => (
          <ContentListItem isActive={isActive} text={`${index + 1}`} key={module.url} url={module.url} />
        ))}
      </div>
    </div>
  );
};

const StagesContentSection = ({
  isLoading,
  challenge,
  attempts,
  attemptsLoading,
  period,
  setPeriod,
  repoDetails,
}: {
  isLoading: boolean;
  challenge: Course;
  attempts: ChallengeAttempt[];
  attemptsLoading: boolean;
  period: ChallengePeriod;
  setPeriod: React.Dispatch<React.SetStateAction<ChallengePeriod>>;
  repoDetails: Repository;
}) => {
  const currentStep = repoDetails?.progress?.progress_details.current_step;
  const challengeModules = challenge.body;
  console.log({ currentStep, challengeModules });
  return (
    <div className='flex flex-col p-6 pb-6 w-full'>
      <NavigationBlock />
      <div className='flex justify-between pt-4 pb-6'>
        <section className='flex flex-col gap-1'>
          <p className='text-black text-2xl leading-[36px]'>{challenge.title}</p>
          <p className='text-grey-secondary-text font-light'>{challenge.action}</p>
        </section>
      </div>

      {/* body section */}
      <div className='flex justify-between w-full h-full flex-1 gap-6 overflow-scroll'>
        {/* left */}
        <section className={`flex flex-col overflow-scroll rounded-b-lg `}>
          <MDXLayoutRenderer code={challenge.body.code} components={mdxComponents} repo_url={"http"} />
          {
            // Todo: buttons to be moveed below content box
            <div className='flex flex-col w-full items-center justify-center rounded-b-lg '>
              <button className='py-[19px] border border-grey-accent w-full bg-grey-card-border'>Listening for Git push...</button>
              <button className='py-[19px] border border-grey-accent w-full bg-grey-bottom-card text-grey-bottom-card-text flex items-center gap-2 justify-center'>
                Continue to next stage
                <CaretRightIcon className='w-6 h-6' />
              </button>
            </div>
          }
        </section>

        <AttemptsBoard attempts={attempts} attemptsLoading={attemptsLoading} period={period} setPeriod={setPeriod} />
      </div>
    </div>
  );
};

export default NestedChallenges;
