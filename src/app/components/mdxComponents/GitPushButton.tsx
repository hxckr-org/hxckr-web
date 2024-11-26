"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { useStore } from "@/contexts/store";
import { ChevronRightIcon } from "@/public/assets/icons";

export const GitPushButton = ({
  title,
  link,
  moduleNumber,
}: {
  title: string;
  link: string;
  moduleNumber: number;
}) => {
  const { websocketEvents, allRepositories } = useStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rid = searchParams.get("rid");
  const started = searchParams.get("started");

  const newPathname = pathname.replace("/module-2/instructions", link);
  const newUrl = newPathname + `?rid=${rid}&started=${started}`;

  const currentPushEvent = websocketEvents?.pushEvents?.[moduleNumber];
  
  const currentRepo = currentPushEvent 
    ? allRepositories.find((repo) => repo.soft_serve_url === currentPushEvent.repoUrl)
    : null;

  const hasPushEvent = Boolean(currentRepo && currentPushEvent);

  return (
    <Link
      href={newUrl}
      className={`flex items-center justify-center bg-purple-primary text-white py-4 text-base rounded-none text-center ${
        !hasPushEvent ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {title}
      <ChevronRightIcon className="w-4 h-4" />
    </Link>
  );
};
