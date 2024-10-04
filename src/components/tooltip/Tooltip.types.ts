import { PopoverProps } from '../popover';
import { ReactNode } from 'react';

export interface TooltipTypes extends Omit<PopoverProps, 'children'> {
  content: string | JSX.Element;
  children?: ReactNode;
  childrenClassName?: string;
}
