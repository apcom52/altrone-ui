import React, { ReactElement } from 'react';
import { Size } from '../../types';

export type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectContext<Value = unknown> = {
  expanded: boolean;
  value?: Value;
  selectedOptions?: Option | Option[];
  disabled: boolean;
  multiple: boolean;
  clearValue: () => void;
};

export type SelectRenderItemFunc = {
  option: Option;
  checked: boolean;
  focused: boolean;
  onChange: (value: string) => void;
  index: number;
  closeDropdown: () => void;
};

export interface SelectProps<Value = unknown>
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'size' | 'value' | 'children'
  > {
  value?: Value;
  onChange: (value?: Value, event?: React.MouseEvent<HTMLElement>) => void;
  options: Option[];
  multiple?: boolean;
  clearable?: boolean;
  searchable?: boolean;
  size?: Size;
  transparent?: boolean;
  name?: string;
  placeholder?: string;
  parentWidth?: boolean;
  asChild?: boolean;
  children?: ReactElement;
  variant?: 'default' | 'transparent';
  ref?: React.Ref<HTMLDivElement>;
}
