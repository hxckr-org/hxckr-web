"use client";

import { useState } from "react";
import Button from "./button";
import SubscriptionModal from "../sections/subscription-modal";

interface SubscribeButtonProps {
  signUpButtonText: string;
  className?: string;
}

export default function SubscribeButton({ signUpButtonText, className }: SubscribeButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsModalOpen(true)}
        className={className}
      >
        {signUpButtonText}
      </Button>

      <SubscriptionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
