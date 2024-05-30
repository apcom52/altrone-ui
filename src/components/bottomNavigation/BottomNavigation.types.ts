import { ReactElement } from 'react';

export interface BottomNavigationProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface BottomNavigationItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  icon: ReactElement;
  label: string;
  selected?: boolean;
}
