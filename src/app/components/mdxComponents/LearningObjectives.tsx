import React from "react";

const LearningObjectives = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const objectives = React.Children.toArray(children);

  return (
    <div className='pt-[34px] flex flex-col gap-2'>
      <p className='font-p22mackinac italic font-medium text-base capitalize w-fit'>{title}</p>

      <div className='ml-4'>
        <ul className='flex flex-col gap-2'>
          {objectives.map((item, idx) => (
            <li className='list-disc text-sm font-light' key={idx}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LearningObjectives;
