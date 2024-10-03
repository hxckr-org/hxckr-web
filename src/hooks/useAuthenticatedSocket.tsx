"use client";

import { useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useSession } from "next-auth/react";
import { websocketUrl } from "@/config/process";

export function useAuthenticatedWebSocket() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated" && !!session?.accessToken;
  const urlWithToken = isAuthenticated
    ? `${websocketUrl}?token=${session?.accessToken}`
    : null;

  const [messages, setMessages] = useState<MessageEvent<any>[]>([]);

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
      setMessages((prev) => [...prev, lastMessage]);
    }
  }, [lastMessage]);

  return {
    isConnected,
    messages,
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
