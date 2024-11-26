import { Link2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

const ResourceCard = ({ title, links }: { title: string; links: Array<{ text: string; url: string }> }) => {
  return (
    <div className='p-5 rounded-lg border border-gray-200 bg-white shadow-sm'>
      <p className='text-sm font-medium'>{title}</p>
      <ul className='py-2 text-sm leading-[24px] tracking-[8%] font- rounded-b-lg list-disc'>
        {links.map((link, idx) => (
          <li className='text-purple-primary flex items-center gap-2' key={idx}>
            <Link2Icon className='text-purple-primary' />
            <Link href={link.url} target='_blank'>
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceCard;

