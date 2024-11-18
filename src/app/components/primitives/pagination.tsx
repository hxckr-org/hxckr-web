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

  const handlePageChange = useCallback(
    (page: number) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set("page", page.toString());
      return current.toString();
    },
    [searchParams]
  );

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  return (
    <div className={twMerge("flex items-center justify-between", className)}>
      <div className="text-sm text-gray-600">
        {startItem}-{endItem} of {totalItems} items
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => {
            router.push(pathname + "?" + handlePageChange(currentPage - 1));
          }}
          disabled={currentPage === 1}
          className="rounded p-1 mr-6 text-gray-500 border border-gray-200 hover:border-purple-primary hover:text-purple-primary disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Previous page"
        >
          <ChevronLeftIcon className={`h-7 w-7`} />
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
                typeof page === "number" && page === currentPage
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
            router.push(pathname + "?" + handlePageChange(currentPage + 1));
          }}
          disabled={currentPage === totalPages}
          className="rounded p-1 ml-6 text-gray-500 border border-gray-200 hover:text-purple-primary hover:border-purple-primary disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Next page"
        >
          <ChevronLeftIcon className={`h-7 w-7 rotate-180`} />
        </button>
      </div>
    </div>
  );
}
