import confetti from "canvas-confetti";
import React, { useEffect, useState } from "react";

import { useStore } from "@/contexts/store";
import { useAuthenticatedWebSocket } from "@/hooks/useAuthenticatedSocket";
import EyeIcon from "@/public/assets/icons/eye-icon";
import { EventType } from "@/types";

import ChallengeSuccessModal from "@/app/components/primitives/ChallengeSuccessModal";
import TestOutputModal from "@/app/components/primitives/TestOutputModal";

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
  const { websocketEvents, addWebsocketEvent, clearTestEventsForModule } =
    useStore();
  const [testResultStatus, setTestResultStatus] = useState<TestResultStatus>(
    initialStatus as TestResultStatus
  );
  const [testOutput, setTestOutput] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const currentPushEvent = websocketEvents?.pushEvents?.[moduleNumber];
  const currentTestEvents = websocketEvents?.testEvents?.[moduleNumber] || [];
  const latestTestEvent = currentTestEvents[currentTestEvents.length - 1];

  // Determine if tests are running by checking if we have a push event
  // without a corresponding test event (matching commitSha)
  const isTestRunning =
    currentPushEvent &&
    (!latestTestEvent ||
      latestTestEvent.commitSha !== currentPushEvent.commitSha);

  useEffect(() => {
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
        }
      } catch (error) {
        console.error("Error parsing websocket message:", error);
      }
    }
  }, [messages, addWebsocketEvent, clearTestEventsForModule, moduleNumber]);

  const triggerConfetti = () => {
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
  };

  // Update status based on running state and test events
  useEffect(() => {
    if (isTestRunning) {
      setTestResultStatus("running");
    } else if (latestTestEvent) {
      // Check success based on the test event data
      const isSuccess =
        latestTestEvent.success &&
        latestTestEvent.progress.status === "completed";
      setTestResultStatus(isSuccess ? "success" : "failed");
      setTestOutput(latestTestEvent.output);

      // If tests passed successfully (array format with success true)
      if (isSuccess) {
        triggerConfetti();
        setTimeout(() => {
          setShowSuccessModal(true);
        }, 1000);
      }
    } else {
      setTestResultStatus(initialStatus as TestResultStatus);
    }
  }, [isTestRunning, latestTestEvent, initialStatus, currentPushEvent]);

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
      case "failed":
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
          {testOutput && (
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
