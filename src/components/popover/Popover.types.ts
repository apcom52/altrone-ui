import { FloatingContext, OpenChangeReason, Placement } from '@floating-ui/react';
import { ReactElement } from 'react';
import { CustomRenderFunction } from 'utils';

export type PopoverTrigger = 'click' | 'focus' | 'hover';

export type PopoverRef = {
  opened: boolean;
  activeIndex: number | null;
  context: FloatingContext;
  childrenNode: HTMLElement | null;
  /** The floating root element (the `.Popover` box), not the inner content wrapper. */
  contentNode: HTMLDivElement | null;
  openPopup: () => void;
  closePopup: () => void;
  actualPlacement: Placement;
  transformOrigin: string;
};

export type PopoverChildrenContext = {
  opened: boolean;
  closePopup: () => void;
};

export type PopoverContentContext = {
  closePopup: () => void;
  /** Closes this popover and every ancestor popover in the chain. */
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
  /** Popover covers its trigger instead of sitting beside it. */
  overlap?: boolean;
  /**
   * Fired whenever the open state changes. `event` / `reason` come from
   * floating-ui — `reason` tells you *how* it changed (`'escape-key'`,
   * `'outside-press'`, `'reference-press'`, `'hover'`, …).
   */
  onOpenChange?: (
    open: boolean,
    event?: Event,
    reason?: OpenChangeReason,
  ) => void;
}
