import { FloatingContext, Placement } from '@floating-ui/react';
import { ReactElement } from 'react';
import { CustomRenderFunction } from 'utils';

export type PopoverTrigger = 'click' | 'focus' | 'hover';

export type PopoverRef = {
  opened: boolean;
  activeIndex: number | null;
  context: FloatingContext;
  childrenNode: HTMLElement | null;
  contentNode: HTMLDivElement | null;
  openPopup: () => void;
  closePopup: () => void;
};

export type PopoverChildrenContext = {
  opened: boolean;
  closePopup: () => void;
};

export type PopoverContentContext = {
  closePopup: () => void;
  closeAllSequence: () => void;
};

export interface PopoverProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'content'> {
  children: ReactElement | CustomRenderFunction<PopoverChildrenContext>;
  content: ReactElement | CustomRenderFunction<PopoverContentContext>;
  openedByDefault?: boolean;
  enabled?: boolean;
  title?: string;
  placement?: 'auto' | Placement;
  trigger?: PopoverTrigger | PopoverTrigger[];
  showCloseButton?: boolean;
  showArrow?: boolean;
  focusTrap?: boolean;
  focusTrapTargets?: ('reference' | 'floating' | 'content')[];
  parentWidth?: boolean;
  listNavigation?: boolean;
  defaultListNavigationIndex?: number;
  virtualNavigationFocus?: boolean;
  overlap?: boolean;
  onOpenChange?: (open: boolean) => void;
}
