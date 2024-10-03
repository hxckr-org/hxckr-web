"use client";

import React from "react";
import { useAuthenticatedWebSocket } from "@/hooks/useAuthenticatedSocket";

export default function TestSocket() {
  const { isConnected, messages, sendMessage, connectionStatus } =
    useAuthenticatedWebSocket();

  // temp function to send a test message
  const handleClickSendMessage = () => {
    if (isConnected) {
      sendMessage("Hello");
    }
  };
  return (
    <div>
      <button onClick={handleClickSendMessage} disabled={!isConnected}>
        Click Me to send &apos;Hello&apos;
      </button>
      <p>The WebSocket is currently {connectionStatus}</p>
      {messages.map((message, idx) => (
        <span key={idx}>{message ? message.data : null}</span>
      ))}
    </div>
  );
}
