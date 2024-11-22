import React from "react";

const ChallengeBrief = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='font-p22mackinac italic font-medium text-base capitalize w-fit'>{title}</h2>
      <div className='text-sm leading-[26px] font-light text-grey-secondary-text'>{children}</div>
    </div>
  );
};

export default ChallengeBrief;
