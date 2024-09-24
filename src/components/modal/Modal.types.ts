import { ReactElement } from 'react';
import { Size } from 'types';

export interface ModalContext {
  closeModal: () => void;
}

export interface ModalProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  children: ReactElement;
  content: ReactElement | ((context: ModalContext) => ReactElement);
  openedByDefault?: boolean;
  enabled?: boolean;
  title?: string;
  size?: Size;
  showCancelButton?: boolean;
  leftActions?:
    | ReactElement
    | ReactElement[]
    | ((context: ModalContext) => ReactElement | ReactElement[]);
  actions?:
    | ReactElement
    | ReactElement[]
    | ((context: ModalContext) => ReactElement | ReactElement[]);
}
