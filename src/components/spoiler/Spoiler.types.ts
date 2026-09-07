import { HTMLAttributes, MouseEvent, ReactNode, Ref } from 'react';

export interface SpoilerProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onToggle' | 'title'
> {
  ref?: Ref<HTMLDivElement>;
  title: ReactNode;
  openedByDefault?: boolean;
  onToggle?: (opened: boolean, event: MouseEvent<HTMLButtonElement>) => void;
}
