import { FileTextIcon } from "@radix-ui/react-icons";
import React from "react";

const SetupSteps = ({ children }: { children: React.ReactNode }) => {
  const childrenToArray = React.Children.toArray(children);

  return (
    <div>
      <div className='border border-grey-accent rounded-lg'>
        <section className='flex items-center gap-2 p-5 pb-0'>
          <FileTextIcon className='text-purple-primary' />
          <p className='text-base font-medium'>Setup Steps</p>
        </section>
        <div className='bg-white rounded-lg'>
          <ul className='p-5 pt-4 bg-white text-sm leading-[24px] tracking-[8%] rounded-b-lg list-decimal ml-4'>
            {childrenToArray.map((step, idx) => (
              <li className='' key={idx}>
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SetupSteps;
