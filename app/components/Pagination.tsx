'use client';

import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get('page')) || 1;

  if (totalPages <= 1) {
    return null;
  }

  const hrefForPage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  };

  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const baseClasses =
    'px-4 py-2 rounded-lg text-sm font-semibold border transition-colors';
  const enabledClasses = `${baseClasses} bg-blue-600 text-white border-blue-600 hover:bg-blue-700`;
  const disabledClasses = `${baseClasses} bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed`;

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-4 pt-2"
    >
      {hasPrevious ? (
        <Link href={hrefForPage(currentPage - 1)} className={enabledClasses}>
          Previous
        </Link>
      ) : (
        <span aria-disabled="true" className={disabledClasses}>
          Previous
        </span>
      )}

      <span className="text-sm font-medium text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      {hasNext ? (
        <Link href={hrefForPage(currentPage + 1)} className={enabledClasses}>
          Next
        </Link>
      ) : (
        <span aria-disabled="true" className={disabledClasses}>
          Next
        </span>
      )}
    </nav>
  );
}
