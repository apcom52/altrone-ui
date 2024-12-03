import { DataTableCellProps } from '../DataTableCell.tsx';
import { dayjsInstance as dayjs } from '../../calendar/Calendar.tsx';
import { useLocale } from 'utils';

export const DataTableMonthRenderer = <T extends object>({
  value,
}: DataTableCellProps<T>) => {
  const locale = useLocale();

  const date = dayjs(String(value)).locale(locale.locale);

  return <div>{date.format(locale?.monthFormat)}</div>;
};
