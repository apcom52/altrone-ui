import { Placement } from '@floating-ui/react';
import type { CSSProperties, ReactElement, ReactNode, Ref } from 'react';

export interface TooltipProps {
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
  className?: string;
  style?: CSSProperties;
  placement?: Placement;
}
