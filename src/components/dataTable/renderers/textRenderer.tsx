import { CellRenderer } from '../DataTable.types';
import s from './styles.module.scss';
import { Text } from '../../text';

export const TextRenderer = <T extends object>({ value }: CellRenderer<T>) => {
  return (
    <div className={s.Text}>
      <Text size={4} weight="medium">
        {String(value ?? '')}
      </Text>
    </div>
  );
};
