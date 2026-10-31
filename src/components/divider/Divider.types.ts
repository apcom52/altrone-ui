import React from 'react';
import { Orientation } from 'types';

export interface DividerProps
  extends Omit<React.HTMLAttributes<HTMLHRElement>, 'children'> {
  ref?: React.Ref<HTMLHRElement>;
  orientation?: Orientation;
}
