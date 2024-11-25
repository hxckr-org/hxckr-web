"use client";

import { create } from "zustand";

import { getLocalStorage } from "@/helpers";
import { ChallengeWithProgress, Repository } from "@/types";

interface StoreState {
  userChallenge: ChallengeWithProgress | null;
  allRepositories: Repository[];
  setUserChallenge: (challenge: ChallengeWithProgress | null) => void;
  addRepository: (repo: Repository) => void;
}

export const useStore = create<StoreState>((set) => ({
  userChallenge: JSON.parse(getLocalStorage("userChallenge", "null")),
  allRepositories: JSON.parse(getLocalStorage("allRepositories", "[]")),
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
  addRepository: (repo) =>
    set((state) => {
      if (typeof window !== "undefined") {
        const existingRepos = JSON.parse(
          localStorage.getItem("allRepositories") || "[]"
        );
        // Check if repo already exists
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
}));
