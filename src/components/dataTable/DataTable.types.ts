import { ButtonProps } from '../button/Button.types.ts';
import { AnyObject, StrictReactElements } from '../../utils';
import { ReactElement, ReactNode } from 'react';
import { Table } from '@tanstack/react-table';
import type { DataTableFeatures } from './DataTable.features.ts';

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

/** One entry of the table's active filter state, mirrors TanStack's `ColumnFilter`. */
export interface DataTableFilter {
  /** Column id — equal to the column's `accessor`. */
  id: string;
  value: DataTableFilterValue;
}

export interface DataTableFilterValue {
  /** One of the `*FilterRules` values for the column's type. */
  rule: string;
  /** The compared value. A tuple for `between`-style rules, absent for `empty`/`notEmpty`. */
  value?: unknown;
  /** Carried for `date` columns so the filter function knows the comparison granularity. */
  level?: 'day' | 'month' | 'year';
}

export interface DataTableColumnBase<T extends object> {
  accessor: keyof T;
  label?: string;
  width?: number;
  visible?: boolean;
  filterable?: boolean | DataTableColumnType;
  sortable?: boolean;
  /** Opt this column out of resizing when the table has `resizableColumns`. */
  resizable?: boolean;
}

export interface CurrencyColumnOptions<T extends object> {
  currency?: string;
  currencyAccessor?: keyof T;
}

export interface NumberColumnOptions {
  digitsAfterPoint?: number;
}

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

export type DataTableRenderRowActionsContext<T extends object = AnyObject> = {
  row: T;
  rowIndex: number;
  selected: boolean;
};

export type DataTableMode = 'loading' | 'read' | 'select';

/** Per-table `meta`, reachable in cell renderers via `table.options.meta`. */
export interface DataTableMeta {
  mode: DataTableMode;
}

/** Per-column `meta`, reachable via `column.columnDef.meta`. */
export interface DataTableColumnMeta<T extends object = AnyObject> {
  dataType: DataTableColumnType;
  options: DataTableColumn<T>['options'];
  columnConfig: DataTableColumn<T>;
}

export interface DataTableProps<T extends object>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  ref?: React.Ref<HTMLDivElement>;
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
  /** Lets every column be resized by dragging its header edge. Off by default. */
  resizableColumns?: boolean;
  renderRowActions?: (
    context: DataTableRenderRowActionsContext<T>,
  ) => ReactElement<DataTableRowActionsProps>;
  defaultPage?: number;
  defaultSort?: Sorting;
  defaultFilters?: DataTableFilter[];
  onPageChange?: (currentPage: number) => void;
  onSortChange?: (sort?: Sorting) => void;
  onFilterChange?: (appliedFilters: DataTableFilter[]) => void;
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

export interface FilterRowProps {
  filter: DataTableFilter;
  changeFilter: (field: keyof DataTableFilterValue, value: unknown) => void;
  deleteFilter: () => void;
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

export interface CellRenderer<T extends object = AnyObject> {
  value: unknown;
  item: T;
  columnConfig: DataTableColumn<T>;
  table: Table<DataTableFeatures, T>;
}
