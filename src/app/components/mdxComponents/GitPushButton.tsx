"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useStore } from "@/contexts/store";
import { ChevronRightIcon } from "@/public/assets/icons";
import Button from "@/app/components/primitives/button";
import { useEffect, useState } from "react";

export const GitPushButton = ({
  title,
  link,
  moduleNumber,
}: {
  title: string;
  link: string;
  moduleNumber: number;
}) => {
  const router = useRouter();
  const { websocketEvents, allRepositories } = useStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rid = searchParams.get("rid");
  const started = searchParams.get("started");

  const newPathname = pathname.replace("/module-2/instructions", link);
  const newUrl = newPathname + `?rid=${rid}&started=${started}`;

  const [hasPushEvent, setHasPushEvent] = useState(false);

  useEffect(() => {
    const currentPushEvent = websocketEvents?.pushEvents?.[moduleNumber];

    const currentRepo = currentPushEvent
      ? allRepositories.find(
          (repo) => repo.soft_serve_url === currentPushEvent.repoUrl
        )
      : null;

    const hasPushEvent =
      typeof window === "undefined"
        ? false
        : Boolean(currentRepo && currentPushEvent);

    setHasPushEvent(hasPushEvent);
  }, [moduleNumber]);

  return (
    <Button
      onClick={() => {
        if (hasPushEvent) {
          router.push(newUrl);
        }
      }}
      className={`flex items-center justify-center bg-purple-primary text-white py-4 text-base rounded-none text-center ${
        !hasPushEvent && "opacity-50 cursor-not-allowed"
      }`}
    >
      {title}
      <ChevronRightIcon className="w-4 h-4" />
    </Button>
  );
};
