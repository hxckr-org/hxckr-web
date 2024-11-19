"use client";

import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { twMerge } from "tailwind-merge";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  className?: string;
}

export function Pagination({
  totalItems = 10,
  itemsPerPage = 4,
  className = "",
}: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;

  const safeTotal = Math.max(totalItems, 0);
  const safeTotalPages = Math.max(Math.ceil(safeTotal / itemsPerPage), 1);
  const safeCurrentPage = Math.min(Math.max(currentPage, 1), safeTotalPages);

  const startItem = Math.max((safeCurrentPage - 1) * itemsPerPage + 1, 1);
  const endItem = Math.min(safeCurrentPage * itemsPerPage, safeTotal);

  const handlePageChange = useCallback(
    (page: number) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set("page", page.toString());
      return current.toString();
    },
    [searchParams]
  );

  const getPageNumbers = () => {
    const pages = [];
    if (safeTotalPages <= 7) {
      for (let i = 1; i <= safeTotalPages; i++) {
        pages.push(i);
      }
    } else {
      if (safeCurrentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", safeTotalPages);
      } else if (safeCurrentPage >= safeTotalPages - 2) {
        pages.push(
          1,
          "...",
          safeTotalPages - 3,
          safeTotalPages - 2,
          safeTotalPages - 1,
          safeTotalPages
        );
      } else {
        pages.push(
          1,
          "...",
          safeCurrentPage - 1,
          safeCurrentPage,
          safeCurrentPage + 1,
          "...",
          safeTotalPages
        );
      }
    }
    return pages;
  };

  if (safeTotal === 0) {
    return null;
  }

  return (
    <div className={twMerge("flex items-center justify-between", className)}>
      <div className="text-sm text-gray-600">
        {startItem}-{endItem} of {safeTotal} items
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => {
            router.push(pathname + "?" + handlePageChange(safeCurrentPage - 1));
          }}
          disabled={safeCurrentPage === 1}
          className="rounded p-1 mr-6 text-gray-500 border border-gray-200 hover:border-purple-primary hover:text-purple-primary disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="h-7 w-7" />
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() =>
              typeof page === "number"
                ? router.push(pathname + "?" + handlePageChange(page))
                : undefined
            }
            disabled={page === "..."}
            className={`
              min-w-[32px] rounded px-2 py-1 text-sm
              ${
                typeof page === "number" && page === safeCurrentPage
                  ? "text-purple-primary font-medium"
                  : "text-gray-600 hover:border hover:border-purple-primary hover:text-purple-primary"
              }
              ${page === "..." ? "cursor-default" : ""}
            `}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => {
            router.push(pathname + "?" + handlePageChange(safeCurrentPage + 1));
          }}
          disabled={safeCurrentPage === safeTotalPages}
          className="rounded p-1 ml-6 text-gray-500 border border-gray-200 hover:text-purple-primary hover:border-purple-primary disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Next page"
        >
          <ChevronLeftIcon className="h-7 w-7 rotate-180" />
        </button>
      </div>
    </div>
  );
}
