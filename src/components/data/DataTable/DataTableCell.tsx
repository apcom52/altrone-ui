import { memo } from 'react';

export interface DataTableCellProps {
  item: unknown;
  accessor: string;
  value: unknown;
  rowIndex: number;
  columnIndex: number;
}

const DataTableCell = ({ value }: DataTableCellProps) => {
  return <>{String(value)}</>;
};

export default memo(DataTableCell);
