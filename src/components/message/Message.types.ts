import { AriaRole, HTMLAttributes, ReactElement, ReactNode, Ref } from 'react';
import { Role } from 'types';

export interface MessageProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'role'
> {
  ref?: Ref<HTMLDivElement>;
  icon?: ReactElement;
  header?: ReactNode;
  severity?: Role;
  actions?: ReactElement[];
  onClose?: () => void;
  compact?: boolean;
  /**
   * ARIA role for the root element. Defaults to `alert` (assertive — the
   * screen reader interrupts to announce it) for `severity="danger"`, and
   * `status` (polite) for everything else. Pass a value to override.
   */
  ariaRole?: AriaRole;
}
