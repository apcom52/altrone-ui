import { DataTableCellProps } from '../DataTableCell.tsx';
import { dayjsInstance as dayjs } from '../../calendar/Calendar.tsx';
import { useLocale } from '../../../utils/hooks/useLocale.ts';

export const DataTableYearRenderer = <T extends object>({
  value,
}: DataTableCellProps<T>) => {
  const locale = useLocale();

  const date = dayjs(String(value));

  return <div>{date.format(locale?.yearFormat)}</div>;
};
