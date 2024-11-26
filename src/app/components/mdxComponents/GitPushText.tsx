"use client";

import { useEffect } from "react";
import { useAuthenticatedWebSocket } from "@/hooks/useAuthenticatedSocket";
import { EventType } from "@/types";
import { useStore } from "@/contexts/store";
import { CheckCircledIcon } from "@radix-ui/react-icons";

export const GitPushText = ({ content }: { content: string }) => {
  const { messages, isConnected } = useAuthenticatedWebSocket();
  const { websocketEvents, addWebsocketEvent, allRepositories } = useStore();

  const currentRepo = allRepositories.find((repo) => {
    const pushEvents = websocketEvents.pushEvents.filter((event) => {
      return event.repoUrl === repo.soft_serve_url;
    });
    return pushEvents.length > 0;
  });

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      try {
        const eventData = JSON.parse(lastMessage.data);
        if (eventData.event_type === EventType.Push) {
          addWebsocketEvent(eventData);
        }
      } catch (error) {
        console.error("Error parsing websocket message:", error);
      }
    }
  }, [messages, addWebsocketEvent]);

  const relevantPushEvents = websocketEvents.pushEvents.filter(
    (event) => event.repoUrl === currentRepo?.soft_serve_url
  );
  return (
    <div className="flex flex-col items-center justify-center pb-3 bg-grey-card-border font-normal">
      {isConnected && relevantPushEvents.length > 0 ? (
        <div className="mt-4">
          {relevantPushEvents.map((event, index) => (
            <p
              className="flex items-center gap-x-2 text-sm font-normal text-green-primary"
              key={`${event.commitSha}-${index}`}
            >
              <CheckCircledIcon className="w-5 h-5 text-green-primary" />
              Success... new push detected on branch {event.branch} (
              {event.commitSha.slice(0, 7)})
            </p>
          ))}
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
