import { CellRenderer } from '../DataTable.types';
import s from './styles.module.scss';
import { Text } from '../../text';
import { useLocale } from 'utils/hooks/useLocale';
import { Skeleton } from 'components/skeleton';

export const NumberRenderer = <T extends object>({
  value,
  item,
  columnConfig,
  table,
}: CellRenderer<T>) => {
  const mode = table.options.meta?.mode;

  const locale = useLocale();

  const digitsAfterPoint =
    columnConfig.type === 'number' &&
    columnConfig.options?.digitsAfterPoint !== undefined
      ? columnConfig.options.digitsAfterPoint
      : undefined;

  const numberFormatter = new Intl.NumberFormat(locale.locale, {
    style: 'decimal',
    minimumFractionDigits: digitsAfterPoint,
    maximumFractionDigits: digitsAfterPoint,
  });

  const numberValue = Number(value ?? 0);
  const formattedValue = numberFormatter.format(numberValue);

  if (mode === 'loading') {
    return (
      <div className={s.Number}>
        <Skeleton width="50%" height="20px" minWidth="20px" radius="10px" />
      </div>
    );
  }

  return (
    <Text size={4} weight="medium" className={s.Number}>
      {formattedValue}
    </Text>
  );
};
