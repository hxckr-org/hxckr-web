import Link from "next/link";
import React from "react";

import { RoundedCheckIcon } from "@/public/assets/icons/rounded-check-icon";
import * as Dialog from "@radix-ui/react-dialog";

interface ChallengeSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const ChallengeSuccessModal = ({
  isOpen,
  onClose,
  title = "Challenge",
}: ChallengeSuccessModalProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 data-[state=open]:animate-overlayShow z-[100]" />
        <Dialog.Title className="sr-only">Challenge Success</Dialog.Title>
        <Dialog.Description className="sr-only">
          Challenge Success
        </Dialog.Description>
        <Dialog.Content
          className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[90vw] max-w-[600px] bg-white rounded-2xl p-10 text-center data-[state=open]:animate-contentShow z-[101]"
          aria-describedby="challenge-success"
        >
          <div className="flex flex-col items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-green-primary flex items-center justify-center">
              <RoundedCheckIcon className="w-10 h-10 text-white" />
            </div>

            <div className="space-y-8">
              <h2 className="text-4xl font-bold text-black">Great Job!!!</h2>
              <p className="text-xl font-light text-gray-600">
                {title} completed.
              </p>
            </div>

            <div className="flex gap-4 w-full mt-8">
              <Link
                href="/challenges"
                className="flex-1 bg-purple-primary text-white py-4 px-6 rounded-full hover:bg-purple-primary/90 transition-colors"
              >
                Choose Next Challenge →
              </Link>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ChallengeSuccessModal;
