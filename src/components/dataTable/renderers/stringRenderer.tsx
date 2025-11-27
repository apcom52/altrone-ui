import { CellRenderer } from '../DataTable.types';
import s from './styles.module.scss';
import { Text } from '../../text';

export const StringRenderer = <T extends object>({
  value,
  item,
  columnConfig,
}: CellRenderer<T>) => {
  return (
    <Text size={4} weight="regular" className={s.String}>
      {String(value ?? '')}
    </Text>
  );
};
