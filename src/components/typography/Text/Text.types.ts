import { PropsWithChildren } from 'react';

export interface TextProps extends PropsWithChildren {
  role?: 'text' | 'label' | 'code' | 'keyboard';
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  deleted?: boolean;
  highlighted?: boolean;
  link?: string;
  maxChars?: number;
  ellipsis?: boolean;
  color?: 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'disabled';
  className?: string;
}
