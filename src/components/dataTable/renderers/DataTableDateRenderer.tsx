import { DataTableCellProps } from '../DataTableCell.tsx';
import { dayjsInstance as dayjs } from '../../calendar/Calendar.tsx';
import { useLocale } from 'utils';

export const DataTableDateRenderer = <T extends object>({
  value,
}: DataTableCellProps<T>) => {
  if (value === undefined || value === null) {
    return <div>—</div>;
  }

  const locale = useLocale();

  const date = dayjs(String(value)).locale(locale.locale);

  return <div>{date.format(locale?.dateFormat)}</div>;
};
