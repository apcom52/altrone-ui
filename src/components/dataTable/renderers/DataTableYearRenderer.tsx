import { DataTableCellProps } from '../DataTableCell.tsx';
import { useConfiguration } from '../../configuration';
import dayjs from 'dayjs';

export const DataTableYearRenderer = <T extends object>({
  value,
}: DataTableCellProps<T>) => {
  const { locale } = useConfiguration();

  const date = dayjs(String(value));

  return <div>{date.format('YYYY')}</div>;
};
