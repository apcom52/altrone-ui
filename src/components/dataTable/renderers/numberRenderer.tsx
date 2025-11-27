import { CellRenderer } from '../DataTable.types';
import s from './styles.module.scss';
import { Text } from '../../text';

export const NumberRenderer = <T extends object>({
  value,
  item,
  columnConfig,
}: CellRenderer<T>) => {
  // Получаем количество знаков после запятой из опций колонки
  const digitsAfterPoint =
    columnConfig.type === 'number' &&
    columnConfig.options?.digitsAfterPoint !== undefined
      ? columnConfig.options.digitsAfterPoint
      : undefined;

  const numberValue = Number(value ?? 0);
  const formattedValue =
    digitsAfterPoint !== undefined
      ? numberValue.toFixed(digitsAfterPoint)
      : String(value ?? '');

  return (
    <Text size={4} weight="medium" className={s.Number}>
      {formattedValue}
    </Text>
  );
};
