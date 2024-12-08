import { DataTableColumn } from './DataTable.types.ts';

export interface DataTableCellProps<T extends object> {
  item: T;
  accessor: keyof T;
  value: unknown;
  rowIndex: number;
  columnIndex: number;
  columnOptions: DataTableColumn<T>['options'];
}

const DataTableCell = <T extends object>({ value }: DataTableCellProps<T>) => {
  return <>{String(value)}</>;
};

export default DataTableCell;
