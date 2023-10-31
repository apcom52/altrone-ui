import { DataTableCellProps } from './DataTableCell';
import { DataTableSearchFunc, DataTableSortFunc } from './functions';
import { DataTableAction, DataTableSelectableAction } from './DataTableAction.types';
import { DataTableFilter } from './DataTableFilter.types';

export interface DataTableColumn<T extends object> {
  accessor: keyof T;
  label?: string;
  width?: number | string;
  Component?: React.FC<DataTableCellProps<T>>;
  visible?: boolean;
}

export interface DataTableProps<T extends object> {
  data: T[];
  columns: DataTableColumn<T>[];
  limit?: number;
  searchBy?: keyof T;
  sortKeys?: (keyof T)[];
  sortFunc?: (params: DataTableSortFunc<T>) => number;
  searchFunc?: (params: DataTableSearchFunc<T>) => boolean;
  filters?: DataTableFilter<T>[];
  mobileColumns?: (keyof T)[];
  striped?: 'odd' | 'even';
  className?: string;
  actions?: DataTableAction[];
  selectable?: boolean;
  selectableActions?: DataTableSelectableAction<T>[];
  DataTableStatusComponent?: () => JSX.Element;
}
