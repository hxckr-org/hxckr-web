// progressively build and import mdx components
import ChallengeBrief from "./ChallengeBrief";
import BonusChallenges from "./BonusChallenges";
import ChallengeStatus from "./ChallengeStatus";
import ConceptCard from "./ConceptCard";
import LearningObjectives from "./LearningObjectives";
import ResourceCard from "./ResourceCard";
import ResourceSection from "./ResourceSection";
import SecurityNote from "./SecurityNote";
import SetupSteps from "./SetupSteps";
import StudyTopics from "./StudyTopics";
import TopicCard from "./TopicCard";
import { Stages, Stage, StageTitle, StageDifficulty, StageDescription } from "./Stages";
import IntroductionCard from "./IntroductionCard";
import { Dropdown, DropdownItem } from "./Dropdown";
import Button from "./Button";

// load all mdx components
// all possible components from the every mdx file must be exported here else an error is thrown
// these are blank boilerplate for now. ChallengeBrief is the only one that is used with the children prop
export const mdxComponents = {
  BonusChallenges,
  ChallengeBrief,
  ChallengeStatus,
  ConceptCard,
  LearningObjectives,
  ResourceCard,
  ResourceSection,
  SecurityNote,
  SetupSteps,
  StudyTopics,
  TopicCard,
  Stage,
  StageDescription,
  StageDifficulty,
  StageTitle,
  Stages,
  IntroductionCard,
  Dropdown,
  DropdownItem,
  Button,
};

export const contentMdxComponents = {
  IntroductionCard,
  Dropdown,
  DropdownItem,
  ChallengeBrief,
};
