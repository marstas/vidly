import React from 'react';
import { PAGE_SIZE } from '../../constants';

type PaginationProps = {
  itemsCount: number;
  activePage: number;
  onPageChange: (newPage: number) => void;
};

export default function Pagination({
  itemsCount,
  activePage,
  onPageChange
}: PaginationProps) {
  const numPages = Math.ceil(itemsCount / PAGE_SIZE);
  if (numPages < 2) return null;

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination pagination-lg">
        {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNumber) => (
          <li
            className={`page-item ${pageNumber === activePage ? 'active' : ''}`}
            key={pageNumber}
          >
            <span
              className="page-link"
              onClick={() => onPageChange(pageNumber)}
              style={{ cursor: 'pointer' }}
            >
              {pageNumber}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
