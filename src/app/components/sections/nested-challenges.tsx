"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { useGetUserRepositories } from "@/hooks/useGetRepo";
import { PadlockIcon } from "@/public/assets/icons/padlock";
import { RoundedCheckIcon } from "@/public/assets/icons/rounded-check-icon";
import { ChallengeWithProgress, Repository, Status } from "@/types";
import { ArrowLeftIcon, ArrowRightIcon, CaretRightIcon, Cross1Icon } from "@radix-ui/react-icons";

import { Course } from "../../../../.contentlayer/generated/types";
import { LoadingSpinner } from "../primitives/loading-spinner";
import { mdxComponents } from "../mdxComponents";
import { MDXLayoutRenderer } from "pliny/mdx-components.js";
import Button from "../primitives/button";

const NestedChallanges = ({ challenge, challengeModules }: { challenge: Course; challengeModules: Course[] }) => {
  const [isActive, setIsActive] = useState(false);
  const [challengeDetails, setChallengeDetails] = useState<ChallengeWithProgress>({} as ChallengeWithProgress);

  const router = useRouter();
  const searchParams = useSearchParams();
  const repo_id = searchParams.get("rid") || challengeDetails.repository_id;

  useEffect(() => {
    const storedChallenge = localStorage.getItem("challenge");
    if (storedChallenge) {
      setChallengeDetails(JSON.parse(storedChallenge));
    }
  }, []);

  const { data: repo, isLoading, error } = useGetUserRepositories({ id: repo_id });

  const repoDetails = repo as Repository;
  const hasStarted =
    repoDetails?.progress?.status === Status.InProgress ||
    repoDetails?.progress?.status === Status.Completed ||
    repoDetails?.progress?.progress_details.current_step > 0;

  return (
    <div className='flex h-full'>
      <div
        className={`bg-white text-black h-full w-screen max-w-[266px] px-5 py-8 border-r border-r-grey-accent flex-col ${
          hasStarted ? "flex-1" : "hidden"
        }`}
      >
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

      {/* content */}
      <div className={`flex flex-col gap-3 p-8 pb-6 ${hasStarted ? "hidden" : "flex-1"}`}>
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
                <p className='text-black text-2xl leading-[36px]'>{challenge.title}</p>
                <p className='text-grey-secondary-text font-light'>{challenge.description}</p>
              </section>

              <button className='text-base font-medium text-white bg-purple-primary rounded-full px-5 flex items-center gap-1'>
                <p>Start Challenge</p>
                <CaretRightIcon className='w-6 h-6' />
              </button>
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
            <section className='border-[1.5px] border-grey-accent bg-white w-full rounded-lg p-5 overflow-scroll'>
              <MDXLayoutRenderer code={challenge.body.code} components={mdxComponents} />
            </section>

            {/* right */}
            <section className='border-[1.5px] border-grey-accent bg-white w-full max-w-[30%] rounded-lg'>
              <section className='flex justify-between items-center p-5 bg-grey-card-border rounded-t-lg'>
                <p className=' text-xl text-[#000000] font-semibold'>Recent Attempts</p>
                <div className='w-[99px] h-12 bg-white rounded'></div>
              </section>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentListItem = ({ isActive, text, url }: { isActive: boolean; text: string; url: string }) => {
  return (
    <Link href={`/${url}`} className={`${isActive ? "border border-purple-secondary bg-purple-quaternary" : ""} flex gap-2 items-center p-3 rounded`}>
      {isActive ? <ArrowRightIcon className='h-5 w-5 text-purple-primary' /> : <PadlockIcon />}
      <p className={`${isActive ? "text-purple-primary font-medium" : "text-grey-secondary-text font-normal"} text-sm leading-[22px]  line-clamp-1`}>
        Stage {text}
      </p>
    </Link>
  );
};

const NavigationBlock = () => {
  return (
    <div className='flex justify-between'>
      <section className='flex items-center border border-grey-accent rounded bg-white'>
        <button className='flex items-center gap-1 p-3 px-2.5'>
          <ArrowLeftIcon className='w-6 h-6 text-grey-footer-text' />
          <p className='text-grey-footer-text'>Back</p>
        </button>
        <div className='border-r h-full border-r-grey-accent'></div>
        <button className='flex items-center gap-1 p-3 px-2.5'>
          <p className='text-purple-primary'>Next</p>
          <ArrowRightIcon className='w-6 h-6 text-purple-primary' />
        </button>
      </section>

      <button className='border border-grey-accent rounded p-3'>
        <Cross1Icon className='w-6 h-6' />
      </button>
    </div>
  );
};

export default NestedChallanges;
