import { Placement } from '@floating-ui/react';
import type { ReactElement, ReactNode, Ref } from 'react';

export interface TooltipProps {
  ref?: Ref<HTMLElement>;
  content: string | ReactElement;
  title?: string;
  kbd?: string;
  maxWidth?: number | string;
  children?: ReactNode;
  childrenClassName?: string;
  className?: string;
  style?: React.CSSProperties;
  placement?: Placement;
}
