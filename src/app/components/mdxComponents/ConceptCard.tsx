import React from "react";

const ConceptCard = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className='border border-grey-accent rounded-lg'>
      {title && (
        <section className='py-5 px-3 bg-grey-card-border rounded-t-lg border-b border-b-grey-accent'>
          <p className='text-sm font-medium'>{title}</p>
        </section>
      )}
      <ul className='p-3 bg-white text-sm leading-[24px] tracking-[8%] font-mediu font-light rounded-b-lg'>{children}</ul>
    </div>
  );
};

export default ConceptCard;
