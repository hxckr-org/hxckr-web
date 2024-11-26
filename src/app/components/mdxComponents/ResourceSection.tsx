import { CubeIcon, PlusIcon } from "@radix-ui/react-icons";
import React from "react";

const ResourceSection = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className='p-5 border border-grey-accent rounded-lg'>
      <button className='w-full flex items-center justify-between' onClick={() => setOpen(!open)}>
        <section className='flex items-center justify-center gap-2'>
          <CubeIcon className='text-purple-primary' />
          <p className='text-base font-medium'>Resources</p>
        </section>
        <PlusIcon />
      </button>
      {open ? <div className='grid gap-4 md:grid-cols-2 pt-4'>{children}</div> : null}
    </div>
  );
};

export default ResourceSection;
