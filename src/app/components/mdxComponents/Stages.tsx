// components/Stages.js
import React from "react";

const Stages = ({ children }: { children: React.ReactNode }) => {
  return <div className="bg-white shadow-md rounded-lg p-6">{children}</div>;
};

const Stage = ({
  status,
  children,
}: {
  status: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`flex items-center border-b border-gray-200 py-4 ${
        status === "in-progress" ? "bg-green-50" : ""
      }`}
    >
      <div className="flex items-center">
        {status === "in-progress" && (
          <span className="w-4 h-4 rounded-full bg-green-600 mr-4"></span>
        )}
        {status === "not-started" && (
          <span className="w-4 h-4 rounded-full bg-gray-400 mr-4"></span>
        )}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
};

const StageTitle = ({ children }: { children: React.ReactNode }) => {
  return <h3 className="font-bold text-lg text-gray-900">{children}</h3>;
};

const StageDifficulty = ({
  level,
  children,
}: {
  level: string;
  children: React.ReactNode;
}) => {
  const difficultyColors = {
    "very-easy": "text-green-500",
    easy: "text-light-green-500",
    intermediate: "text-orange-500",
    hard: "text-red-500",
    "very-hard": "text-dark-red-500",
  };

  return (
    <div
      className={`ml-auto text-sm font-semibold ${
        difficultyColors[level as keyof typeof difficultyColors]
      }`}
    >
      {children}
    </div>
  );
};

const StageDescription = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-gray-600 mt-1">{children}</p>;
};

export { Stages, Stage, StageTitle, StageDifficulty, StageDescription };
