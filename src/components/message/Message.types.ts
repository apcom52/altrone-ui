import { BasicComponentProps, Role } from 'types';
import { ReactElement } from 'react';

export interface MessageProps extends BasicComponentProps<HTMLDivElement> {
  icon?: ReactElement;
  header?: string | JSX.Element;
  role?: Role;
}
