import { ButtonProps } from '../button/Button.types.ts';
import { AnyObject, StrictReactElements } from '../../utils';
import { Option } from '../select/Select.types.ts';
import { ReactElement, ReactNode } from 'react';
import { ColumnFilter, Table } from '@tanstack/react-table';

export type Sort = 'asc' | 'desc';
export type DataTableColumnType =
  | 'string'
  | 'text'
  | 'number'
  | 'currency'
  | 'password'
  | 'date'
  | 'boolean'
  | 'select'
  | 'link'
  | 'color'
  | 'custom';

export type Sorting = {
  field: string;
  direction: Sort;
};

// Базовый интерфейс колонки
export interface DataTableColumnBase<T extends object> {
  accessor: keyof T;
  label?: string;
  width?: number;
  visible?: boolean;
  filterable?: boolean | DataTableColumnType;
  sortable?: boolean;
}

// Специфичные опции для разных типов колонок
export interface CurrencyColumnOptions<T extends object> {
  currency?: string;
  currencyAccessor?: keyof T;
}

export interface NumberColumnOptions {
  digitsAfterPoint?: number;
}

export interface ArrayColumnOptions {
  arrayDelimiter?: string;
  arrayAccessor?: string;
}

// Типы колонок с их специфичными опциями
export type DataTableColumn<T extends object> =
  | (DataTableColumnBase<T> & {
      type?: 'string' | 'text';
      options?: never;
    })
  | (DataTableColumnBase<T> & {
      type: 'number';
      options?: NumberColumnOptions;
    })
  | (DataTableColumnBase<T> & {
      type: 'currency';
      options?: CurrencyColumnOptions<T>;
    })
  | (DataTableColumnBase<T> & {
      type: 'date';
      options?: { level?: 'day' | 'month' | 'year'; format?: string };
    })
  | (DataTableColumnBase<T> & {
      type: 'boolean';
      options?: never;
    })
  | (DataTableColumnBase<T> & {
      type: 'password';
      options?: never;
    })
  | (DataTableColumnBase<T> & {
      type: 'select';
      options?: never;
    })
  | (DataTableColumnBase<T> & {
      type: 'link';
      options?: {
        hrefTransformer?: (value: unknown, item: T) => string | undefined;
        textTransformer?: (value: unknown, item: T) => string | undefined;
      };
    })
  | (DataTableColumnBase<T> & {
      type: 'color';
      options?: {
        colorPresets?: string[];
      };
    })
  | (DataTableColumnBase<T> & {
      type: 'custom';
      options?: {
        renderReadMode: ({ value, item }: CellRenderer<T>) => ReactNode;
        renderLoadingMode?: ({ value, item }: CellRenderer<T>) => ReactNode;
      };
    });

export type DataTableRenderContext<T extends object> = {
  selectableMode: boolean;
  selectedItems: T[];
};

export type DataTableRenderRowActionsContext = {
  row: object;
  rowIndex: number;
  selected: boolean;
};

export type DataTableMode = 'loading' | 'read' | 'select';

export interface DataTableProps<T extends object>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  data: T[];
  columns: DataTableColumn<T>[];
  children?:
    | ReactElement
    | ReactElement[]
    | ((context: DataTableRenderContext<T>) => ReactElement | ReactElement[]);
  mode?: DataTableMode;
  rowsPerPage?: number;
  selectable?: boolean;
  showFooter?: boolean;
  showEmptyBanner?: boolean;
  renderRowActions?: (
    context: DataTableRenderRowActionsContext
  ) => ReactElement<DataTableRowActionsProps>;
  defaultPage?: number;
  defaultSort?: Sorting;
  defaultFilters?: Filter[];
  onPageChange?: (currentPage: number) => void;
  onSortChange?: (sort?: Sorting) => void;
  onFilterChange?: (appliedFilters?: Filter[]) => void;
  onModeChange?: (mode: DataTableMode) => void;
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

export enum SelectFilterRules {
  has = 'has',
  notHas = 'notHas',
}

export enum ColorFilterRules {
  has = 'has',
  notHas = 'notHas',
}

export enum BooleanFilterRules {
  positive = 'positive',
  negative = 'negative',
}

export enum DateFilterRules {
  empty = 'empty',
  notEmpty = 'notEmpty',
  equal = 'equal',
  notEqual = 'notEqual',
  gt = 'gt',
  gte = 'gte',
  lt = 'lt',
  lte = 'lte',
  between = 'between',
  beyond = 'beyond',
}

export enum PasswordFilterRules {
  empty = 'empty',
  notEmpty = 'notEmpty',
}

export enum FilterType {
  string = 'string',
  number = 'number',
  array = 'array',
  boolean = 'boolean',
  date = 'date',
  password = 'password',
}

export type StringFilter = {
  field: string;
  type: FilterType.string;
  columnType: DataTableColumnType;
  conditions: {
    rule: StringFilterRules;
    join: 'AND' | 'OR';
    value: string;
  }[];
};

export type NumberFilter = {
  field: string;
  type: FilterType.number;
  columnType: DataTableColumnType;
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
  columnType: DataTableColumnType;
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
  columnType: DataTableColumnType;
  conditions: {
    rule: BooleanFilterRules;
    join: 'AND' | 'OR';
    value: unknown;
  }[];
};

export type DateFilter = {
  field: string;
  type: FilterType.date;
  columnType: DataTableColumnType;
  conditions: {
    rule: DateFilterRules;
    join: 'AND' | 'OR';
    value?: string;
    minValue?: string;
    maxValue?: string;
  }[];
};

export type PasswordFilter = {
  field: string;
  type: FilterType.password;
  columnType: DataTableColumnType;
  conditions: {
    rule: PasswordFilterRules;
    join: 'AND' | 'OR';
    value?: string;
  }[];
};

export type Filter =
  | StringFilter
  | NumberFilter
  | ArrayFilter
  | BooleanFilter
  | DateFilter
  | PasswordFilter;

export interface FilterRowProps {
  filter: ColumnFilter;
  changeFilter: (field: string, value: unknown) => void;
  deleteFilter: () => void;
}

export interface FilterFuncArgs<T extends AnyObject, FilterType> {
  row: T;
  filter: FilterType;
}

export interface DataTableBodyProps<T extends object> {
  showEmptyBanner?: boolean;
  renderRowActions?: DataTableProps<T>['renderRowActions'];
}

export interface DataTableRowActionProps
  extends Omit<ButtonProps, 'label' | 'onClick' | 'renderFunc'> {
  label: string;
  collapsed?: boolean;
  onClick?: () => void;
}

export interface DataTableRowActionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: StrictReactElements<DataTableRowActionProps>;
}

export interface CellRenderer<T extends object = any> {
  value: unknown;
  item: T;
  columnConfig: DataTableColumn<T>;
  table: Table<T>;
}
