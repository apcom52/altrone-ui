import React, { PropsWithChildren } from 'react';

export interface BasicComponentStyleConfig {
  className?: string;
  style?: React.CSSProperties;
}

export interface BasicComponentProps
  extends PropsWithChildren,
    BasicComponentStyleConfig,
    React.HTMLAttributes<HTMLElement> {}
