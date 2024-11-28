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
  updateRepositoryProgress: ({
    challengeId,
    currentStep,
    status,
  }: {
    challengeId: string;
    currentStep: number;
    status: string;
  }) => void;
  updateChallengeProgress: ({
    challengeId,
    currentStep,
    status,
  }: {
    challengeId: string;
    currentStep: number;
    status: string;
  }) => void;
  addRepositories: (repos: Repository[]) => void;
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

        const repoExists = existingRepos.some(
          (existingRepo: Repository) => existingRepo?.id === repo?.id
        );

        if (!repoExists) {
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

  updateRepositoryProgress: ({
    challengeId,
    currentStep,
    status,
  }: {
    challengeId: string;
    currentStep: number;
    status: string;
  }) =>
    set((state) => {
      console.log({ challengeId, currentStep, status });
      const updatedRepositories = state.allRepositories.map((repo) => {
        console.log({ repo });
        return repo.challenge_id === challengeId
          ? {
              ...repo,
              progress: {
                ...repo.progress,
                progress_details: {
                  current_step: currentStep,
                },
                status: status,
              },
            }
          : repo;
      });

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "allRepositories",
          JSON.stringify(updatedRepositories)
        );
      }

      return { allRepositories: updatedRepositories };
    }),

  updateChallengeProgress: ({
    challengeId,
    currentStep,
    status,
  }: {
    challengeId: string;
    currentStep: number;
    status: string;
  }) =>
    set((state) => {
      if (!state.userChallenge || state.userChallenge.id !== challengeId) {
        return state;
      }

      const newCompletionPercentage = Math.round(
        (currentStep / state.userChallenge.module_count) * 100
      );
      const updatedChallenge = {
        ...state.userChallenge,
        progress: {
          ...state.userChallenge.progress,
          current_step: currentStep,
          status: status,
          completion_percentage: newCompletionPercentage,
        },
      };

      if (typeof window !== "undefined") {
        localStorage.setItem("userChallenge", JSON.stringify(updatedChallenge));
      }

      return { userChallenge: updatedChallenge };
    }),

  addRepositories: (repos) =>
    set((state) => {
      if (typeof window === "undefined") return state;

      const existingRepos = state.allRepositories;
      const reposMap = new Map(existingRepos.map((repo) => [repo.id, repo]));

      repos.forEach((repo) => {
        reposMap.set(repo.id, repo);
      });

      const updatedRepos = Array.from(reposMap.values());
      localStorage.setItem("allRepositories", JSON.stringify(updatedRepos));

      return { allRepositories: updatedRepos };
    }),
}));
