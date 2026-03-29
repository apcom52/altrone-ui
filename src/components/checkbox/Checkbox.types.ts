import React, { ChangeEvent } from 'react';

export interface CheckboxProps
  extends Omit<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    'onChange'
  > {
  ref?: React.Ref<HTMLLabelElement>;
  checked?: boolean;
  indeterminate?: boolean;
  danger?: boolean;
  disabled?: boolean;
  name?: string;
  onChange?: (state: boolean, e: ChangeEvent) => void;
}
