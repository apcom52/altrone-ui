import { Placement } from '@floating-ui/react';
import { JSX, ReactNode } from 'react';

export interface TooltipTypes {
  content: string | JSX.Element;
  kbd?: string;
  children?: ReactNode;
  childrenClassName?: string;
  className?: string;
  style?: React.CSSProperties;
  placement?: Placement;
}
