import { DataTableCellProps } from '../DataTableCell.tsx';

export const DataTableNumberRenderer = <T extends object>({
  value,
}: DataTableCellProps<T>) => {
  if (value === undefined || value === null) {
    return <div>—</div>;
  }
  g;
  return <div>{String(value)}</div>;
};
