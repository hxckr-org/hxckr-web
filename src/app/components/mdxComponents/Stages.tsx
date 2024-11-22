"use client";

import { StarIcon } from "@/public/assets/icons/star";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import React from "react";

const Stages = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='pt-[34px]'>
      <div className='flex items-center justify-center w-full gap-2 pb-2'>
        <span className='border-[0.5px] border-grey-accent w-full'></span>
        <p className='text-sm leading-[22px] tracking-[16%] font-medium text-purple-primary'>STAGES</p>
        <span className='border-[0.5px] border-grey-accent w-full'></span>
      </div>
      <div className='flex flex-col gap-2'>{children}</div>
    </div>
  );
};

const Stage = ({
  status,
  title,
  isExpandable,
  difficulty,
  children,
}: {
  status: string;
  title: string;
  isExpandable: boolean;
  difficulty: string | keyof typeof DIFFICULTY_LEVEL;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = React.useState(false);

  const DIFFICULTY_LEVEL: Record<string, string> = {
    "Very Easy": "#66CDAA",
    Easy: "#A2D149",
    Medium: "#FFC107",
    Hard: "#FF8C00",
    "Very Hard": "#FF3B30",
  };

  return (
    <button
      className='w-full flex flex-col gap-1 py-3 px-5 border-y border-y-transparent hover:bg-grey-button-text hover:border-y hover:border-y-grey-accent'
      onClick={() => setOpen(!open)}
    >
      <div className='flex items-center justify-between w-full'>
        <section className='flex items-center gap-2'>
          <ArrowRightIcon className='text-purple-primary w-6 h-6' />

          <p className='text-base font-normal text-black'>{title}</p>
        </section>

        <section className='flex items-center gap-2'>
          <p>{difficulty}</p>
          <StarIcon fill={DIFFICULTY_LEVEL[difficulty]} />
        </section>
      </div>

      {open && <div className='text-sm font-light'>{children}</div>}
    </button>
  );
};

const StageTitle = ({ children }: { children: React.ReactNode }) => {
  return <h3 className='font-bold text-lg text-gray-900'>{children}</h3>;
};

const StageDifficulty = ({ level, children }: { level: string; children: React.ReactNode }) => {
  const difficultyColors = {
    "very-easy": "text-green-500",
    easy: "text-light-green-500",
    intermediate: "text-orange-500",
    hard: "text-red-500",
    "very-hard": "text-dark-red-500",
  };

  return <div className={`ml-auto text-sm font-semibold ${difficultyColors[level as keyof typeof difficultyColors]}`}>{children}</div>;
};

const StageDescription = ({ children }: { children: React.ReactNode }) => {
  return <section className='text-gray-600 mt-1 border-2 border-red-600'>{children}</section>;
};

export { Stages, Stage, StageTitle, StageDifficulty, StageDescription };
