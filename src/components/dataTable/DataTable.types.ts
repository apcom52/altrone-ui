import { DataTableCellProps } from './DataTableCell';
import { ButtonProps } from '../button/Button.types.ts';
import { AnyObject } from '../../utils';
import { Option } from '../select/Select.types.ts';
import { ReactElement } from 'react';
import { RenderFuncProp } from '../../types';

export type Sort = 'asc' | 'desc';
export type DataTableColumnType =
  | 'text'
  | 'number'
  | 'boolean'
  | 'array'
  | 'currency'
  | 'date'
  | 'month'
  | 'year';

export interface DataTableColumn<T extends object> {
  accessor: keyof T;
  type?: DataTableColumnType;
  label?: string;
  width?: number | string;
  Component?: React.FC<DataTableCellProps<T>>;
  renderFunc?: RenderFuncProp<HTMLDivElement, DataTableCellProps<T>>;
  visible?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  options?: Partial<{
    currency: string;
    currencyAccessor: keyof T;
    arrayDelimiter: string;
    arrayAccessor: string;
  }>;
}

export type DataTableRenderContext<T extends object> = {
  selectableMode: boolean;
  selectedItems: T[];
};

export interface DataTableProps<T extends object>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  data: T[];
  columns: DataTableColumn<T>[];
  children?:
    | ReactElement
    | ReactElement[]
    | ((context: DataTableRenderContext<T>) => ReactElement | ReactElement[]);
  rowsPerPage?: number;
  selectable?: boolean;
  showFooter?: boolean;
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

export enum BooleanFilterRules {
  positive = 'positive',
  negative = 'negative',
}

export enum FilterType {
  string = 'string',
  number = 'number',
  array = 'array',
  boolean = 'boolean',
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

export type BooleanFilter = {
  field: string;
  type: FilterType.boolean;
  conditions: {
    rule: BooleanFilterRules;
    join: 'AND' | 'OR';
    value: unknown;
  }[];
};

export type Filter = StringFilter | NumberFilter | ArrayFilter | BooleanFilter;

export interface FilterRowProps<T extends AnyObject> {
  filter: Filter;
  filterIndex: number;
  columns: DataTableColumn<T>[];
  changeFilter: (
    filterIndex: number,
    accessor: string,
    type?: DataTableColumnType,
  ) => void;
  changeField: (filterIndex: number, field: string, value: unknown) => void;
  deleteFilter: (filterIndex: number, source: 'delete' | 'field') => void;
}

export interface FilterFuncArgs<T extends AnyObject, FilterType> {
  row: T;
  filter: FilterType;
}
