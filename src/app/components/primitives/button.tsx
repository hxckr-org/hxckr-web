"use client";

import { twMerge } from "tailwind-merge";

export default function Button({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={twMerge(
        `bg-purple-primary text-sm px-4 py-2 flex items-center gap-2 rounded-full font-medium hover:bg-purple-primary/90`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
