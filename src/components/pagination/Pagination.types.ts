import React from 'react';
import { Size } from 'types';

export interface PaginationProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  ref?: React.Ref<HTMLElement>;
  /** One of the five control tiers; scales the page buttons and ellipsis. */
  size?: Size;
  /** Controlled current page (1-based) — clamp it in `onChange`. Omit for uncontrolled (`defaultPage`). */
  currentPage?: number;
  /** Initial page for the uncontrolled case. Default: `1`. */
  defaultPage?: number;
  totalPages: number;
  onChange?: (page: number, event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Show the first/last page jump buttons. Default: `true`. */
  showEdgeButtons?: boolean;
  /** Page buttons to show on each side of the current page. Default: `1`. */
  siblings?: number;
}
