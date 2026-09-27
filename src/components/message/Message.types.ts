import {
  AriaRole,
  HTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
  Ref,
} from 'react';
import { Role } from 'types';
import { ActionsProp } from '../../utils';

export interface MessageProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'role' | 'title'
> {
  ref?: Ref<HTMLDivElement>;
  icon?: ReactElement;
  /** Overrides the native `div` `title` (tooltip) attribute — this is the message's heading text. */
  title?: ReactNode;
  severity?: Role;
  actions?: ActionsProp;
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
  compact?: boolean;
  /**
   * ARIA role for the root element. Defaults to `alert` (assertive — the
   * screen reader interrupts to announce it) for `severity="danger"`, and
   * `status` (polite) for everything else. Pass a value to override.
   */
  ariaRole?: AriaRole;
}
