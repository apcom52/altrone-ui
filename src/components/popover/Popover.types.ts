import { FloatingContext, OpenChangeReason, Placement } from '@floating-ui/react';
import { ReactElement } from 'react';
import { RenderFunction } from 'utils';

export type PopoverTrigger = 'click' | 'focus' | 'hover';

export type PopoverRef = {
  open: boolean;
  activeIndex: number | null;
  context: FloatingContext;
  childrenNode: HTMLElement | null;
  /** The floating root element (the `.Popover` box), not the inner content wrapper. */
  contentNode: HTMLDivElement | null;
  show: () => void;
  hide: () => void;
  actualPlacement: Placement;
  transformOrigin: string;
};

export type PopoverChildrenContext = {
  open: boolean;
  hide: () => void;
};

export type PopoverContentContext = {
  hide: () => void;
  /** Closes this popover and every ancestor popover in the chain. */
  hideAllSequence: () => void;
};

export interface PopoverProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'content'> {
  /** Forwarded to the trigger DOM element. Use `controlRef` for the imperative open/close API. */
  ref?: React.Ref<HTMLElement>;
  /** Imperative open/close API (`PopoverRef`) — see `ref` for the DOM node itself. */
  controlRef?: React.Ref<PopoverRef>;
  children: RenderFunction<ReactElement, PopoverChildrenContext>;
  content: RenderFunction<ReactElement, PopoverContentContext>;
  /** Controlled open state. Omit for an uncontrolled popover (see `defaultOpen`). */
  open?: boolean;
  /** Initial open state for an uncontrolled popover. Ignored once `open` is passed. */
  defaultOpen?: boolean;
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
