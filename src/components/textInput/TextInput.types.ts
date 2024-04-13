import React, { ChangeEvent, ReactElement } from 'react';
import { BasicComponentProps, Size } from 'types';

export interface TextInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
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
}

export interface TextIslandProps extends BasicComponentProps {
  label: string;
  placement?: 'left' | 'right';
}

export interface IconIslandProps extends BasicComponentProps {
  icon: ReactElement;
  placement?: 'left' | 'right';
}
