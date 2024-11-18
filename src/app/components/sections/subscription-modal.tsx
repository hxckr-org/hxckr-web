"use client";

import { useState } from "react";
import Modal from "../primitives/modal";
import Button from "../primitives/button";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SubscriptionStatus = "idle" | "loading" | "success" | "error";

export default function SubscriptionModal({
  isOpen,
  onClose,
}: SubscriptionModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubscriptionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === "loading") return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.error?.includes("Member Exists")) {
          throw new Error("You are already subscribed to our waiting list!");
        } else if (data.error?.includes("Invalid Resource")) {
          throw new Error("Please enter a valid email address.");
        } else {
          throw new Error(
            data.error || "Failed to subscribe. Please try again."
          );
        }
      }

      setSubmittedEmail(email);
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {status === "success" ? (
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">
            We&apos;ve added you to our waiting list!
          </h2>
          <p className="text-gray-600">
            We will let you know when Jede is live.
          </p>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-500">{submittedEmail}</p>
            <p className="text-purple-600 mt-2">Jede is coming to you soon!</p>
            <p className="text-gray-600 text-sm mt-1">
              Built to help you learn Bitcoin Development at your own pace💜
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-black">Join Our Waiting List</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={`w-full px-6 py-4 rounded-full border focus:outline-none text-center text-black
                ${
                  status === "error"
                    ? "border-red-500"
                    : "border-grey-accent focus:border-purple-primary"
                }`}
              required
              disabled={status === "loading"}
            />
            {status === "error" && (
              <p className="text-red-500 text-sm px-4">{errorMessage}</p>
            )}
            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full px-6 py-4 text-base text-white font-normal hover:bg-purple-primary/90 text-center justify-center"
            >
              {status === "loading" ? "Subscribing..." : "Sign up for updates"}
            </Button>
          </form>
        </div>
      )}
    </Modal>
  );
}
