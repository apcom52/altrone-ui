import { ReactElement } from 'react';
import { Size } from 'types';

export interface ModalProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  children: ReactElement;
  content: ReactElement;
  openedByDefault?: boolean;
  enabled?: boolean;
  title?: string;
  size?: Size;
  showCancelButton?: boolean;
  leftActions?: ReactElement | ReactElement[];
  actions?: ReactElement | ReactElement[];
}
