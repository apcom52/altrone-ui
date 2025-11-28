import { CellRenderer } from '../DataTable.types';
import { dayjsInstance as dayjs } from '../../calendar/Calendar.tsx';
import s from './styles.module.scss';
import { Text } from '../../text';
import { useLocale } from 'utils/index.ts';

export const DateRenderer = <T extends object>({
  value,
  columnConfig,
}: CellRenderer<T>) => {
  const locale = useLocale();

  const level =
    columnConfig.type === 'date' ? columnConfig.options?.level || 'day' : 'day';
  const customFormat =
    columnConfig.type === 'date' ? columnConfig.options?.format : undefined;

  const format =
    level === 'day' ? 'LL' : level === 'month' ? 'MMMM YYYY' : 'YYYY';

  const formattedDate = dayjs(value as string)
    .locale(locale.locale)
    .format(customFormat || format);

  return (
    <Text size={4} weight="medium" className={s.Date}>
      {formattedDate}
    </Text>
  );
};
