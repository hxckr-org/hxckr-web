type Challenge = {
  id: string;
  title: string;
  description: string;
  repo_url: string;
  difficulty: string;
  module_count: number;
  mode: ChallengeMode;
  created_at: string;
  updated_at: string;
};

type ChallengeWithProgress = Challenge & {
  progress: {
    status: string;
    current_step: number;
    completion_percentage: number;
  };
  repository: Pick<Repository, "id" | "repo_url" | "soft_serve_url">;
};

type Progress = {
  id: string;
  status: string;
  progress_details: {
    current_step: number;
  };
  created_at: string;
  updated_at: string;
};

type Repository = {
  id: string;
  user_id: string;
  challenge_id: string;
  repo_url: string;
  soft_serve_url: string;
  created_at: string;
  updated_at: string;
  challenge: Omit<Challenge, "id">;
  progress: Progress;
};

type RepositoryResponse = {
  data: Repository[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
};

type CreateRepoResponse = {
  repo_name: string;
  repo_url: string;
  id: string;
};

type ChallengeAttempt = {
  challenge_id: string;
  username: string;
  total_score: number;
  module_count: number;
};

const Status = {
  NotStarted: "NotStarted",
  InProgress: "InProgress",
  Completed: "Completed",
} as const;

const Period = {
  Today: "Today",
  ThisWeek: "ThisWeek",
  ThisMonth: "ThisMonth",
  AllTime: "AllTime",
} as const;

type ChallengeMode = "functional_test" | "project";
type ChallengeDifficulty = "easy" | "medium" | "hard";
type ChallengeStatus = (typeof Status)[keyof typeof Status];
type ChallengePeriod = (typeof Period)[keyof typeof Period];

export type {
  Challenge,
  ChallengeMode,
  ChallengeDifficulty,
  Repository,
  RepositoryResponse,
  Progress,
  ChallengeStatus,
  ChallengeWithProgress,
  CreateRepoResponse,
  ChallengePeriod,
  ChallengeAttempt,
};

export { Status, Period };
