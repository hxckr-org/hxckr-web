"use client";

import { create } from "zustand";

import { getLocalStorage } from "@/helpers";
import {
  ChallengeWithProgress,
  Repository,
  PushEvent,
  TestEvent,
} from "@/types";

interface WebSocketEvents {
  pushEvents: PushEvent[];
  testEvents: TestEvent[];
}

interface StoreState {
  userChallenge: ChallengeWithProgress | null;
  allRepositories: Repository[];
  websocketEvents: WebSocketEvents;
  setUserChallenge: (challenge: ChallengeWithProgress | null) => void;
  addRepository: (repo: Repository) => void;
  addWebsocketEvent: (event: PushEvent | TestEvent) => void;
  clearWebsocketEvents: () => void;
  clearUserChallenge: () => void;
  clearAllRepositories: () => void;
}

export const useStore = create<StoreState>((set) => ({
  userChallenge: JSON.parse(getLocalStorage("userChallenge", "null")),
  allRepositories: JSON.parse(getLocalStorage("allRepositories", "[]")),
  websocketEvents: JSON.parse(
    getLocalStorage(
      "websocketEvents",
      JSON.stringify({
        pushEvents: [],
        testEvents: [],
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

  addWebsocketEvent: (event) =>
    set((state) => {
      const newState = { ...state.websocketEvents };

      if (event.event_type === "push") {
        newState.pushEvents = [...newState.pushEvents, event as PushEvent];
      } else if (event.event_type === "test") {
        newState.testEvents = [...newState.testEvents, event as TestEvent];
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("websocketEvents", JSON.stringify(newState));
      }

      return { websocketEvents: newState };
    }),

  clearWebsocketEvents: () =>
    set(() => {
      const emptyEvents = { pushEvents: [], testEvents: [] };
      if (typeof window !== "undefined") {
        localStorage.setItem("websocketEvents", JSON.stringify(emptyEvents));
      }
      return { websocketEvents: emptyEvents };
    }),
}));
