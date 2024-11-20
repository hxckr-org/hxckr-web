"use client";

import { useEffect, useState } from "react";

interface ProgressBarProps {
  value?: number;
  max?: number;
  className?: string;
  animate?: boolean;
}

export function ProgressBar({
  value = 0,
  max = 100,
  className = "",
  animate = true,
}: ProgressBarProps) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (max === 0) {
      setWidth(0);
      return;
    }
    if (animate) {
      setWidth(0);
      const timeout = setTimeout(() => {
        setWidth((value / max) * 100);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setWidth((value / max) * 100);
    }
  }, [value, max, animate]);

  return (
    <div
      className={`h-[6px] w-[280px] overflow-hidden rounded-full bg-[#F3EBFF] ${className}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
    >
      <div
        className="h-full rounded-full bg-purple-primary transition-all duration-500 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
