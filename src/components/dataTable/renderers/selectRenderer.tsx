import { CellRenderer } from '../DataTable.types';
import s from './styles.module.scss';
import { Text } from '../../text';

export const SelectRenderer = <T extends object>({
  value,
}: CellRenderer<T>) => {
  const arrayValue = Array.isArray(value) ? value : [value];

  return (
    <Text size={4} weight="medium" className={s.Select}>
      {arrayValue.map((item) => item).join(', ')}
    </Text>
  );
};
