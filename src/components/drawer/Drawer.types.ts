import React, { ReactElement } from 'react';

type DrawerContext = {
  closeDrawer: () => void;
};

export interface DrawerProps {
  ref?: React.Ref<HTMLDivElement>;
  children: ReactElement<{ onClick: () => void }>;
  title?: string;
  content?: ReactElement;
  footer?: ReactElement;
  placement?: 'start' | 'end';
  width?: number;
  className?: string;
  style?: React.CSSProperties;
  showDoneButton?: boolean;
  renderActionButton?: (context: DrawerContext) => ReactElement;
  onClose?: () => void;
  onDone?: () => Promise<boolean | void>;
}
