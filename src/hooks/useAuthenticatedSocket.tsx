"use client";

import { useEffect, useRef, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useSession } from "next-auth/react";
import { websocketUrl } from "@/config/process";
import { useStore } from "@/contexts/store";
import { EventType, TestEvent } from "@/types";

export function useAuthenticatedWebSocket(moduleNumber: number) {
  const {
    addWebsocketEvent,
    clearTestEventsForModule,
    updateChallengeProgress,
    updateRepositoryProgress,
  } = useStore();
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && !!session?.accessToken;
  const urlWithToken = isAuthenticated
    ? `${websocketUrl}?token=${session?.accessToken}`
    : null;

  const [isTestRunning, setIsTestRunning] = useState(false);
  const [testOutput, setTestOutput] = useState("");
  const testEventRef = useRef<TestEvent | null>(null);

  const { sendMessage, lastMessage, readyState } = useWebSocket(urlWithToken, {
    reconnectAttempts: 5,
    reconnectInterval: 1000,
    shouldReconnect: () => true,
    onError: (error) => {
      console.error("WebSocket error:", error);
    },
  });

  const isConnected = readyState === ReadyState.OPEN;

  useEffect(() => {
    if (lastMessage !== null) {
      const eventData = JSON.parse(lastMessage?.data || "{}");
      // Determine if tests are running by checking if we have a push event
      // without a corresponding test event (matching commitSha)
      
      if (eventData.event_type === EventType.Push) {
        setIsTestRunning(true);
        clearTestEventsForModule(moduleNumber);
        addWebsocketEvent(eventData, moduleNumber);
      } else if (eventData.event_type === EventType.Test) {
        setIsTestRunning(false);
        const isSuccess = eventData.success;
        addWebsocketEvent(eventData, moduleNumber);
        setTestOutput(eventData.output);
        testEventRef.current = eventData;
        if (isSuccess) {
          updateRepositoryProgress({
            challengeId: eventData.progress.challenge_id,
            currentStep: eventData.progress.progress_details.current_step,
            status: eventData.progress.status,
          });
          updateChallengeProgress({
            challengeId: eventData.progress.challenge_id,
            currentStep: eventData.progress.progress_details.current_step,
            status: eventData.progress.status,
          });
        }
      }
    }
  }, [
    lastMessage,
    addWebsocketEvent,
    moduleNumber,
    clearTestEventsForModule,
    updateRepositoryProgress,
    updateChallengeProgress,
  ]);

  return {
    isConnected,
    isTestRunning,
    sendMessage,
    connectionStatus: {
      [ReadyState.CONNECTING]: "Connecting",
      [ReadyState.OPEN]: "Open",
      [ReadyState.CLOSING]: "Closing",
      [ReadyState.CLOSED]: "Closed",
      [ReadyState.UNINSTANTIATED]: "Uninstantiated",
    }[readyState],
  };
}
