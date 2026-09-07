import React, { ReactElement } from 'react';
import { Size } from 'types';

export interface ModalContext {
  closeModal: () => void;
}

type ModalRenderProp<T> = T | ((context: ModalContext) => T);

export interface ModalProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  ref?: React.Ref<HTMLDivElement>;
  /**
   * Trigger element — cloned with an `onClick` that opens the modal, merged
   * with any `onClick` it already has. Omit it for a fully controlled modal
   * (open via `openedByDefault`, close via `onClose`), e.g. `DialogProvider`.
   */
  children?: ReactElement<{ onClick?: React.MouseEventHandler }>;
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
