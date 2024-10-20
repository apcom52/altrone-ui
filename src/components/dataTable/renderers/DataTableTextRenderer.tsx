import { DataTableCellProps } from '../DataTableCell.tsx';

export const DataTableTextRenderer = <T extends object>({
  value,
}: DataTableCellProps<T>) => {
  return <div>{String(value)}</div>;
};
