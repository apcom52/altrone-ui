import { CellRenderer } from '../DataTable.types';
import s from './styles.module.scss';
import { Text } from '../../text';

export const StringRenderer = <T extends object>({
  value,
}: CellRenderer<T>) => {
  return (
    <Text
      size={4}
      weight="medium"
      className={s.String}
      title={String(value ?? '')}
    >
      {String(value ?? '')}
    </Text>
  );
};
