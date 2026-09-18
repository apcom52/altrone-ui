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
  /** Controlled open state. Omit for an uncontrolled drawer (see `defaultOpen`). */
  open?: boolean;
  /** Initial open state for an uncontrolled drawer. Ignored once `open` is passed. */
  defaultOpen?: boolean;
  title?: string;
  content?: RenderFunction<ReactElement, DrawerContext>;
  footer?: RenderFunction<ReactElement, DrawerContext>;
  placement?: 'start' | 'end';
  width?: number;
  /**
   * When `false`, a backdrop click or `Esc` no longer close the drawer — it
   * shakes instead. The close button (see `showCloseButton`) and `onDone`
   * still close it normally; this only gates the two implicit gestures.
   * Defaults to `true`.
   */
  dismissible?: boolean;
  /** Shows or hides the header close button. Defaults to `true`. */
  showCloseButton?: boolean;
  /**
   * Secondary controls on the start side of the header, after the close
   * button — one element or several.
   */
  additionalActions?: ActionsProp<DrawerContext>;
  /**
   * Primary controls on the end side of the header — one element or several.
   * When omitted, `onDone` renders a Done button here instead; passing this
   * replaces that button.
   */
  actions?: ActionsProp<DrawerContext>;
  /**
   * `event` is the triggering backdrop click / close-button click / Escape
   * keydown, or undefined when closed programmatically via
   * `DrawerContext.closeDrawer()`.
   */
  onClose?: (event?: React.MouseEvent | KeyboardEvent) => void;
  /**
   * Async handler for the built-in Done button. Returning `false` keeps the
   * drawer open (e.g. failed validation); any other resolved value closes it.
   */
  onDone?: (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => Promise<boolean | void>;
}
