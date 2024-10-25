"use client";

import clsx from "clsx";

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
      className={clsx(
        "bg-purple-primary text-white text-sm px-4 py-2 flex items-center gap-2 rounded-full font-medium hover:bg-purple-primary/90",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
