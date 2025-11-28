import { CellRenderer } from '../DataTable.types';
import s from './styles.module.scss';
import { Text } from '../../text';
import { useLocale } from 'utils/hooks/useLocale';

export const NumberRenderer = <T extends object>({
  value,
  item,
  columnConfig,
}: CellRenderer<T>) => {
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

  return (
    <Text size={4} weight="medium" className={s.Number}>
      {formattedValue}
    </Text>
  );
};
