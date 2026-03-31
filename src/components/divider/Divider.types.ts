import React from 'react';
import { Direction } from 'types';

export interface DividerProps
  extends Omit<React.HTMLAttributes<HTMLHRElement>, 'children'> {
  ref?: React.Ref<HTMLHRElement>;
  direction?: Direction;
}
