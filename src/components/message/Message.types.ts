import { Role } from 'types';
import { ReactElement } from 'react';

export interface MessageProps
  extends Omit<React.HTMLProps<HTMLDivElement>, 'wrap'> {
  icon?: ReactElement;
  header?: string | JSX.Element;
  role?: Role;
}
