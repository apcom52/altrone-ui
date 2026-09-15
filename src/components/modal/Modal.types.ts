import React, { ReactElement } from 'react';
import { Size } from 'types';
import { ActionsProp, RenderFunction } from '../../utils';

export interface ModalContext {
  closeModal: () => void;
}

export interface ModalProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'content' | 'children'
> {
  ref?: React.Ref<HTMLDivElement>;
  content: RenderFunction<ReactElement, ModalContext>;
  /** Controlled open state. Omit for an uncontrolled modal (see `defaultOpen`). */
  open?: boolean;
  /** Initial open state for an uncontrolled modal. Ignored once `open` is passed. */
  defaultOpen?: boolean;
  onClose?: () => void;
  enabled?: boolean;
  title?: string;
  size?: Size;
  showCancelButton?: boolean;
  actions?: ActionsProp<ModalContext>;
  /** Secondary actions, rendered on the opposite side of the footer from `actions` (left, in our layout). */
  additionalActions?: ActionsProp<ModalContext>;
}
