"use client";

import { useState } from "react";
import { Caret } from "@/public/assets/icons/caret";
import { twMerge } from "tailwind-merge";
import { Period } from "@/types";

interface SelectDropdownProps {
  onChange?: (value: string) => void;
  className?: string;
  options: {
    label: string;
    value: string;
  }[];
  defaultSelected: string;
}

export default function SelectDropdown({
  onChange,
  className = "",
  options = [
    { label: "All time", value: Period.AllTime },
    { label: "This Week", value: Period.ThisWeek },
    { label: "This Month", value: Period.ThisMonth },
    { label: "Today", value: Period.Today },
  ],
  defaultSelected,
}: SelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultSelected || options[0].label);

  const handleSelect = (option: { label: string; value: string }) => {
    setSelected(option.label);
    setIsOpen(false);
    onChange?.(option.value);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={twMerge(
          `
          flex w-48 items-center justify-between rounded-lg border border-gray-200 
          bg-white px-4 py-2 text-left text-gray-700 shadow-sm
          hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500
        `,
          className
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="text-sm">{selected}</span>
        <Caret
          fill="#313233"
          className={`h-[10px] w-[10px] text-black transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute mt-1 w-full rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
          <ul
            role="listbox"
            aria-label="Time period options"
            className="max-h-60 overflow-auto py-1"
          >
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={selected === option.value}
                onClick={() => handleSelect(option)}
                className={`
                  text-sm cursor-pointer px-4 py-2 text-gray-700
                  hover:bg-violet-50 hover:text-purple-primary
                  ${
                    selected === option.value
                      ? "bg-violet-50 text-purple-primary"
                      : ""
                  }
                `}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
