import React from 'react';

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  currentPage: number;
  totalPages: number;
  onChange: (page: number, event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Show first/last page jump buttons. Default: true */
  showEdgeButtons?: boolean;
  /** Number of page buttons to show on each side of the current page. Default: 1 */
  siblings?: number;
}
