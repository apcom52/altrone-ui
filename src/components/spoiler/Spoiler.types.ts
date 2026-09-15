import { HTMLAttributes, MouseEvent, ReactNode, Ref } from 'react';

export interface SpoilerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onToggle' | 'title'
> {
  ref?: Ref<HTMLDivElement>;
  title: ReactNode;
  /** Controlled open state. Omit for an uncontrolled spoiler (see `defaultOpen`). */
  open?: boolean;
  /** Initial open state for an uncontrolled spoiler. Ignored once `open` is passed. */
  defaultOpen?: boolean;
  onToggle?: (open: boolean, event: MouseEvent<HTMLButtonElement>) => void;
}
