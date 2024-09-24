import { ReactElement } from 'react';
import { Size } from '../../types';
import { RenderFunction } from '../../utils';

export type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectContext = {
  expanded: boolean;
  value?: any;
  selectedOptions?: Option | Option[];
  disabled: boolean;
  multiple: boolean;
  clearValue: () => void;
};

export interface SelectProps<Value = unknown>
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'size' | 'value'
  > {
  value?: Value;
  onChange: (value?: Value) => void;
  options: Option[];
  multiple?: boolean;
  clearable?: boolean;
  searchable?: boolean;
  size?: Size;
  transparent?: boolean;
  readonly?: boolean;
  name?: string;
  placeholder?: string;
  parentWidth?: boolean;
  Component?: RenderFunction<ReactElement, SelectContext>;
}
