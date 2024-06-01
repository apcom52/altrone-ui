import { ReactElement } from 'react';
import { Size } from '../../types';

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  onClose?: () => void;
  onOpenChange?: (opened: boolean, event?: Event) => void;
  title?: string;
  leftActions?: ReactElement[];
  actions?: ReactElement[];
  size?: Size;
}
