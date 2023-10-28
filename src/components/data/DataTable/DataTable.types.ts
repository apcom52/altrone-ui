import { Picker } from '../../form';

type FilterSelect = {
  type: 'select';
};

type FilterCheckboxList = {
  type: 'checkboxList';
};

type FilterCheckbox = {
  type: 'checkbox';
};

type FilterDate = {
  type: 'date';
  useRange?: boolean;
  picker?: Picker;
};

type BaseTableFilter<T> = {
  accessor: keyof T;
  label?: string;
  defaultValue?: unknown;
};

export type DataTableFilter<T> = BaseTableFilter<T> &
  (FilterSelect | FilterCheckboxList | FilterCheckbox | FilterDate);
