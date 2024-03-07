import { MutableRefObject, ReactNode, RefObject } from 'react';
import { Placement } from '@floating-ui/react';

export type PopoverTrigger = 'click' | 'focus' | 'hover';

export type PopoverRef = {
  opened: boolean;
  childrenNode: HTMLElement | null;
  contentNode: HTMLDivElement | null;
  open: () => void;
  close: () => void;
};

export type PopoverChildrenContext = {
  opened: boolean;
  closePopup: () => void;
};

export type PopoverProps = {
  children: ReactNode | ((context: PopoverChildrenContext) => ReactNode);
  content: ((context: PopoverContext) => ReactNode) | ReactNode;
  enabled?: boolean;
  title?: string;
  placement?: 'auto' | Placement;
  trigger?: PopoverTrigger | PopoverTrigger[];
  width?: string | number;
  maxHeight?: string | number;
  showCloseButton?: boolean;
  useRootContainer?: boolean;
  useFocusTrap?: boolean;
  useParentWidth?: boolean;
  className?: string;
};

export type PopoverContext = {
  closePopup: () => void;
};
