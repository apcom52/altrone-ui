import React from 'react';

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  ref?: React.Ref<HTMLElement>;
  /** Current page, 1-based. Controlled — clamp it in `onChange`. */
  currentPage: number;
  totalPages: number;
  onChange: (page: number, event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Show the first/last page jump buttons. Default: `true`. */
  showEdgeButtons?: boolean;
  /** Page buttons to show on each side of the current page. Default: `1`. */
  siblings?: number;
}
