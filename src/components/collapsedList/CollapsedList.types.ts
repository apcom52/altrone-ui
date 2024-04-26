import { RenderFunction } from '../../utils';
import { Gap } from '../../types';

export type CollapsedListContext = {
  hiddenItems: number;
  totalItems: number;
  expanded: boolean;
};

export interface CollapsedListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  limit?: number;
  gap?: Gap;
  hideExpandButtonAfterUsage?: boolean;
  expandButtonLabel?: RenderFunction<string, CollapsedListContext>;
}
