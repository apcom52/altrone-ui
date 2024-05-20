import { DataTableCellProps } from './DataTableCell';
import { DataTableSearchFunc, DataTableSortFunc } from './functions';
import { DataTableFilter } from './DataTableFilter.types';
import { SafeReactElement } from '../../../types';
import { ButtonProps } from '../button/Button.types.ts';

export type Sort = 'asc' | 'desc';
export type Striped = 'odd' | 'even';

export interface DataTableColumn<T extends object> {
  accessor: keyof T;
  label?: string;
  width?: number | string;
  Component?: React.FC<DataTableCellProps<T>>;
  visible?: boolean;
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
