import React, { ChangeEvent } from 'react';

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string, event: ChangeEvent) => void;
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
  invalid?: boolean;
}
