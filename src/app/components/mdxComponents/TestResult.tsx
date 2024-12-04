import confetti from "canvas-confetti";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import ChallengeSuccessModal from "@/app/components/primitives/ChallengeSuccessModal";
import TestOutputModal from "@/app/components/primitives/TestOutputModal";
import { useStore } from "@/contexts/store";
import { getChallengeDocument, sluggify } from "@/helpers";
import { useAuthenticatedWebSocket } from "@/hooks/useAuthenticatedSocket";
import EyeIcon from "@/public/assets/icons/eye-icon";
import { EventType } from "@/types";

type TestResultStatus = "success" | "not started" | "failed" | "running";

const TestResult = ({
  title,
  status: initialStatus,
  moduleNumber,
  children,
}: {
  title: string;
  status: string;
  moduleNumber: number;
  children: React.ReactNode;
}) => {
  const { messages, isConnected } = useAuthenticatedWebSocket();
  const {
    allRepositories,
    websocketEvents,
    addWebsocketEvent,
    clearTestEventsForModule,
    updateRepositoryProgress,
    updateChallengeProgress,
  } = useStore();
  const pathname = usePathname();

  const challengeUrl = pathname.split("/challenges")[1];
  const document = getChallengeDocument({ url: challengeUrl });

  const [testResultStatus, setTestResultStatus] = useState<TestResultStatus>(
    initialStatus as TestResultStatus
  );
  const [testOutput, setTestOutput] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const currentPushEvent = websocketEvents?.pushEvents?.[moduleNumber];
  const currentRepository = allRepositories.find(
    (repo) =>
      sluggify(repo?.challenge.title) === sluggify(document?.title || "") ||
      repo.soft_serve_url === currentPushEvent?.repoUrl
  );
  const currentTestEvents = useMemo(
    () => websocketEvents?.testEvents?.[moduleNumber] || [],
    [moduleNumber, websocketEvents?.testEvents]
  );
  const latestTestEvent = currentTestEvents[currentTestEvents.length - 1];

  // Determine if tests are running by checking if we have a push event
  // without a corresponding test event (matching commitSha)
  const isTestRunning =
    currentPushEvent &&
    (!latestTestEvent ||
      latestTestEvent.commitSha !== currentPushEvent.commitSha);

  const triggerConfetti = useCallback(() => {
    // Create a sequence of confetti bursts across the screen
    const defaults = {
      spread: 360,
      ticks: 450,
      gravity: 0.5,
      decay: 0.94,
      startVelocity: 45,
      particleCount: 50,
      scalar: 1.2,
      shapes: ["circle"] as ["circle"],
      colors: ["#7762FF", "#28A745", "#FEBC2E", "#FF5F57", "#28C840"],
    };

    // Create bursts from different positions along the top
    const positions = [0.2, 0.4, 0.6, 0.8];
    let index = 0;

    // Launch confetti in sequence
    function nextConfetti() {
      if (index < positions.length) {
        confetti({
          ...defaults,
          origin: { x: positions[index], y: 0 },
          zIndex: 9999,
        });
        index++;
        setTimeout(nextConfetti, 200);
      }
    }

    // Start the sequence
    nextConfetti();

    // Add a final burst in the middle
    setTimeout(() => {
      confetti({
        ...defaults,
        origin: { x: 0.5, y: 0.1 },
        spread: 180,
        startVelocity: 55,
        particleCount: 100,
        zIndex: 9999,
      });
    }, 1000);
  }, []);

  useEffect(() => {
    const currentStep =
      currentRepository?.progress.progress_details.current_step || 0;
    if (moduleNumber < currentStep + 1) {
      if (latestTestEvent && messages.length < 1) {
        if (
          sluggify(currentRepository?.challenge?.title || "") !==
          sluggify(document?.title || "")
        ) {
          return;
        }
        setTestResultStatus(latestTestEvent.success ? "success" : "failed");
        setTestOutput(latestTestEvent.output);
        if (currentRepository?.progress.status === "completed") {
          setShowSuccessModal(true);
        }
      }
    }

    if (isTestRunning) {
      setTestResultStatus("running");
    }

    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      try {
        const eventData = JSON.parse(lastMessage.data);

        if (eventData.event_type === EventType.Push) {
          clearTestEventsForModule(moduleNumber);
          setTestOutput("");
          addWebsocketEvent(eventData, moduleNumber);
        } else if (eventData.event_type === EventType.Test) {
          addWebsocketEvent(eventData, moduleNumber);

          // Handle test completion here
          const isSuccess = eventData.success;
          setTestResultStatus(isSuccess ? "success" : "failed");
          setTestOutput(eventData.output);

          if (isSuccess) {
            updateRepositoryProgress({
              challengeId: eventData.progress.challenge_id,
              currentStep: eventData.progress.progress_details.current_step,
              status: eventData.progress.status,
            });
            updateChallengeProgress({
              challengeId: eventData.progress.challenge_id,
              currentStep: eventData.progress.progress_details.current_step,
              status: eventData.progress.status,
            });
            if (eventData.progress.status === "completed") {
              setShowSuccessModal(true);
              triggerConfetti();
            }
          }
        }
      } catch (error) {
        console.error("Error parsing websocket message:", error);
      }
    }
  }, [
    messages,
    isTestRunning,
    addWebsocketEvent,
    clearTestEventsForModule,
    moduleNumber,
    updateRepositoryProgress,
    updateChallengeProgress,
    triggerConfetti,
    currentRepository?.progress.progress_details.current_step,
  ]);

  const statusStateColors: Record<TestResultStatus, string> = {
    success: `text-[#28A745] bg-[#EFFBF1] border-[#CEF3D4]`,
    "not started": `text-[#F97216] bg-[#FEEDE1] border-[#FDDBC4]`,
    failed: `text-[#EA3546] bg-[#FDEDEE] border-[#F9C8CB]`,
    running: `text-[#3B82F6] bg-[#EFF6FF] border-[#BFDBFE]`,
  };

  const getStatusDisplay = (status: TestResultStatus) => {
    switch (status) {
      case "running":
        return "Running Tests...";
      case "success":
        return "Tests Passed";
      case "failed":
        return "Tests Failed";
      default:
        return "Not Started";
    }
  };

  const getContent = () => {
    switch (testResultStatus) {
      case "running":
        return (
          <p className="animate-pulse text-grey-tertiary-text">
            Running tests on your code...
          </p>
        );
      case "not started":
        return (
          <p className="text-grey-tertiary-text">
            Your test results will appear here once we receive your code
            solution
          </p>
        );
      case "success":
        if (!testOutput) {
          return "You passed this stage!";
        }
      case "failed":
        if (!testOutput) {
          return "Your tests failed. Please cross-check your code and try again.";
        }
        return children;
      default:
        return children;
    }
  };

  return (
    <>
      <div className="rounded-lg sticky top-3 bg-white z- shadow-sm mb-4">
        {title && (
          <section className="py-5 z-50 px-3 bg-grey-card-border rounded-t-lg border border-b-grey-accent flex items-center gap-2">
            <p className="text-sm font-medium">{title}:</p>
            <p
              className={`font-medium border rounded-full w-fit py-1 px-2 text-xs capitalize leading-[14.52px] ${statusStateColors[testResultStatus]}`}
            >
              {getStatusDisplay(testResultStatus)}
            </p>
          </section>
        )}
        <div className="absolute top-[-36px] right-0 left-[-48px] h-10 bg-white w-screen -z-10"></div>
        <section className="flex flex-col gap-3 p-3 border border-grey-accent rounded-b-lg border-t-0">
          <div className="bg-white text-sm leading-[24px] tracking-[8%] font-mediu font-light rounded-b-lg">
            {getContent()}
          </div>
          {testOutput && testOutput.length > 0 && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 py-3 px-4 rounded-full bg-[#EDEBFF] border border-purple-secondary w-fit"
            >
              <EyeIcon />
              <p className="text-xs font-medium text-purple-primary leading-[18px] tracking-[-2%]">
                View Results
              </p>
            </button>
          )}
        </section>
      </div>

      <TestOutputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        output={testOutput}
      />

      <ChallengeSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </>
  );
};

export default TestResult;
