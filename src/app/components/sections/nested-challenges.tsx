"use client";

import React, { useState } from "react";
import { PadlockIcon } from "@/public/assets/icons/padlock";
import { RoundedCheckIcon } from "@/public/assets/icons/rounded-check-icon";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { DoubleChevronLeft } from "@/public/assets/icons";
import { Course } from "../../../../.contentlayer/generated/types";
import Link from "next/link";

const NestedChallanges = ({
  data,
  title,
  challenge,
  challengeModules,
}: {
  data: any;
  title: string;
  challenge: Course;
  challengeModules: Course[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const stage = () => {
    const data = challengeModules;
  };

  return (
    <main className='bg-white text-black h-screen w-screen max-w-[266px] px-5 py-8 border-r border-r-grey-accent flex flex-col'>
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

      <div>
        <section className='relative py-4 px-3 border-t border-t-grey-accent'>
          <button onClick={() => setIsOpen(!isOpen)} className='flex gap-2'>
            <span className='hidden lg:block p-1.5 rounded-full border border-grey-button-border bg-white'>
              <DoubleChevronLeft className={`w-[10px] h-[10px] rotate-180`} />
            </span>
            <p className='text-base font-medium text-black'>collaspe</p>
          </button>
        </section>
      </div>
    </main>
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

export default NestedChallanges;
