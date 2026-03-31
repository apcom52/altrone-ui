import { ColorPreset } from 'components/colorPicker';
import { Option } from 'components/select/Select.types';
import { ReactNode } from 'react';

export type DataGridModeType = 'loading' | 'read' | 'edit';

type DataGridBaseField = {
  accessor: string;
  label?: string;
  visible?: boolean;
  editable?: boolean;
  group?: string;
  placeholder?: string;
};

export type DataGridGroupType = {
  name: string;
  title?: string;
  visible?: boolean;
};

export type DataGridStringField = DataGridBaseField & {
  type: 'string';
  maxLength?: number;
};

export type DataGridTextField = DataGridBaseField & {
  type: 'text';
  maxLength?: number;
};

export type DataGridNumberField = DataGridBaseField & {
  type: 'number';
  min?: number;
  max?: number;
  allowNegative?: boolean;
  digitsAfterPoint?: number;
};

export type DataGridCurrencyField = Omit<DataGridNumberField, 'type'> & {
  type: 'currency';
  currency: string;
};

export type DataGridPasswordField = DataGridBaseField & {
  type: 'password';
};

export type DataGridDateField = DataGridBaseField & {
  type: 'date';
  level?: 'day' | 'month' | 'year';
  minDate?: string;
  maxDate?: string;
  format?: string;
  clearable?: boolean;
};

export type DataGridBooleanField = DataGridBaseField & {
  type: 'boolean';
  trueLabel?: ReactNode;
  falseLabel?: ReactNode;
};

export type DataGridSelectField = DataGridBaseField & {
  type: 'select';
  multiple?: boolean;
  options: Option[];
  clearable?: boolean;
};

export type DataGridLinkField = DataGridBaseField & {
  type: 'link';
  linkTransformer?: (value: unknown) => string;
  linkText?: string | ((value: unknown) => string);
};

export type DataGridColorField = DataGridBaseField & {
  type: 'color';
  colorPresets?: ColorPreset[];
  allowPalette?: boolean;
  clearable?: boolean;
};

export type DataGridCustomField = DataGridBaseField & {
  type: 'custom';
  renderReadMode: (value: unknown) => ReactNode;
  renderEditMode: (value: unknown) => ReactNode;
  renderLoadingMode?: (value: unknown) => ReactNode;
};

export type DataGridFieldType =
  | DataGridStringField
  | DataGridTextField
  | DataGridNumberField
  | DataGridCurrencyField
  | DataGridPasswordField
  | DataGridDateField
  | DataGridBooleanField
  | DataGridSelectField
  | DataGridLinkField
  | DataGridColorField
  | DataGridCustomField;

export interface DataGridProps<T extends Record<string, unknown> = Record<string, unknown>>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'> {
  ref?: React.Ref<HTMLDivElement>;
  data: T;
  fields: DataGridFieldType[];
  onChange: (field: string, value: unknown) => void;
  onChangeMode?: (mode: DataGridModeType) => void;

  groups?: DataGridGroupType[];
  showToolbar?: boolean;
  mode?: DataGridModeType;
}

export type DataGridFieldProps = DataGridFieldType & {
  value: unknown;
  onChange: (value: unknown) => void;
  mode: DataGridModeType;
};
