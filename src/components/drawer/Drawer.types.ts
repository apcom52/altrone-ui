import React, { ReactElement, ReactNode } from 'react';

export interface DrawerContext {
  closeDrawer: () => void;
}

type DrawerRenderProp<T> = T | ((context: DrawerContext) => T);

export interface DrawerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  ref?: React.Ref<HTMLDivElement>;
  /**
   * Trigger element — cloned with an `onClick` that opens the drawer, merged
   * with any `onClick` it already has.
   */
  children: ReactElement<{ onClick?: React.MouseEventHandler }>;
  title?: string;
  content?: DrawerRenderProp<ReactElement>;
  footer?: DrawerRenderProp<ReactElement>;
  placement?: 'start' | 'end';
  width?: number;
  /**
   * Controls on the start side of the header, after the close button — one
   * element or several.
   */
  startActions?: DrawerRenderProp<ReactNode>;
  /**
   * Controls on the end side of the header — one element or several. When
   * omitted, `onDone` renders a Done button here instead; passing this
   * replaces that button.
   */
  endActions?: DrawerRenderProp<ReactNode>;
  onClose?: () => void;
  /**
   * Async handler for the built-in Done button. Returning `false` keeps the
   * drawer open (e.g. failed validation); any other resolved value closes it.
   */
  onDone?: () => Promise<boolean | void>;
}
