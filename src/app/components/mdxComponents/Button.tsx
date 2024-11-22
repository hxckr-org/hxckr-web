import React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const MdxButton = ({ title, link, children }: { title: string; link: string; children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const language = searchParams.get("language");
  const proficiency = searchParams.get("proficiency");
  const frequency = searchParams.get("frequency");

  const disabled = !language || !proficiency || !frequency;

  const currentRouteArray = pathname.split("/");
  const nextModule = link.split("/").find((item, idx) => item.includes("module"));
  const clx = currentRouteArray.find((item) => item.includes("module"));
  let newLink = pathname;

  if (clx && nextModule) {
    const newLinkArray = currentRouteArray.map((item, idx) => {
      if (item === clx) {
        return nextModule;
      }
      return item;
    });
    newLink = newLinkArray.join("/") + "?" + searchParams.toString();
  }

  return (
    <div className='flex items-end justify-end w-full pb-6'>
      <Link
        href={newLink}
        className={`bg-purple-primary text-sm px-5 py-3 flex items-center gap-2 rounded-full font-normal hover:bg-purple-primary/90 text-white w-fit ${
          disabled ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        {title}
      </Link>
    </div>
  );
};

export default MdxButton;
