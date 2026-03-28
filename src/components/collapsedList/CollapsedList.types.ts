import React from 'react';
import { RenderFunction } from '../../utils';
import { Gap } from '../../types';

export type CollapsedListContext = {
  hiddenItems: number;
  totalItems: number;
  expanded: boolean;
};

export interface CollapsedListProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLElement>;
  limit?: number;
  gap?: Gap;
  hideExpandButtonAfterUsage?: boolean;
  expandButtonLabel?: RenderFunction<string, CollapsedListContext>;
}
