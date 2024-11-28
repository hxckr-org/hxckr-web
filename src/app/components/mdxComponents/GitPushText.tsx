"use client";

import { useEffect, useState } from "react";
import { useAuthenticatedWebSocket } from "@/hooks/useAuthenticatedSocket";
import { EventType } from "@/types";
import { useStore } from "@/contexts/store";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { getChallengeDocument, sluggify } from "@/helpers";
import { usePathname } from "next/navigation";

export const GitPushText = ({
  content,
  moduleNumber,
}: {
  content: string;
  moduleNumber: number;
}) => {
  const pathname = usePathname();
  const { messages, isConnected } = useAuthenticatedWebSocket();
  const { websocketEvents, addWebsocketEvent, allRepositories } = useStore();
  const [displayText, setDisplayText] = useState(content);

  const currentPushEvent = websocketEvents?.pushEvents?.[moduleNumber];

  const challengeUrl = pathname.split("/challenges")[1];
  const document = getChallengeDocument({ url: challengeUrl });

  const currentRepo = allRepositories.find(
    (repo) =>
      repo.soft_serve_url === currentPushEvent?.repoUrl ||
      sluggify(repo?.challenge.title) === sluggify(document?.title || "")
  );
  const currentStep = currentRepo?.progress.progress_details.current_step || 0;

  useEffect(() => {
    if (currentPushEvent) {
      setDisplayText(
        `Success... new push detected on branch ${
          currentPushEvent?.branch
        } (${currentPushEvent?.commitSha.slice(0, 7)})`
      );
    } else if (
      !currentPushEvent &&
      currentRepo?.progress.progress_details.current_step &&
      currentRepo?.progress.progress_details.current_step > moduleNumber
    ) {
      setDisplayText(`Success... git repository created and cloned`);
    } else {
      setDisplayText(content);
    }
  }, [currentPushEvent, currentRepo, moduleNumber, content]);

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      try {
        const eventData = JSON.parse(lastMessage.data);
        if (eventData.event_type === EventType.Push) {
          addWebsocketEvent(eventData, moduleNumber);
        }
      } catch (error) {
        console.error("Error parsing websocket message:", error);
      }
    }
  }, [messages, addWebsocketEvent, moduleNumber]);

  return (
    <div className="flex flex-col items-center justify-center pb-3 bg-grey-card-border font-normal">
      <div className="mt-4">
        <p
          className={`text-sm ${
            isConnected && (currentPushEvent || currentStep > moduleNumber)
              ? "flex items-center gap-x-2 text-green-primary"
              : "text-grey-tertiary-text animate-pulse"
          }`}
        >
          {isConnected && (currentPushEvent || currentStep > moduleNumber) && (
            <CheckCircledIcon className="w-5 h-5 text-green-primary" />
          )}
          {displayText}
        </p>
      </div>
    </div>
  );
};
