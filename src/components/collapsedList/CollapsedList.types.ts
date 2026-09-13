import { HTMLAttributes, Ref } from 'react';
import { RenderFunction } from 'utils';
import { Gap } from 'types';

export type CollapsedListContext = {
  hiddenItems: number;
  totalItems: number;
  expanded: boolean;
};

export interface CollapsedListProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  limit?: number;
  /** Space between list items — not the gap between the list and the toggle button. */
  gap?: Gap;
  hideExpandButtonAfterUsage?: boolean;
  expandButtonLabel?: RenderFunction<string, CollapsedListContext>;
}
