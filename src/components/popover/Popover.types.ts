import { FloatingContext, Placement } from '@floating-ui/react';
import { ReactNode } from 'react';
import { RenderFunction } from 'utils';

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
  children: RenderFunction<ReactNode, PopoverChildrenContext>;
  content: RenderFunction<ReactNode, PopoverContentContext>;
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
  onOpenChange?: (open: boolean) => void;
}
