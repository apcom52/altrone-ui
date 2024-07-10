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
  value?: string | string[];
  selectedOptions?: Option | Option[];
  disabled: boolean;
  multiple: boolean;
  clearValue: () => void;
};

export interface SelectProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    'onChange' | 'size' | 'value'
  > {
  value: string | string[] | undefined;
  onChange: (value?: string | string[]) => void;
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
