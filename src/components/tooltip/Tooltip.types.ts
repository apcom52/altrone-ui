import { JSX, ReactNode } from 'react';

export interface TooltipTypes {
  content: string | JSX.Element;
  kbd?: string;
  children?: ReactNode;
  childrenClassName?: string;
}
