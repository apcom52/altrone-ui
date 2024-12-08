import { DataTableCellProps } from '../DataTableCell.tsx';

export const DataTableNumberRenderer = <T extends object>({
  value,
}: DataTableCellProps<T>) => {
  return <div>{String(value)}</div>;
};
