import { ChangeEvent, ReactElement } from 'react';
import { Size } from '../../types';
import { RenderFunction } from '../../utils';

export type Option = {
  value: string;
  label: str;
  disabled?: boolean;
};

export type SelectContext = {
  expanded: boolean;
  value: string;
  onClick: () => void;
  disabled: boolean;
  multiple: boolean;
};

export interface SelectProps
  extends Omit<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    'onChange' | 'size' | 'value'
  > {
  value: string | string[];
  onChange: (value: string | string[]) => void;
  options: Option[];
  multiple?: boolean;
  maxCount?: number;
  clearable?: boolean;
  searchable?: boolean;
  size?: Size;
  transparent?: boolean;
  readonly?: boolean;
  name?: string;
  placeholder?: string;
  Component?: RenderFunction<ReactElement, SelectContext>;
}
