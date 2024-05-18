import { PopoverProps } from '../popover';

export interface TooltipTypes extends Omit<PopoverProps, 'children'> {
  content: string | JSX.Element;
  children?: PopoverProps['children'];
  childrenClassName?: string;
}
