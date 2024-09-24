import { ChangeEvent } from 'react';

export interface CheckboxProps
  extends Omit<
    React.InputHTMLAttributes<HTMLLabelElement>,
    'onChange' | 'type'
  > {
  indeterminate?: boolean;
  danger?: boolean;
  onChange?: (state: boolean, e: ChangeEvent) => void;
}
