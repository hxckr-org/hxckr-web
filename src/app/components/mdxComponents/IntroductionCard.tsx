import React from "react";

const IntroductionCard = ({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="mb-8 border-[1.5px] border-grey-accent bg-white w-full rounded-lg p-5">
      <div className="flex flex-col gap-2">
        <p className="text-lg font-semibold text-black leading-[30px]">
          {title}
        </p>
        <p className="text-sm font-light leading-[26px] text-grey-secondary-text pb-2">
          {subtitle}
        </p>
      </div>
      <div className="text-sm font-light leading-[26px] text-grey-secondary-text">
        {children}
      </div>
    </div>
  );
};

export default IntroductionCard;
