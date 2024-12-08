import { DataTableCellProps } from '../DataTableCell.tsx';
import s from './styles.module.scss';

export const DataTableCurrencyRenderer = <T extends object>({
  value,
  item,
  columnOptions,
}: DataTableCellProps<T>) => {
  const currencyFromAccessor = columnOptions?.currencyAccessor
    ? item[columnOptions?.currencyAccessor as keyof T]
    : undefined;
  const currency = String(
    currencyFromAccessor || columnOptions?.currency || 'USD',
  );

  const numberFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  });

  return (
    <div className={s.CurrencyCell}>
      {numberFormatter.format(Number(value))}
    </div>
  );
};
