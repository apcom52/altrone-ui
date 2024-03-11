import { ReactNode } from 'react';
import { FloatingContext, Placement } from '@floating-ui/react';
import { Elevation, Surface } from '../../../types';

export type PopoverTrigger = 'click' | 'focus' | 'hover';

export type PopoverRef = {
  opened: boolean;
  context: FloatingContext;
  childrenNode: HTMLElement | null;
  contentNode: HTMLDivElement | null;
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
  minHeight?: string | number;
  maxHeight?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  showCloseButton?: boolean;
  useRootContainer?: boolean;
  useFocusTrap?: boolean;
  useParentWidth?: boolean;
  focusTrapTargets?: ('reference' | 'floating' | 'content')[];
  elevation?: Elevation;
  surface?: Surface;
  className?: string;
};

export type PopoverContext = {
  closePopup: () => void;
};
