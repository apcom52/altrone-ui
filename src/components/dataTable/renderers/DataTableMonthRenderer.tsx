import { DataTableCellProps } from '../DataTableCell.tsx';
import { useConfiguration } from '../../configuration';
import dayjs from 'dayjs';

export const DataTableMonthRenderer = <T extends object>({
  value,
}: DataTableCellProps<T>) => {
  const { locale } = useConfiguration();

  const date = dayjs(String(value));

  return <div>{date.format('MM.YYYY')}</div>;
};