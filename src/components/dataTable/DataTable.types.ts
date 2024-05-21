import { DataTableCellProps } from './DataTableCell';
import { DataTableSearchFunc, DataTableSortFunc } from './functions';
import { DataTableFilter } from './DataTableFilter.types';
import { SafeReactElement } from '../../../types';
import { ButtonProps } from '../button/Button.types.ts';
import { T } from 'vitest/dist/reporters-P7C2ytIv';

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

export interface DataTableProps<T extends object> {
  data: T[];
  columns: DataTableColumn<T>[];
  children?:
    | SafeReactElement
    | ((context: DataTableRenderContext<T>) => SafeReactElement);
  limit?: number;
  searchBy?: keyof T;
  sortKeys?: (keyof T)[];
  sortFunc?: (params: DataTableSortFunc<T>) => number;
  searchFunc?: (params: DataTableSearchFunc<T>) => boolean;
  filters?: DataTableFilter<T>[];
  mobileColumns?: (keyof T)[];
  striped?: Striped;
  className?: string;
  selectable?: boolean;
  DataTableStatusComponent?: () => JSX.Element;
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

export enum FilterType {
  string = 'string',
  number = 'number',
}

type StringFilter = {
  type: FilterType.string;
  conditions: {
    rule: StringFilterRules;
    join: 'AND' | 'OR';
    value: string;
  }[];
};

type NumberFilter = {
  type: FilterType.number;
  conditions: {
    rule: NumberFilterRules;
    join: 'AND' | 'OR';
    value: number;
    minValue?: number;
    maxValue?: number;
  }[];
};

export type Filter = { field: string } & (StringFilter | NumberFilter);

export interface FilterRowProps {
  filter: Filter;
  filterIndex: number;
  columns: DataTableColumn<T>[];
  changeField: (filterIndex: number, field: string, value: unknown) => void;
  deleteFilter: (filterIndex: number) => void;
}
