import { ReactElement } from 'react';

type DrawerContext = {
  closeDrawer: () => void;
};

export interface DrawerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  children: ReactElement<{ onClick: () => void }>;
  title?: string;
  content?: ReactElement;
  footer?: ReactElement;
  placement?: 'start' | 'end';
  width?: number;
  showDoneButton?: boolean;
  renderActionButton?: (context: DrawerContext) => ReactElement;
  onClose?: () => void;
  onDone?: () => Promise<boolean | void>;
}
