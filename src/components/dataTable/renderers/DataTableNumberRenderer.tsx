import { DataTableCellProps } from '../DataTableCell.tsx';

export const DataTableNumberRenderer = <T extends object>({
  value,
}: DataTableCellProps<T>) => {
  if (value === undefined) {
    return <div>—</div>;
  }

  return <div>{String(value)}</div>;
};
