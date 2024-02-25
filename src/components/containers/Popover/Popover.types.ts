import { MutableRefObject, ReactElement } from 'react';
import { Placement } from '@floating-ui/react';

export type FloatingBoxTrigger = 'click' | 'focus' | 'hover';

export type FloatingBoxProps = {
  children: ReactElement;
  content: (() => ReactElement) | ReactElement;
  enabled?: boolean;
  title?: string;
  placement?: 'auto' | Placement;
  trigger?: FloatingBoxTrigger | FloatingBoxTrigger[];
  width?: string | number;
  maxHeight?: string | number;
  childrenRef?: MutableRefObject<any>;
  contentRef?: MutableRefObject<HTMLDivElement>;
  useRootContainer?: boolean;
  useFocusTrap?: boolean;
  useParentWidth?: boolean;
  className?: string;
};

export type PopoverContext = {
  closePopup: () => void;
};
