import { ReactElement } from 'react';
import { Placement } from '@floating-ui/react';

export type FloatingBoxTrigger = 'click' | 'focus' | 'hover';

export type FloatingBoxProps = {
  children: ReactElement;
  content: ReactElement;
  title?: string;
  placement?: 'auto' | Placement;
  trigger?: FloatingBoxTrigger | FloatingBoxTrigger[];
  useRootContainer?: boolean;
  className?: string;
  width?: string | number;
  maxHeight?: string | number;
  useFocusTrap?: boolean;
};
