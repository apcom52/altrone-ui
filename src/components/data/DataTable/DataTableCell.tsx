import { memo } from 'react';

export interface DataTableCellProps {
  item: unknown;
  accessor: string;
  value: unknown;
  rowIndex: number;
  columnIndex: number;
}

const DataTableCell = ({ value }: DataTableCellProps) => {
  return <>{value.toString()}</>;
};

export default memo(DataTableCell);
