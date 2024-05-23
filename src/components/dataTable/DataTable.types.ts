import { DataTableCellProps } from './DataTableCell';
import { SafeReactElement } from '../../../types';
import { ButtonProps } from '../button/Button.types.ts';
import { AnyObject } from '../../utils';
import { Option } from '../select/Select.types.ts';

export type Sort = 'asc' | 'desc';
export type Striped = 'odd' | 'even';

export interface DataTableColumn<T extends object> {
  accessor: keyof T;
  label?: string;
  width?: number | string;
  Component?: React.FC<DataTableCellProps<T>>;
  visible?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  searchable?: boolean;
}

export type DataTableRenderContext<T extends object> = {
  selectableMode: boolean;
  selectedItems: T[];
};

export interface DataTableProps<T extends object>
  extends React.HTMLAttributes<HTMLDivElement> {
  data: T[];
  columns: DataTableColumn<T>[];
  children?:
    | SafeReactElement
    | ((context: DataTableRenderContext<T>) => SafeReactElement);
  limit?: number; // need to rename to rowsPerPage
  selectable?: boolean;
}

export interface DataTableActionProps extends ButtonProps {
  showLabel?: boolean;
}

export enum StringFilterRules {
  empty = 'empty',
  notEmpty = 'notEmpty',
  contain = 'contains',
  notContain = 'notContains',
  equal = 'equal',
  notEqual = 'notEqual',
}

export enum NumberFilterRules {
  empty = 'empty',
  notEmpty = 'notEmpty',
  equal = 'equal',
  notEqual = 'notEqual',
  gt = 'gt',
  gte = 'gte',
  lt = 'lt',
  lte = 'lte',
  between = 'between',
  notBetween = 'notBetween',
}

export enum ArrayFilterRules {
  has = 'has',
  notHas = 'notHas',
}

export enum FilterType {
  string = 'string',
  number = 'number',
  array = 'array',
}

export type StringFilter = {
  field: string;
  type: FilterType.string;
  conditions: {
    rule: StringFilterRules;
    join: 'AND' | 'OR';
    value: string;
  }[];
};

export type NumberFilter = {
  field: string;
  type: FilterType.number;
  conditions: {
    rule: NumberFilterRules;
    join: 'AND' | 'OR';
    value: number;
    minValue?: number;
    maxValue?: number;
  }[];
};

export type ArrayFilter = {
  field: string;
  type: FilterType.array;
  conditions: {
    rule: ArrayFilterRules;
    join: 'AND' | 'OR';
    value: unknown[];
    options: Option[];
  }[];
};

export type Filter = StringFilter | NumberFilter | ArrayFilter;

export interface FilterRowProps<T extends AnyObject> {
  filter: Filter;
  filterIndex: number;
  columns: DataTableColumn<T>[];
  changeField: (filterIndex: number, field: string, value: unknown) => void;
  deleteFilter: (filterIndex: number) => void;
}

export interface SearchFuncArgs<T extends AnyObject> {
  row: T;
  columns: DataTableColumn<T>[];
  search: string;
}

export interface FilterFuncArgs<T extends AnyObject, FilterType> {
  row: T;
  filter: FilterType;
}
