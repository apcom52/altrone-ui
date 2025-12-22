import { ReactElement } from 'react';

export interface DrawerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  children: ReactElement<{ onClick: () => void }>;
  title?: string;
  content?: ReactElement;
  placement?: 'start' | 'end';
  width?: number;
  showDoneButton?: boolean;
  onClose?: () => void;
  onDone?: () => Promise<boolean | void>;
}
