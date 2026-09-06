import React, { ReactElement } from 'react';
import { Size } from 'types';

export interface ModalContext {
  closeModal: () => void;
}

type ModalRenderProp<T> = T | ((context: ModalContext) => T);

export interface ModalProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  ref?: React.Ref<HTMLDivElement>;
  children: ReactElement<{ onClick?: React.MouseEventHandler }>;
  content: ModalRenderProp<ReactElement>;
  openedByDefault?: boolean;
  onClose?: () => void;
  enabled?: boolean;
  title?: string;
  size?: Size;
  showCancelButton?: boolean;
  leftActions?: ModalRenderProp<ReactElement | ReactElement[]>;
  actions?: ModalRenderProp<ReactElement | ReactElement[]>;
}
