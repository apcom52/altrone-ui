import React, { ReactElement } from 'react';
import { Size } from '../../types';

export type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectValue = string | string[];

export type SelectContextValue = {
  /** Whether the dropdown is open. */
  expanded: boolean;
  value: SelectValue | undefined;
  /** Resolved option(s) for the current value — one for single, array for `multiple`. */
  selectedOptions: Option | Option[] | undefined;
  disabled: boolean;
  multiple: boolean;
  clearValue: (
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => void;
};

export type SelectRenderContext = SelectContextValue & {
  className: string;
  style?: React.CSSProperties;
};

export interface SelectProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'size' | 'value' | 'children' | 'defaultValue'
  > {
  value?: SelectValue;
  onChange: (
    value: SelectValue | undefined,
    event?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>,
  ) => void;
  options: Option[];
  multiple?: boolean;
  clearable?: boolean;
  searchable?: boolean;
  size?: Size;
  transparent?: boolean;
  name?: string;
  placeholder?: string;
  parentWidth?: boolean;
  /** Fixed height of the scrollable options list, px. Defaults to the `--select-menu-height` token. */
  menuHeight?: number;
  asChild?: boolean;
  children?: ReactElement;
  /**
   * Replaces the default `TextInput` trigger. Receives the live select state;
   * read the same state from a nested component via `useSelectContext()`.
   *
   * @example
   * renderFunc={({ expanded, selectedOptions }) => (
   *   <Button label={(selectedOptions as Option)?.label}
   *     additionalIcon={expanded ? <ChevronUp /> : <ChevronDown />} />
   * )}
   */
  renderFunc?: (context: SelectRenderContext) => ReactElement;
  ref?: React.Ref<HTMLDivElement>;
}
