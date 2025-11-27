import { CellRenderer } from '../DataTable.types';
import s from './styles.module.scss';
import { Text } from '../../text';

export const TextRenderer = <T extends object>({
  value,
  item,
  columnConfig,
}: CellRenderer<T>) => {
  return (
    <div className={s.Text}>
      <Text size={4} weight="regular">
        {String(value ?? '')}
      </Text>
    </div>
  );
};
