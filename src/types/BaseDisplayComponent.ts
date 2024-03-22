import React from 'react';

export interface BasicComponentStyleConfig {
  className?: string;
  style?: React.CSSProperties;
}

export interface BasicComponentProps
  extends React.HTMLAttributes<HTMLElement>,
    BasicComponentStyleConfig {
  id?: string;
  children?: React.ReactNode;
}
