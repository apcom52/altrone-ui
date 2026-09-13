import { CellRenderer } from '../DataTable.types';
import s from './styles.module.scss';
import { Text } from '../../text';
import { useLocale } from 'utils';
import { Skeleton } from 'components/skeleton';

export const CurrencyRenderer = <T extends object>({
  value,
  item,
  columnConfig,
  table,
}: CellRenderer<T>) => {
  const mode = table.options.meta?.mode;
  const locale = useLocale();

  // Получаем валюту из опций колонки или из item, если указан currencyAccessor
  const currencyFromConfig =
    columnConfig.type === 'currency' && columnConfig.options?.currency;
  const currencyAccessor =
    columnConfig.type === 'currency' && columnConfig.options?.currencyAccessor;
  const currencyFromItem = currencyAccessor
    ? (item[currencyAccessor] as string)
    : undefined;
  const currency = currencyFromItem || currencyFromConfig || 'USD';

  const currencyFormatter = new Intl.NumberFormat(locale.locale, {
    style: 'currency',
    currency: String(currency),
  });

  if (mode === 'loading') {
    return (
      <div className={s.CurrencySkeleton}>
        <Skeleton width="65%" height="20px" minWidth="20px" radius="10px" />
      </div>
    );
  }

  return (
    <Text size={4} weight="medium" className={s.Currency}>
      {currencyFormatter.format(Number(value ?? 0))}
    </Text>
  );
};
