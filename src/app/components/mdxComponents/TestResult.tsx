import EyeIcon from "@/public/assets/icons/eye-icon";
import React from "react";

const TestResult = ({ title, status, children }: { title: string; status: string; children: React.ReactNode }) => {
  const statusStateColors: Record<string, string> = {
    success: `text-[#28A745] bg-[#EFFBF1] border-[#CEF3D4]`,
    "not started": `text-[#F97216] bg-[#FEEDE1] border-[#FDDBC4]`,
    failed: `text-[#EA3546] bg-[#FDEDEE] border-[#F9C8CB]`,
  };

  const statusColors = statusStateColors[status];

  return (
    <>
      <div className='rounded-lg sticky top-3 bg-white z- shadow-sm'>
        {title && (
          <section className='py-5 z-50 px-3 bg-grey-card-border rounded-t-lg border border-b-grey-accent flex items-center gap-2'>
            <p className='text-sm font-medium'>{title}:</p>
            <p className={`font-medium border rounded-full w-fit py-1 px-2 text-xs capitalize leading-[14.52px] ${statusColors}`}>{status}</p>
          </section>
        )}
        <div className='absolute top-[-36px] right-0 left-[-48px] h-10 bg-white w-screen -z-10'></div>
        <section className='flex flex-col gap-3 p-3 border border-grey-accent rounded-b-lg border-t-0'>
          <div className='bg-white text-sm leading-[24px] tracking-[8%] font-mediu font-light rounded-b-lg'>{children}</div>
          <button className='flex items-center gap-2 py-3 px-4 rounded-full bg-[#EDEBFF] border border-purple-secondary w-fit'>
            <EyeIcon />
            <p className='text-xs font-medium text-purple-primary leading-[18px] tracking-[-2%]'>View Instructions</p>
          </button>
        </section>
      </div>
    </>
  );
};

export default TestResult;
