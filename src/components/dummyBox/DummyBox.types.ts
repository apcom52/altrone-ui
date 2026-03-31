import React from 'react';

export interface DummyBoxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  ref?: React.Ref<HTMLDivElement>;
  width?: string;
  height?: string;
  radius?: string;
}
