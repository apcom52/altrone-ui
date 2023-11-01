export interface DataTableCellProps<T extends object> {
  item: T;
  accessor: keyof T;
  value: unknown;
  rowIndex: number;
  columnIndex: number;
}

const DataTableCell = <T extends object>({ value }: DataTableCellProps<T>) => {
  return <>{String(value)}</>;
};

export default DataTableCell;
