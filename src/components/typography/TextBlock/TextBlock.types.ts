import { PropsWithChildren } from 'react';
import { Size } from '../../../types';

export interface TextBlockProps extends PropsWithChildren {
  role?: 'text' | 'heading';
  size?: Size;
  className?: string;
  ellipsis?: boolean;
  rows?: number;
  id?: string;
}
