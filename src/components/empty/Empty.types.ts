import React from 'react';

export interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.Ref<HTMLDivElement>;
  icon?: React.ReactNode;
  transparent?: boolean;
}
