"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { useStore } from "@/contexts/store";
import { ChevronRightIcon } from "@/public/assets/icons";

export const GitPushButton = ({
  title,
  link,
}: {
  title: string;
  link: string;
}) => {
  const { websocketEvents, allRepositories } = useStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rid = searchParams.get("rid");
  const started = searchParams.get("started");

  const newPathname = pathname.replace("/module-2/instructions", link);
  const newUrl = newPathname + `?rid=${rid}&started=${started}`;

  const currentRepo = allRepositories.find((repo) => {
    const pushEvents = websocketEvents.pushEvents.filter(
      (event) => event.repoUrl === repo.soft_serve_url
    );
    return pushEvents.length > 0;
  });
  const hasPushEvent = currentRepo ? true : false;

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
