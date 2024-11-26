"use client";

import { useEffect } from "react";
import { useAuthenticatedWebSocket } from "@/hooks/useAuthenticatedSocket";
import { EventType } from "@/types";
import { useStore } from "@/contexts/store";
import { CheckCircledIcon } from "@radix-ui/react-icons";

export const GitPushText = ({
  content,
  moduleNumber,
}: {
  content: string;
  moduleNumber: number;
}) => {
  const { messages, isConnected } = useAuthenticatedWebSocket();
  const { websocketEvents, addWebsocketEvent, allRepositories } = useStore();

  const currentPushEvent = websocketEvents?.pushEvents?.[moduleNumber];

  const currentRepo = currentPushEvent 
    ? allRepositories.find((repo) => repo.soft_serve_url === currentPushEvent.repoUrl)
    : null;

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

  const isRelevantPushEvent = Boolean(currentRepo && currentPushEvent);

  return (
    <div className="flex flex-col items-center justify-center pb-3 bg-grey-card-border font-normal">
      {isConnected && isRelevantPushEvent ? (
        <div className="mt-4">
          <p className="flex items-center gap-x-2 text-sm font-normal text-green-primary">
            <CheckCircledIcon className="w-5 h-5 text-green-primary" />
            Success... new push detected on branch {currentPushEvent?.branch} (
            {currentPushEvent?.commitSha.slice(0, 7)})
          </p>
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-base text-grey-tertiary-text animate-pulse">
            {content}
          </p>
        </div>
      )}
    </div>
  );
};
