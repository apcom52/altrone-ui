import React, { PropsWithChildren } from 'react';

export interface BasicComponentStyleConfig {
  className?: string;
  style?: React.CSSProperties;
}

export interface BasicComponentProps<
  ElementType extends HTMLElement = HTMLElement,
> extends PropsWithChildren,
    React.HTMLAttributes<ElementType>,
    BasicComponentStyleConfig {
  id?: string;
}
