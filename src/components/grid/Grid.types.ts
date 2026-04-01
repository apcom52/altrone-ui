import React from 'react';
import { Gap } from 'types';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  wrap?: boolean;
  gap?: Gap;
  rowGap?: Gap;
}

export interface GridColumnProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'size'> {
  ref?: React.Ref<HTMLDivElement>;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto';
  offset?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
}
