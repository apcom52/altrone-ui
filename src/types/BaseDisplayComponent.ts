import React, { JSX } from 'react';

export interface BaseDisplayComponent<
  Component extends keyof JSX.IntrinsicElements,
> extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  component?: Component;
}
