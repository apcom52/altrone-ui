import React, { ChangeEvent } from 'react';
import { Size } from 'types';

export interface TextInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'size'
  > {
  value: string;
  onChange: (value: string, event: ChangeEvent) => void;
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
  invalid?: boolean;
  size?: Size;
  rainbowEffect?: boolean;
  transparent?: boolean;
}
