import React, { ChangeEvent } from 'react';
import { Size } from 'types';

export interface CheckboxProps
  extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
  ref?: React.Ref<HTMLLabelElement>;
  checked?: boolean;
  indeterminate?: boolean;
  danger?: boolean;
  disabled?: boolean;
  name?: string;
  size?: Size;
  onChange?: (state: boolean, event: ChangeEvent<HTMLInputElement>) => void;
}
