import React from "react";

const ListItem = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const childrenToArray = React.Children.toArray(children);

  return (
    <div className=''>
      <p className='text-sm font-medium'>{title}</p>
      <ul className='text-sm leading-[24px] tracking-[8%] font-light rounded-b-lg p-3 px-6 list-disc marker:text-grey-footer-text'>
        {childrenToArray.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ListItem;
