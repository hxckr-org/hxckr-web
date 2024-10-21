"use client";

import clsx from "clsx";

export default function Button({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  props?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}) {
  return (
    <button
      className={clsx(
        "bg-purple-primary text-white text-sm px-4 py-2 flex items-center gap-2 rounded-full font-medium",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
