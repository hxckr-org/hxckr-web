"use client";

import { create } from "zustand";

import { getLocalStorage } from "@/helpers";
import {
  ChallengeWithProgress,
  Repository,
  PushEvent,
  TestEvent,
  EventType,
} from "@/types";

interface WebSocketEvents {
  pushEvents: Record<string, PushEvent>;
  testEvents: Record<string, TestEvent[]>;
}

interface StoreState {
  userChallenge: ChallengeWithProgress | null;
  allRepositories: Repository[];
  websocketEvents: WebSocketEvents;
  setUserChallenge: (challenge: ChallengeWithProgress | null) => void;
  addRepository: (repo: Repository) => void;
  addWebsocketEvent: (
    event: PushEvent | TestEvent,
    moduleNumber: number
  ) => void;
  clearWebsocketEvents: () => void;
  clearUserChallenge: () => void;
  clearAllRepositories: () => void;
  clearTestEventsForModule: (moduleNumber: number) => void;
}

export const useStore = create<StoreState>((set) => ({
  userChallenge: JSON.parse(getLocalStorage("userChallenge", "null")),
  allRepositories: JSON.parse(getLocalStorage("allRepositories", "[]")),
  websocketEvents: JSON.parse(
    getLocalStorage(
      "websocketEvents",
      JSON.stringify({
        pushEvents: {},
        testEvents: {},
      })
    )
  ),

  setUserChallenge: (challenge) =>
    set(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "userChallenge",
          JSON.stringify(challenge) || "null"
        );
      }
      return { userChallenge: challenge };
    }),

  clearUserChallenge: () =>
    set(() => {
      localStorage.removeItem("userChallenge");
      return { userChallenge: null };
    }),

  clearAllRepositories: () =>
    set(() => {
      localStorage.removeItem("allRepositories");
      return { allRepositories: [] };
    }),

  addRepository: (repo) =>
    set((state) => {
      if (typeof window !== "undefined") {
        const existingRepos = JSON.parse(
          localStorage.getItem("allRepositories") || "[]"
        );
        if (
          !existingRepos.some(
            (existingRepo: Repository) => existingRepo?.id === repo?.id
          )
        ) {
          const newRepos = [...existingRepos, repo];
          localStorage.setItem("allRepositories", JSON.stringify(newRepos));
          return { allRepositories: newRepos };
        }
      }
      return state;
    }),

  addWebsocketEvent: (event, moduleNumber) =>
    set((state) => {
      try {
        const newState: WebSocketEvents = {
          pushEvents: { ...state.websocketEvents.pushEvents },
          testEvents: { ...state.websocketEvents.testEvents },
        };

        if (event.event_type === EventType.Push) {
          newState.pushEvents[moduleNumber] = event as PushEvent;
        } else if (event.event_type === EventType.Test) {
          if (!newState.testEvents[moduleNumber]) {
            newState.testEvents[moduleNumber] = [];
          }
          newState.testEvents[moduleNumber] = [event as TestEvent];
        }

        if (typeof window !== "undefined") {
          localStorage.setItem("websocketEvents", JSON.stringify(newState));
        }

        return { websocketEvents: newState };
      } catch (error) {
        console.error("Error in addWebsocketEvent:", error);
        return state;
      }
    }),

  clearWebsocketEvents: () =>
    set(() => {
      const emptyEvents = { pushEvents: {}, testEvents: {} };
      if (typeof window !== "undefined") {
        localStorage.setItem("websocketEvents", JSON.stringify(emptyEvents));
      }
      return { websocketEvents: emptyEvents };
    }),

  clearTestEventsForModule: (moduleNumber) =>
    set((state) => {
      try {
        const newState = {
          pushEvents: { ...state.websocketEvents.pushEvents },
          testEvents: { ...state.websocketEvents.testEvents },
        };

        delete newState.testEvents[moduleNumber];

        if (typeof window !== "undefined") {
          try {
            localStorage.setItem("websocketEvents", JSON.stringify(newState));
            console.log("Cleared test events for module:", moduleNumber);
          } catch (error) {
            console.error("Error saving to localStorage:", error);
          }
        }

        return { websocketEvents: newState };
      } catch (error) {
        console.error("Error in clearTestEventsForModule:", error);
        return state;
      }
    }),
}));
