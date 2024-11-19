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

type ChallengeMode = "functional_test" | "project";
type ChallengeDifficulty = "easy" | "medium" | "hard";
type Status = "NotStarted" | "InProgress" | "Completed";

export type {
  Challenge,
  ChallengeMode,
  ChallengeDifficulty,
  Repository,
  RepositoryResponse,
  Progress,
  Status,
  ChallengeWithProgress,
};
