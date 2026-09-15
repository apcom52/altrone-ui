import React, { ReactElement } from 'react';
import { ActionsProp, RenderFunction } from '../../utils';

export interface DrawerContext {
  closeDrawer: () => void;
}

export interface DrawerProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'content' | 'children'
> {
  ref?: React.Ref<HTMLDivElement>;
  /** Controlled open state. Omit for an uncontrolled drawer (see `openedByDefault`). */
  open?: boolean;
  /** Initial open state for an uncontrolled drawer. Ignored once `open` is passed. */
  openedByDefault?: boolean;
  title?: string;
  content?: RenderFunction<ReactElement, DrawerContext>;
  footer?: RenderFunction<ReactElement, DrawerContext>;
  placement?: 'start' | 'end';
  width?: number;
  /**
   * Controls on the start side of the header, after the close button — one
   * element or several.
   */
  startActions?: ActionsProp<DrawerContext>;
  /**
   * Controls on the end side of the header — one element or several. When
   * omitted, `onDone` renders a Done button here instead; passing this
   * replaces that button.
   */
  endActions?: ActionsProp<DrawerContext>;
  onClose?: () => void;
  /**
   * Async handler for the built-in Done button. Returning `false` keeps the
   * drawer open (e.g. failed validation); any other resolved value closes it.
   */
  onDone?: () => Promise<boolean | void>;
}
