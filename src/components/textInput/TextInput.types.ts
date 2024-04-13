import React, { ChangeEvent, ReactElement } from 'react';
import { BasicComponentProps, Size } from 'types';

export interface TextInputProps
  extends Omit<
    BasicComponentProps & React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'size' | 'children'
  > {
  children?: ReactElement | ReactElement[] | null;
  value: string;
  onChange: (value: string, event: ChangeEvent) => void;
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
  invalid?: boolean;
  size?: Size;
  rainbowEffect?: boolean;
  transparent?: boolean;
  Component?: ReactElement;
}

export interface TextIslandProps extends BasicComponentProps {
  label: string;
  placement?: 'left' | 'right';
}

export interface IconIslandProps extends BasicComponentProps {
  icon: ReactElement;
  placement?: 'left' | 'right';
}

type MergedActionIslandProps = BasicComponentProps &
  React.ButtonHTMLAttributes<HTMLElement>;

export interface ActionIslandProps
  extends Omit<MergedActionIslandProps, 'role' | 'onClick'> {
  label: string;
  icon?: ReactElement;
  showLabel?: boolean;
  placement?: 'left' | 'right';
  danger?: boolean;
  onClick?: () => void;
}

export interface CustomIslandProps extends BasicComponentProps {
  placement?: 'left' | 'right';
}
