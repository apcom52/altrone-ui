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
  actualPlacement: string;
  transformOrigin: string;
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
  ref?: React.Ref<PopoverRef>;
  children: ReactElement | CustomRenderFunction<PopoverChildrenContext>;
  content: ReactElement | CustomRenderFunction<PopoverContentContext>;
  openedByDefault?: boolean;
  enabled?: boolean;
  title?: string;
  placement?: 'auto' | Placement;
  trigger?: PopoverTrigger | PopoverTrigger[];
  showCloseButton?: boolean;
  focusTrap?: boolean;
  focusTrapTargets?: ('reference' | 'floating' | 'content')[];
  parentWidth?: boolean;
  listNavigation?: boolean;
  defaultListNavigationIndex?: number | null;
  virtualNavigationFocus?: boolean;
  overlap?: boolean;
  onOpenChange?: (open: boolean) => void;
}
