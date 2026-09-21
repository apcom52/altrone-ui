import { Placement } from '@floating-ui/react';
import type { CSSProperties, HTMLAttributes, ReactElement, ReactNode, Ref } from 'react';

/**
 * `id`/`aria-*`/`data-*`/native event handlers land on the trigger element
 * (the same element `ref` points to), not on the floating tooltip content —
 * `className`/`style` are the exception, they still target the tooltip
 * content box, as before.
 */
export interface TooltipProps
  extends Omit<HTMLAttributes<HTMLElement>, 'title' | 'content' | 'children'> {
  ref?: Ref<HTMLElement>;
  content: string | ReactElement;
  title?: string;
  kbd?: string;
  maxWidth?: number | string;
  children?: ReactNode;
  /** Class for the auto-generated trigger button, shown when no `children` is given. Has no effect when a custom trigger is passed via `children`. */
  triggerClassName?: string;
  /** Inline styles for the auto-generated trigger button, shown when no `children` is given. Has no effect when a custom trigger is passed via `children`. */
  triggerStyle?: CSSProperties;
  placement?: Placement;
}
