import React, { ChangeEvent, PropsWithChildren, ReactElement } from 'react';
import { Size } from 'types';

export interface TextInputProps
  extends PropsWithChildren,
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      'onChange' | 'size' | 'children'
    > {
  value?: string;
  onChange?: (value: string, event: ChangeEvent) => void;
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
  invalid?: boolean;
  size?: Size;
  rainbowEffect?: boolean;
  transparent?: boolean;
  Component?: ReactElement;
  readonlyStyles?: boolean;
}

export interface TextIslandProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  placement?: 'left' | 'right';
}

export interface IconIslandProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: ReactElement;
  placement?: 'left' | 'right';
}

export interface LoadingIslandProps
  extends React.HTMLAttributes<HTMLDivElement> {
  placement?: 'left' | 'right';
}

type MergedActionIslandProps = React.ButtonHTMLAttributes<HTMLElement>;

export interface ActionIslandProps
  extends Omit<MergedActionIslandProps, 'role' | 'onClick'> {
  label: string;
  icon?: ReactElement;
  showLabel?: boolean;
  placement?: 'left' | 'right';
  danger?: boolean;
  onClick?: () => void;
}

export interface CustomIslandProps
  extends React.HTMLAttributes<HTMLDivElement> {
  placement?: 'left' | 'right';
}
