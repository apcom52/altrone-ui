import { Picker } from '../../form';

type FilterSelect = {
  type: 'select';
  placeholder?: string;
};

type FilterCheckboxList = {
  type: 'checkboxList';
  hasArrayValue?: boolean;
};

type FilterCheckbox = {
  type: 'checkbox';
};

type FilterDate = {
  type: 'date';
  useRange?: boolean;
  picker?: Picker;
  placeholder?: string;
};

type BaseTableFilter<T> = {
  accessor: keyof T;
  label?: string;
  defaultValue?: unknown;
};

export type DataTableFilter<T> = BaseTableFilter<T> &
  (FilterSelect | FilterCheckboxList | FilterCheckbox | FilterDate);

export interface DataTableAppliedFilter<T> extends Record<string, unknown> {
  accessor: keyof T;
  value: any;
}
