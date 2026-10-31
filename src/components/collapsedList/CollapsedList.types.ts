import { HTMLAttributes, ReactElement, Ref } from 'react';
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
  /** Toggle icon shown while collapsed. Defaults to the shared `icons.open`. */
  openIcon?: ReactElement;
  /** Toggle icon shown while expanded. Defaults to the shared `icons.close`. */
  closeIcon?: ReactElement;
}
