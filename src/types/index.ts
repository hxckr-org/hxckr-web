type Challenge = {
  id: string;
  title: string;
  description: string;
  repo_urls: Record<string, string>;
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
  language: string;
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
  language: string;
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

const EventType = {
  Push: "push",
  Test: "test",
} as const;

type PushEvent = {
  event_type: (typeof EventType)[keyof typeof EventType];
  repoUrl: string;
  branch: string;
  commitSha: string;
};

type TestEventProgress = {
  id: string;
  user_id: string;
  challenge_id: string;
  status: "completed" | "in_progress" | "not_started";
  progress_details: {
    current_step: number;
  };
  created_at: string;
  updated_at: string;
};

type TestEvent = {
  event_type: (typeof EventType)[keyof typeof EventType];
  commitSha: string;
  repoUrl: string;
  success: boolean;
  output: string;
  progress?: TestEventProgress;
};

type ChallengeMode = "functional_test" | "project";
type ChallengeDifficulty = "easy" | "medium" | "hard";
type ChallengeStatus = (typeof Status)[keyof typeof Status];
type ChallengePeriod = (typeof Period)[keyof typeof Period];

interface WebSocketEvents {
  pushEvents: Record<string, PushEvent>;
  testEvents: Record<string, TestEvent[]>;
}

type Leaderboard = {
  id: number;
  user_id: string;
  score: number;
  expected_total_score: number;
  github_username: string;
  completed_challenge_count: number;
  created_at: string;
  updated_at: string;
};

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
  PushEvent,
  TestEvent,
  TestEventProgress,
  WebSocketEvents,
  Leaderboard,
};

export { Status, Period, EventType };
